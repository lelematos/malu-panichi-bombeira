const PRODUCTS = [
  { id: 1, name: "Balaclava de Proteção", price: 35.00, category: "Vestuário", brand: "SEGURANÇA", image: "images/imagens-items/balaclava.jpeg" },
  { id: 2, name: "Bermuda Oficial de Bombeiro", price: 49.90, category: "Vestuário", brand: "COMBATE", image: "images/imagens-items/bermuda-bombeiros.jpeg" },
  { id: 3, name: "Blusa de Frio de Bombeiro", price: 89.90, category: "Vestuário", brand: "FRIO", image: "images/imagens-items/blusa-bombeiro.jpeg" },
  { id: 4, name: "Bota de Segurança Borzeguim", price: 180.00, category: "Vestuário", brand: "COMBATE", image: "images/imagens-items/borzeguim-bota.jpeg" },
  { id: 5, name: "Calça Jeans Azul Escura", price: 120.00, category: "Vestuário", brand: "VESTUÁRIO", image: "images/imagens-items/calca-jeans.jpeg" },
  { id: 6, name: "Camiseta Dry-Fit Bombeiro", price: 39.90, category: "Vestuário", brand: "VESTUÁRIO", image: "images/imagens-items/camiseta-bombeiro.jpeg" },
  { id: 7, name: "Caneca de Alumínio Vermelha", price: 25.00, category: "Geral", brand: "MALUBOMBEIRA", image: "images/imagens-items/caneca-aluminio.jpeg" },
  { id: 8, name: "Caneca de Cerâmica Retro", price: 20.00, category: "Geral", brand: "UTILIDADES", image: "images/imagens-items/caneca.jpeg" },
  { id: 9, name: "Cantil com Capa e Caneca", price: 45.00, category: "Geral", brand: "SOBREVIVÊNCIA", image: "images/imagens-items/cantil.jpeg" },
  { id: 10, name: "Capacete de Bombeiro Civil", price: 90.00, category: "Salvamento", brand: "SEGURANÇA", image: "images/imagens-items/capacete.jpeg" },
  { id: 11, name: "Chinelo Slide Vermelho", price: 20.00, category: "Vestuário", brand: "LAZER", image: "images/imagens-items/chinelo.jpeg" },
  { id: 12, name: "Cinto Vermelho com Fivela", price: 25.00, category: "Vestuário", brand: "EQUIPAMENTO", image: "images/imagens-items/cinto vermelho.jpeg" },
  { id: 13, name: "Boné de Cobertura Oficial", price: 30.00, category: "Vestuário", brand: "ACESSÓRIO", image: "images/imagens-items/cobertura-bone-bombeiro.jpeg" },
  { id: 14, name: "Corda de Salvamento 50m", price: 30.00, category: "Salvamento", brand: "EQUIPAMENTO", image: "images/imagens-items/corda.jpeg" },
  { id: 15, name: "Kit Talheres Camping", price: 25.00, category: "Geral", brand: "UTILIDADES", image: "images/imagens-items/garfo e faca.jpeg" },
  { id: 16, name: "Graxa para Coturno", price: 15.00, category: "Geral", brand: "MANUTENÇÃO", image: "images/imagens-items/graxa.jpeg" },
  { id: 17, name: "Jaqueta Corta-Vento Vermelha", price: 210.00, category: "Vestuário", brand: "FRIO", image: "images/imagens-items/jaqueta-bombeiro.jpeg" },
  { id: 18, name: "Lanterna Tática de Alta Potência", price: 40.00, category: "Salvamento", brand: "ILUMINAÇÃO", image: "images/imagens-items/lanterna.jpeg" },
  { id: 19, name: "Luvas Clínicas Descartáveis", price: 35.00, category: "Geral", brand: "SAÚDE", image: "images/imagens-items/luvas-clinicas.jpeg" },
  { id: 20, name: "Luvas de Raspa de Couro", price: 25.00, category: "Salvamento", brand: "PROTEÇÃO", image: "images/imagens-items/luvas.png" },
  { id: 21, name: "Manta de Microfibra Vermelha", price: 59.90, category: "Vestuário", brand: "CONFORTO", image: "images/imagens-items/manta-cobertor-vemelha.jpeg" },
  { id: 22, name: "Máscara Pocket RCP", price: 45.00, category: "Salvamento", brand: "SOCORRO", image: "images/imagens-items/mascara-rcp.jpeg" },
  { id: 23, name: "Meia Cano Médio Preta", price: 8.00, category: "Vestuário", brand: "COMBATE", image: "images/imagens-items/meia preta.jpeg" },
  { id: 24, name: "Meia Cano Alto Branca", price: 8.00, category: "Vestuário", brand: "COMBATE", image: "images/imagens-items/meia-branca.jpeg" },
  { id: 25, name: "Mochila Cargueira Militar", price: 150.00, category: "Salvamento", brand: "AVENTURA", image: "images/imagens-items/mochila.jpeg" },
  { id: 26, name: "Mosquetão de Segurança", price: 15.00, category: "Salvamento", brand: "EQUIPAMENTO", image: "images/imagens-items/mosquetao.jpeg" },
  { id: 27, name: "Óculos de Proteção Individual", price: 12.00, category: "Salvamento", brand: "PROTEÇÃO", image: "images/imagens-items/ocoulos.jpeg" },
  { id: 28, name: "Prato de Metal Camping", price: 15.00, category: "Geral", brand: "UTILIDADES", image: "images/imagens-items/prato.jpeg" },
  { id: 29, name: "Camiseta Regata Vermelha", price: 29.90, category: "Vestuário", brand: "ESPORTE", image: "images/imagens-items/regata.jpeg" },
  { id: 30, name: "Shorts Legging Vermelho", price: 35.90, category: "Vestuário", brand: "ESPORTE", image: "images/imagens-items/shorts-lagging-vermelho.jpeg" },
  { id: 31, name: "Tapete de Atividades", price: 35.00, category: "Geral", brand: "CONFORTO", image: "images/imagens-items/tapete.jpeg" },
  { id: 32, name: "Tênis de Corrida", price: 180.00, category: "Vestuário", brand: "ESPORTE", image: "images/imagens-items/tenis-pra-correr-bastante.jpeg" },
  { id: 33, name: "Toalha de Banho Vermelha", price: 34.90, category: "Vestuário", brand: "ENXOVAL", image: "images/imagens-items/toalha.jpeg" },
  { id: 34, name: "Top Esportivo Vermelho", price: 29.90, category: "Vestuário", brand: "ESPORTE", image: "images/imagens-items/top-vermelho.jpeg" },
  { id: 35, name: "Travesseiro de Viagem Inflável", price: 15.90, category: "Geral", brand: "CONFORTO", image: "images/imagens-items/travesseiros.jpeg" }
];

const siteConfig = {
  'Chave Pix': '+5548984796212',
  'Nome Pix': 'Maria Luiza Panichi',
  'Cidade Pix': 'SAO PAULO'
};

function initializePix() {
  const pixKey = siteConfig['Chave Pix'];
  const pixName = siteConfig['Nome Pix'];
  const pixCity = siteConfig['Cidade Pix'];
  
  PRODUCTS.forEach(product => {
    product.pixPayload = generatePixPayload(pixKey, pixName, pixCity, product.price);
    product.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(product.pixPayload)}`;
    
    // Eagerly pre-cache QR Code image in the browser
    const img = new Image();
    img.src = product.qrCodeUrl;
  });
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
  
  // Initialize Pix payloads & preload QR codes
  initializePix();
  
  // Setup and render site
  setupHomepage();
  initHeroSlider();
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
