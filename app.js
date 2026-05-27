let PRODUCTS = [];

// Parse Markdown Config
function parseMarkdownConfig(mdText) {
  const sections = {};
  const lines = mdText.split('\n');
  let currentSection = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('##')) {
      currentSection = line.replace(/^##\s*/, '').trim().toUpperCase();
      sections[currentSection] = [];
    } else if (currentSection && line.startsWith('-')) {
      sections[currentSection].push(line);
    }
  }
  
  const config = {
    texts: {},
    products: []
  };
  
  // Parse TEXTOS GERAIS
  const textsSection = sections['TEXTOS GERAIS'] || [];
  textsSection.forEach(line => {
    const match = line.match(/^-\s*\*\*([^*]+)\*\*:\s*(.*)$/);
    if (match) {
      config.texts[match[1].trim()] = match[2].trim();
    }
  });
  
  // Parse VALORES E ITENS DO ENXOVAL
  const productsSection = sections['VALORES E ITENS DO ENXOVAL'] || [];
  let idCounter = 1;
  productsSection.forEach(line => {
    const match = line.match(/^-\s*\*\*([^*]+)\*\*:\s*(.*)$/);
    if (match) {
      const filename = match[1].trim();
      const parts = match[2].split('|').map(p => p.trim());
      if (parts.length >= 2) {
        const title = parts[0];
        const rawPrice = parts[1];
        const price = parseFloat(rawPrice.replace(/[^\d.,]/g, '').replace(',', '.'));
        const category = parts[2] || 'Geral';
        const brand = parts[3] || 'ENXOVAL';
        
        config.products.push({
          id: idCounter++,
          name: title,
          price: isNaN(price) ? 0.00 : price,
          category: category,
          brand: brand,
          image: `images/imagens-items/${filename}`
        });
      }
    }
  });
  
  return config;
}

// Global Config Object
let siteConfig = {};

async function loadConfig() {
  try {
    const response = await fetch('config.md');
    if (!response.ok) throw new Error('Não foi possível carregar o config.md');
    const mdText = await response.text();
    const parsed = parseMarkdownConfig(mdText);
    
    siteConfig = parsed.texts;
    PRODUCTS = parsed.products;
    
    // Pre-calculate Pix payloads and preload QR code images
    const pixKey = siteConfig['Chave Pix'] || '+5548984796212';
    const pixName = siteConfig['Nome Pix'] || 'Maria Luiza Panichi';
    const pixCity = siteConfig['Cidade Pix'] || 'SAO PAULO';
    
    PRODUCTS.forEach(product => {
      product.pixPayload = generatePixPayload(pixKey, pixName, pixCity, product.price);
      product.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(product.pixPayload)}`;
      
      // Eagerly pre-cache QR Code image in the browser
      const img = new Image();
      img.src = product.qrCodeUrl;
    });
    
    // Apply texts to DOM elements
    const elementMapping = {
      'Logo Header': 'header-logo',
      'Link Lista Header': 'header-link-lista',
      'Link Sobre Header': 'header-link-sobre',
      'Subtitle Hero': 'hero-subtitle',
      'Title Hero': 'hero-headline',
      'Description Hero': 'hero-description',
      'CTA Hero': 'hero-cta',
      'Subtitle Presentes': 'products-subtitle',
      'Title Presentes': 'products-title',
      'Left Subtitle Editorial': 'editorial-left-subtitle',
      'Left Title Editorial': 'editorial-left-title',
      'Right Title Editorial': 'editorial-right-title',
      'Right CTA Editorial': 'editorial-right-cta',
      'Footer Brand': 'footer-brand',
      'Footer Description': 'footer-description',
      'Footer Legal': 'footer-legal'
    };
    
    for (const [mdKey, elementId] of Object.entries(elementMapping)) {
      const element = document.getElementById(elementId);
      if (element && parsed.texts[mdKey]) {
        if (mdKey.includes('Description') || mdKey.includes('Title') || mdKey.includes('CTA')) {
          element.innerHTML = parsed.texts[mdKey];
        } else {
          element.textContent = parsed.texts[mdKey];
        }
      }
    }
    
    // Apply Brand Ticker text
    const marqueeContainer = document.getElementById('brand-ticker-content');
    if (marqueeContainer && parsed.texts['Marquee Text']) {
      const text = parsed.texts['Marquee Text'] + ' &nbsp;';
      marqueeContainer.innerHTML = `
        <span>${text}</span>
        <span>${text}</span>
      `;
    }
    
    // Setup and render products
    setupHomepage();
    initHeroSlider();
    
  } catch (error) {
    console.error('Erro ao inicializar configurações:', error);
  }
}

// FORMAT CURRENCY BR
function formatPrice(val) {
  return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function closeCartModal() {
  const overlay = document.getElementById('cart-modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

// ============================================================
// PIX PAYLOAD GENERATOR
// Portado 1:1 do serviço Go (pix_service.go) que funciona.
// ============================================================

// IDs dos campos EMV (espelhando as constantes Go)
const PIX_ID = {
  PAYLOAD_FORMAT_INDICATOR:       '00',
  MERCHANT_ACCOUNT_INFORMATION:   '26',
  MERCHANT_CATEGORY_CODE:         '52',
  TRANSACTION_CURRENCY:           '53',
  TRANSACTION_AMOUNT:             '54',
  COUNTRY_CODE:                   '58',
  MERCHANT_NAME:                  '59',
  MERCHANT_CITY:                  '60',
  ADDITIONAL_DATA_FIELD_TEMPLATE: '62',
  CRC16:                          '63',
};

// getValue formata o TLV: ID + Tamanho (02 dígitos) + Valor
// Espelho exato do Go: fmt.Sprintf("%s%02d%s", id, len(value), value)
function getValue(id, value) {
  const length = value.length; // JS .length em ASCII = bytes, igual Go len()
  return `${id}${String(length).padStart(2, '0')}${value}`;
}

// calculateCRC16CCITT — CRC-16/CCITT-FALSE
// Espelho exato do Go: itera byte a byte com polinômio 0x1021
function calculateCRC16CCITT(data) {
  const polynomial = 0x1021;
  let crc = 0xFFFF;

  for (let i = 0; i < data.length; i++) {
    crc ^= (data.charCodeAt(i) << 8);
    for (let j = 0; j < 8; j++) {
      if ((crc & 0x8000) !== 0) {
        crc = (crc << 1) ^ polynomial;
      } else {
        crc = crc << 1;
      }
    }
  }

  crc &= 0xFFFF;
  return crc.toString(16).toUpperCase().padStart(4, '0');
}

// normalizeString — remove acentos e diacríticos
// Espelho do Go: transform.Chain(norm.NFD, runes.Remove(unicode.Mn), norm.NFC)
function normalizeString(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .normalize('NFC');
}

// removeNonAlphanumeric — mantém apenas letras e números
// Espelho do Go: unicode.IsLetter || unicode.IsNumber
function removeNonAlphanumeric(str) {
  return str.replace(/[^A-Za-z0-9]/g, '');
}

// generatePixPayload — monta o payload EMV completo
// Espelho exato do fluxo Go: GeneratePayload(amount, txid)
function generatePixPayload(pixKey, beneficiary, city, amount) {
  // 1. Formatar Preço (ponto decimal, sem separador de milhar)
  const amountStr = Number(amount).toFixed(2);

  // 2. Gerar TxID alfanumérico uppercase (max 25 chars)
  let txid = removeNonAlphanumeric(
    Math.random().toString(36).substring(2, 12)
  ).toUpperCase();
  if (txid.length > 25) txid = txid.substring(txid.length - 25);
  if (!txid) txid = '***';

  // 3. Montar Payload

  // 00 - Payload Format Indicator
  let payload = getValue(PIX_ID.PAYLOAD_FORMAT_INDICATOR, '01');

  // 26 - Merchant Account Information (GUI + Key)
  const merchantAccount = getValue('00', 'br.gov.bcb.pix') + getValue('01', pixKey);
  payload += getValue(PIX_ID.MERCHANT_ACCOUNT_INFORMATION, merchantAccount);

  // 52 - Merchant Category Code
  payload += getValue(PIX_ID.MERCHANT_CATEGORY_CODE, '0000');

  // 53 - Transaction Currency (BRL = 986)
  payload += getValue(PIX_ID.TRANSACTION_CURRENCY, '986');

  // 54 - Transaction Amount
  payload += getValue(PIX_ID.TRANSACTION_AMOUNT, amountStr);

  // 58 - Country Code
  payload += getValue(PIX_ID.COUNTRY_CODE, 'BR');

  // 59 - Merchant Name (sem acentos, max 25)
  let safeName = normalizeString(beneficiary);
  if (safeName.length > 25) safeName = safeName.substring(0, 25);
  payload += getValue(PIX_ID.MERCHANT_NAME, safeName);

  // 60 - Merchant City (sem acentos, max 15)
  let safeCity = normalizeString(city);
  if (safeCity.length > 15) safeCity = safeCity.substring(0, 15);
  payload += getValue(PIX_ID.MERCHANT_CITY, safeCity);

  // 62 - Additional Data Field Template (TxID no sub-campo 05)
  const additionalData = getValue('05', txid);
  payload += getValue(PIX_ID.ADDITIONAL_DATA_FIELD_TEMPLATE, additionalData);

  // 63 - CRC16 (adiciona ID + tamanho "04" antes de calcular)
  payload += PIX_ID.CRC16 + '04';

  // Calcular e anexar CRC
  const crc = calculateCRC16CCITT(payload);
  payload += crc;

  return payload;
}

// Open Pix Modal for a single product
function openPixModal(product) {
  const overlay = document.getElementById('cart-modal-overlay');
  const modalContent = document.querySelector('.cart-modal');
  if (!overlay || !modalContent) return;
  
  // Fallback if pre-calculation didn't run or product is missing properties
  const pixPayload = product.pixPayload || generatePixPayload(
    siteConfig['Chave Pix'] || '+5548984796212',
    siteConfig['Nome Pix'] || 'Maria Luiza Panichi',
    siteConfig['Cidade Pix'] || 'SAO PAULO',
    product.price
  );
  
  const qrCodeUrl = product.qrCodeUrl || `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(pixPayload)}`;
  
  modalContent.innerHTML = `
    <div class="cart-drawer-header" style="border-bottom: 4px solid var(--charcoal); padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
      <h2 style="font-size: 24px; font-family: var(--font-headlines); font-weight: 900; color: var(--charcoal); text-transform: uppercase;">PAGAMENTO PIX</h2>
      <button class="btn-close-cart" onclick="closeCartModal();" style="background: none; font-size: 24px; font-weight: 900; color: var(--charcoal); border: none;">✕</button>
    </div>
    
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: center;">
      <div style="background-color: var(--sunny-yellow); border: 3px solid var(--charcoal); padding: 12px; text-align: center; font-weight: 800; font-size: 14px; text-transform: uppercase; font-family: var(--font-headlines); width: 100%;">
        Obrigado por presentear a Malu!
      </div>
      
      <p style="font-size: 12px; line-height: 1.5; color: var(--charcoal); text-align: left; width: 100%;">
        Você escolheu presentear com o item: <strong>${product.name}</strong>.<br>
        Pague o valor de <strong>${formatPrice(product.price)}</strong> escaneando o QR Code ou copiando o código Pix abaixo:
      </p>
      
      <!-- QR Code Container -->
      <div style="background-color: var(--white); border: 3px solid var(--charcoal); padding: 12px; display: flex; align-items: center; justify-content: center; box-shadow: 4px 4px 0 var(--charcoal);">
        <img src="${qrCodeUrl}" alt="QR Code Pix Malu" style="width: 180px; height: 180px; display: block; object-fit: contain;">
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
        <label class="utility-label" style="font-size: 9px; font-weight: 800; color: var(--charcoal); text-align: left;">Pix Copia e Cola:</label>
        <div style="display: flex; border: 3px solid var(--charcoal); background-color: var(--white); overflow: hidden; width: 100%;">
          <input type="text" readonly value="${pixPayload}" id="pix-payload-input" style="flex-grow: 1; border: none; padding: 12px; font-family: monospace; font-size: 10px; color: var(--charcoal); outline: none;" onclick="this.select();">
          <button id="btn-copy-pix" onclick="copyPixCode()" style="background-color: var(--charcoal); color: var(--white); font-weight: 800; font-size: 10px; padding: 0 16px; border-left: 3px solid var(--charcoal); text-transform: uppercase; letter-spacing: 0.05em; transition: background-color 0.2s;">COPIAR</button>
        </div>
      </div>
      
      <div style="border-top: 3px dashed var(--charcoal); padding-top: 16px; margin-top: 8px; text-align: left; width: 100%;">
        <h4 style="font-size: 12px; font-family: var(--font-headlines); font-weight: 900; text-transform: uppercase; margin-bottom: 6px;">Próximo Passo:</h4>
        <p style="font-size: 11px; line-height: 1.4; color: #4a4a4a;">
          Escaneie o QR Code acima com o app do seu banco ou use a opção "Pix Copia e Cola". Em seguida, envie o comprovante ou combine a entrega diretamente com a Malu!
        </p>
      </div>
      
      <button class="btn-checkout" onclick="closeCartModal();" style="margin-top: 12px; padding: 12px; font-size: 14px; width: 100%;">FECHAR</button>
    </div>
  `;
  
  overlay.classList.add('open');
}

function presentItem(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (product) {
    openPixModal(product);
  }
}

// Copy Pix code string to clipboard
function copyPixCode() {
  const input = document.getElementById('pix-payload-input');
  if (input) {
    input.select();
    input.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(input.value).then(() => {
      const btn = document.getElementById('btn-copy-pix');
      if (btn) {
        const originalText = btn.textContent;
        btn.textContent = 'COPIADO!';
        btn.style.backgroundColor = 'var(--retro-red)';
        btn.style.color = 'var(--white)';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = 'var(--charcoal)';
        }, 2000);
      }
    }).catch(err => {
      console.error('Erro ao copiar Pix:', err);
    });
  }
}

// RENDER HOMEPAGE PRODUCT GRID
let activeCategory = 'TODOS';
let searchQuery = '';

function renderProducts() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;
  
  grid.innerHTML = '';
  
  const filtered = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'TODOS' || p.category.toUpperCase() === activeCategory.toUpperCase();
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; font-weight: 800; text-transform: uppercase;">NENHUM ITEM ENCONTRADO</div>';
    return;
  }
  
  filtered.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-img-container" onclick="openProductModal(${p.id})">
        <img class="product-img" src="${p.image}" alt="${p.name}" onerror="handleImageError(this, '${p.image}')">
      </div>
      <div class="product-meta-row1">
        <span class="product-brand">${p.brand}</span>
        <span class="product-price">${formatPrice(p.price)}</span>
      </div>
      <div class="product-meta-row2">
        <h3 class="product-name" onclick="openProductModal(${p.id})">${p.name}</h3>
        <button class="product-btn-add" onclick="event.stopPropagation(); presentItem(${p.id})">PRESENTEAR</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function handleImageError(imgEl, filename) {
  // Hide image
  imgEl.style.display = 'none';
  
  // Create or reveal the placeholder mockup
  const container = imgEl.parentElement;
  
  // Clean up any existing placeholder first
  const existingPlaceholder = container.querySelector('.image-placeholder');
  if (existingPlaceholder) existingPlaceholder.remove();
  
  const placeholder = document.createElement('div');
  placeholder.className = 'image-placeholder';
  placeholder.innerHTML = `
    <span class="placeholder-icon">📷</span>
    <span class="placeholder-filename">${filename}</span>
  `;
  container.appendChild(placeholder);
}

function openProductModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  
  const overlay = document.getElementById('product-modal-overlay');
  const content = document.getElementById('product-modal-content');
  if (!overlay || !content) return;
  
  content.innerHTML = `
    <div class="modal-gallery">
      <!-- Brutalist Offset Card for product image mockup -->
      <div class="offset-card-container" style="padding-bottom: 8px; padding-right: 8px;">
        <div class="offset-card-shadow" style="top: 8px; left: 8px; border-width: 2px;"></div>
        <div class="offset-card-content" style="background-color: var(--vintage-blue); aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center; overflow: hidden; position: relative; border-width: 2px;">
          <img src="${product.image}" alt="${product.name}" class="product-img" style="width: 100%; height: 100%; object-fit: cover;" onerror="handleImageError(this, '${product.image}')">
        </div>
      </div>
    </div>
    
    <div class="modal-info">
      <div>
        <div class="utility-label" style="color: var(--retro-red); margin-bottom: 4px;">${product.brand}</div>
        <h3 style="font-size: 20px; line-height: 1.1; margin-bottom: 8px; font-family: var(--font-headlines); font-weight: 900; text-transform: uppercase;">${product.name}</h3>
        <div style="font-size: 24px; font-weight: 800; color: var(--charcoal); font-family: var(--font-body);">${formatPrice(product.price)}</div>
      </div>
      
      <p style="font-size: 12px; line-height: 1.5; color: #4a4a4a;">
        ESTE É UM ITEM ESSENCIAL DO ENXOVAL DA MALU COMO BOMBEIRA MILITAR TEMPORÁRIA DE ITAJAÍ. PRESENTEAR COM ESSE ITEM AJUDA DIRETAMENTE NA AQUISIÇÃO DE SEUS MATERIAIS DE ATUAÇÃO E ATIVIDADES DIÁRIAS.
      </p>
      
      <div class="detail-actions" style="margin-top: 12px;">
        <button class="btn-buy-now" style="padding: 12px; font-size: 14px; width: 100%;" onclick="presentItem(${product.id}); closeProductModal();">PRESENTEAR COM ESTE ITEM</button>
      </div>
    </div>
  `;
  
  overlay.classList.add('open');
}

function closeProductModal() {
  const overlay = document.getElementById('product-modal-overlay');
  if (overlay) overlay.classList.remove('open');
}

// HERO VERTICAL SLIDER
function initHeroSlider() {
  const track = document.querySelector('.hero-slider-track');
  if (!track) return;
  
  const slides = Array.from(track.querySelectorAll('.hero-slider-img'));
  if (slides.length <= 1) return;
  
  // Clone first slide to the end for a seamless infinite loop
  const firstClone = slides[0].cloneNode(true);
  track.appendChild(firstClone);
  
  let currentIndex = 0;
  const slideCount = slides.length;
  let isTransitioning = false;
  
  setInterval(() => {
    if (isTransitioning) return;
    
    currentIndex++;
    isTransitioning = true;
    track.style.transition = 'transform 800ms cubic-bezier(0.76, 0, 0.24, 1)';
    track.style.transform = `translateY(-${currentIndex * 100}%)`;
    
    track.addEventListener('transitionend', function handleTransitionEnd() {
      track.removeEventListener('transitionend', handleTransitionEnd);
      isTransitioning = false;
      
      // If we reached the clone, snap back to first slide instantly
      if (currentIndex === slideCount) {
        track.style.transition = 'none';
        track.style.transform = 'translateY(0)';
        currentIndex = 0;
      }
    });
  }, 3500); // Transitions every 3.5 seconds
}

// SETUP ON PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {
  // Global drawer listener buttons
  const btnCloseCart = document.getElementById('btn-close-cart');
  if (btnCloseCart) btnCloseCart.addEventListener('click', closeCartModal);
  
  const btnCartOverlay = document.getElementById('cart-modal-overlay');
  if (btnCartOverlay) {
    btnCartOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'cart-modal-overlay') closeCartModal();
    });
  }
  
  const btnCloseModal = document.getElementById('btn-close-modal');
  if (btnCloseModal) btnCloseModal.addEventListener('click', closeProductModal);
  
  const modalOverlay = document.getElementById('product-modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target.id === 'product-modal-overlay') closeProductModal();
    });
  }
  
  // Load configuration and render site
  loadConfig();
});

// SETUP HOMEPAGE INTERACTIVE CONTROLS
function setupHomepage() {
  // Search bar input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderProducts();
    });
  }
  
  // Category buttons
  const categoryContainer = document.getElementById('category-filters');
  if (categoryContainer) {
    categoryContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.getAttribute('data-category');
        renderProducts();
      }
    });
  }
  
  // Initial render
  renderProducts();
}
