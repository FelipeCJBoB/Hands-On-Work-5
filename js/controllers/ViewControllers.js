import { StoreData, fetchProducts } from '../data/mockDatabase.js';
import { IMG_ONERROR_ATTR } from '../services/CartService.js';

const fmt = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

/** Mesma string onerror em todos os <img> gerados: fallback único, sem dependência de rede. */
const imgErr = () => `onerror="${IMG_ONERROR_ATTR}"`;

export function buildProductCard(p) {
  const discountBadge = p.discount
    ? `<span class="absolute top-6 right-6 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded z-10">${p.discount}% OFF</span>`
    : '';
  const oldPriceHtml = p.oldPrice
    ? `<span class="text-xs text-concrete line-through">${fmt(p.oldPrice)}</span>`
    : '';
  const blurb =
    p.detailsText ||
    p.tagline ||
    'Produto de alta qualidade para sua obra com garantia estendida Naveluz.';
  return `
    <div class="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 p-4 flex flex-col h-full relative group">
      ${discountBadge}
      <div class="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4 cursor-pointer" data-action="view-product" data-product-id="${p.id}">
        <img src="${p.img}" alt="${p.name}" ${imgErr()}
             class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy">
      </div>
      <span class="text-[10px] font-bold text-gold uppercase tracking-wider mb-1">${p.category}</span>
      <h3 class="font-bold text-navy text-sm mb-2 line-clamp-2 cursor-pointer hover:text-gold transition-colors" data-action="view-product" data-product-id="${p.id}">
        ${p.name}
      </h3>
      <p class="text-xs text-concrete mb-5 line-clamp-2">
        ${blurb}
      </p>
      <div class="mt-auto">
        <div class="flex items-center gap-2 mb-4 flex-wrap">
          ${oldPriceHtml}
          <span class="text-lg font-bold text-navy">${fmt(p.price)}</span>
        </div>
        <button type="button" data-action="view-product" data-product-id="${p.id}" class="w-full bg-navy hover:bg-navy-dark text-white text-xs font-bold py-3.5 rounded-xl transition-colors tracking-wide">
          Ver Detalhes
        </button>
      </div>
    </div>`;
}

export function buildAdminTableRow(p) {
  const sc = p.stock < 10 ? 'text-red-500' : 'text-emerald-600';
  const cc =
    p.category === 'Iluminação'
      ? 'bg-blue-50 text-blue-700'
      : p.category === 'Ferramentas'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-emerald-50 text-emerald-700';
  const tagExcerpt = p.tagline.length > 38 ? `${p.tagline.substring(0, 38)}…` : p.tagline;
  return `
    <tr class="hover:bg-chalk transition-colors">
      <td class="px-5 py-3 flex items-center gap-3">
        <img src="${p.img}" alt="${p.name}" ${imgErr()}
             class="w-10 h-10 object-cover rounded-lg border border-gray-100" loading="lazy">
        <div>
          <strong class="text-sm text-navy block">${p.name}</strong>
          <span class="text-xs text-concrete">${tagExcerpt}</span>
        </div>
      </td>
      <td class="px-5 py-3 text-xs text-concrete font-mono">${p.sku}</td>
      <td class="px-5 py-3"><span class="px-2.5 py-1 ${cc} text-xs font-bold rounded-full">${p.category}</span></td>
      <td class="px-5 py-3 font-bold text-navy text-sm">${fmt(p.price)}</td>
      <td class="px-5 py-3 font-bold text-sm ${sc}">${p.stock} un</td>
      <td class="px-5 py-3">
        <button data-action="nav-admin-editar" data-product-id="${p.id}"
                class="text-xs text-navy hover:text-gold transition-colors font-semibold">Editar ✎</button>
      </td>
    </tr>`;
}

function buildInventarioCard(p) {
  const inStock = p.stock > 0;
  return `
    <article class="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div class="flex items-start justify-between">
        <span class="text-xs text-concrete font-mono">${p.sku}</span>
        ${!inStock ? '<span class="px-2 py-0.5 bg-red-50 text-red-500 text-xs font-bold rounded-full">ESGOTADO</span>' : ''}
      </div>
      <img src="${p.img}" alt="${p.name}" ${imgErr()} class="w-full h-40 object-cover rounded-xl bg-chalk" loading="lazy">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-gold uppercase">${p.category}</span>
        ${p.badge ? `<span class="text-xs bg-navy text-gold px-2 py-0.5 rounded-full">${p.badge}</span>` : ''}
      </div>
      <h3 class="text-sm font-bold text-navy leading-snug">${p.name}</h3>
      <p class="text-base font-bold text-navy">${fmt(p.price)}</p>
      ${inStock ? `<span class="text-xs font-semibold text-emerald-600">✓ ${p.stock} em estoque</span>` : ''}
      <div class="flex gap-2 mt-auto pt-1">
        <button data-action="nav-admin-editar" data-product-id="${p.id}"
                class="flex-1 bg-navy text-white text-xs font-bold py-2 rounded-xl hover:bg-navy-dark transition-colors">Editar</button>
        <button data-action="admin-delete-product" data-product-id="${p.id}"
                class="bg-red-50 text-red-500 text-xs font-bold px-3 py-2 rounded-xl hover:bg-red-100 transition-colors">🗑</button>
      </div>
    </article>`;
}

/** Skeleton: mesma grade que os cards reais → menos CLS quando a Promise resolve. */
function buildProductSkeletonCards(count) {
  /* Alinhado ao card PLP (imagem + bloco de preço + CTA único). */
  const one = `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col h-full animate-pulse" aria-hidden="true">
      <div class="rounded-xl bg-chalk aspect-square w-full mb-4"></div>
      <div class="h-2 bg-chalk rounded max-w-[35%] mb-3"></div>
      <div class="h-4 bg-chalk rounded w-full mb-2"></div>
      <div class="h-3 bg-chalk rounded w-full mb-5"></div>
      <div class="mt-auto space-y-3">
        <div class="flex items-center gap-2">
          <div class="h-3 bg-chalk rounded w-14"></div>
          <div class="h-5 bg-chalk rounded w-20"></div>
        </div>
        <div class="h-10 bg-chalk rounded-xl w-full"></div>
      </div>
    </div>`;
  return Array.from({ length: count }, () => one).join('');
}

/**
 * Fábrica dos ciclos mount por rota.
 * cart/shell vêm por injeção para manter módulo testável.
 */
export function createViewControllers({ cart, shell, syncCheckoutCtas }) {
  return {
    '#home': {
      mount() {
        const grid = document.getElementById('home-products-grid');
        if (!grid) return;
        grid.innerHTML = buildProductSkeletonCards(8);
        fetchProducts()
          .then((products) => {
            const g = document.getElementById('home-products-grid');
            if (!g) return;
            g.innerHTML = products.map(buildProductCard).join('');
          })
          .catch(() => {
            const g = document.getElementById('home-products-grid');
            if (!g) return;
            g.innerHTML =
              '<p class="text-sm text-red-600 col-span-full text-center py-8">Não foi possível carregar o catálogo. Tente novamente mais tarde.</p>';
          });
      },
    },

    '#auth': {
      mount() {
        /* conteúdo estático no template */
      },
    },

    '#quem-somos': {
      mount() {
        window.scrollTo(0, 0);
      },
    },

    '#categorias': {
      mount: async () => {
        window.scrollTo(0, 0);
        const grid = document.getElementById('catalog-products-grid');
        const countEl = document.getElementById('catalog-count');
        const searchInput = document.getElementById('catalog-search');
        const clearBtn = document.getElementById('catalog-clear');
        const filterBtns = document.querySelectorAll('.filter-btn');

        if (!grid || !countEl) return;

        grid.innerHTML = Array(8)
          .fill(
            `
      <div class="bg-white rounded-2xl border border-gray-100 p-4 h-80 animate-pulse flex flex-col">
        <div class="w-full aspect-square bg-gray-200 rounded-xl mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
        <div class="h-5 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="mt-auto h-10 bg-gray-200 rounded-xl"></div>
      </div>
    `,
          )
          .join('');

        let allProducts;
        try {
          allProducts = await fetchProducts();
        } catch {
          grid.innerHTML =
            '<p class="text-sm text-red-600 col-span-full text-center py-8">Não foi possível carregar o catálogo. Tente novamente mais tarde.</p>';
          countEl.textContent = '0';
          return;
        }

        let currentCategory = 'all';
        let currentSearch = '';

        const renderFilteredGrid = () => {
          let filtered = allProducts;

          if (currentCategory !== 'all') {
            filtered = filtered.filter((p) => p.category === currentCategory);
          }

          if (currentSearch.trim() !== '') {
            const term = currentSearch.toLowerCase();
            filtered = filtered.filter(
              (p) =>
                p.name.toLowerCase().includes(term) ||
                (p.detailsText && p.detailsText.toLowerCase().includes(term)),
            );
          }

          countEl.textContent = String(filtered.length);

          if (filtered.length === 0) {
            grid.innerHTML = `
          <div class="col-span-full py-16 text-center">
            <div class="text-6xl mb-4 opacity-50">🔍</div>
            <h3 class="font-bold text-navy text-xl mb-2">Nenhum produto encontrado</h3>
            <p class="text-concrete text-sm">Tente ajustar seus filtros ou termos de busca.</p>
          </div>
        `;
            return;
          }

          grid.innerHTML = filtered.map((p) => buildProductCard(p)).join('');
        };

        renderFilteredGrid();

        filterBtns.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            filterBtns.forEach((b) => {
              b.classList.remove('bg-navy', 'text-white', 'border-transparent');
              b.classList.add('bg-white', 'text-navy', 'border-gray-200');
            });

            const target = e.currentTarget;
            target.classList.remove('bg-white', 'text-navy', 'border-gray-200');
            target.classList.add('bg-navy', 'text-white', 'border-transparent');

            currentCategory = target.dataset.filter || 'all';
            renderFilteredGrid();
          });
        });

        if (searchInput) {
          searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            renderFilteredGrid();
          });
        }

        if (clearBtn) {
          clearBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            currentSearch = '';
            const btnTodos = document.querySelector('.filter-btn[data-filter="all"]');
            if (btnTodos) btnTodos.click();
          });
        }
      },
    },

    '#produto': {
      mount(params) {
        const id = params[0] || 1;
        const product = StoreData.getById(id);
        if (!product) return;

        const bc = document.getElementById('produto-breadcrumb');
        const bcc = document.getElementById('produto-breadcrumb-cat');
        if (bc) bc.textContent = product.name;
        if (bcc) bcc.textContent = product.category;

        const mainImg = document.getElementById('produto-main-img');
        if (mainImg) {
          mainImg.src = product.img;
          mainImg.alt = product.name;
          mainImg.setAttribute('onerror', IMG_ONERROR_ATTR);
        }

        const thumbsEl = document.getElementById('produto-thumbnails');
        if (thumbsEl) {
          thumbsEl.innerHTML = (product.thumbnails || [product.img])
            .map(
              (url, i) =>
                `<img src="${url}" alt="Vista ${i + 1}" ${imgErr()}
                data-action="switch-image" data-url="${url}"
                class="w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-colors
                       ${i === 0 ? 'border-gold' : 'border-gray-200 hover:border-gold'}"
                loading="lazy">`,
            )
            .join('');
        }

        const infoEl = document.getElementById('produto-info');
        if (infoEl) {
          const discount = product.discount
            ? `<span class="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">${product.discount}% OFF</span>`
            : '';
          const oldPrice = product.oldPrice
            ? `<span class="text-sm text-concrete line-through">${fmt(product.oldPrice)}</span>`
            : '';
          infoEl.innerHTML = `
          <span class="inline-flex items-center bg-navy text-gold text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide w-fit">
            ${product.badge || product.category}
          </span>
          <h1 class="font-serif text-4xl font-bold text-navy leading-tight">${product.name}</h1>
          <p class="text-concrete">${product.tagline}</p>
          <div class="flex items-baseline gap-3 flex-wrap">
            ${oldPrice}
            <span class="text-4xl font-bold text-navy">${fmt(product.price)}</span>
            ${discount}
          </div>
          <div>
            <p class="text-xs font-bold text-concrete uppercase tracking-wide mb-2">Voltagem</p>
            <div class="flex gap-2">
              <button class="volt-btn px-5 py-2 border-2 border-navy bg-navy text-white font-bold rounded-xl text-sm" data-volt="127">127V</button>
              <button class="volt-btn px-5 py-2 border-2 border-gray-200 text-concrete font-bold rounded-xl text-sm hover:border-navy transition-all" data-volt="220">220V</button>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="flex items-center border border-gray-200 rounded-2xl overflow-hidden">
              <button data-action="qty-dec" class="w-11 h-11 bg-chalk text-navy font-bold text-xl hover:bg-gray-200 transition-colors flex items-center justify-center">−</button>
              <span id="produto-qty" class="px-5 font-bold text-navy text-base">1</span>
              <button data-action="qty-inc" class="w-11 h-11 bg-chalk text-navy font-bold text-xl hover:bg-gray-200 transition-colors flex items-center justify-center">+</button>
            </div>
            <button data-action="add-to-cart" data-product-id="${product.id}"
                    class="flex-1 bg-gold hover:bg-gold-dark text-white font-bold py-3.5 rounded-2xl transition-colors text-sm uppercase tracking-wide">
              + Adicionar ao Carrinho
            </button>
          </div>
          <div>
            <p class="text-xs font-bold text-concrete uppercase tracking-wide mb-2">Calcular Frete</p>
            <div class="flex gap-2">
              <input type="text" placeholder="00000-000"
                     class="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gold transition-colors">
              <button class="bg-navy text-white text-sm font-bold px-5 rounded-xl hover:bg-navy-dark transition-colors">Calcular</button>
            </div>
          </div>
          <div class="flex items-center gap-2 text-sm text-concrete">
            <span class="text-emerald-600 font-bold">🚚</span>
            Frete grátis para compras acima de R$ 499,00
          </div>`;
        }

        const descTitleEl = document.getElementById('produto-desc-title');
        const descTextEl = document.getElementById('produto-desc-text');
        if (descTitleEl) descTitleEl.textContent = product.detailsTitle || product.name;
        if (descTextEl) descTextEl.textContent = product.detailsText || product.tagline;

        const specsEl = document.getElementById('produto-specs');
        if (specsEl) {
          specsEl.innerHTML = product.specs
            .map(
              (s) =>
                `<li class="bg-chalk rounded-xl p-3 text-sm">
             <strong class="block text-navy text-xs uppercase tracking-wide mb-0.5">${s.label}</strong>
             <span class="text-concrete">${s.value}</span>
           </li>`,
            )
            .join('');
        }

        const relEl = document.getElementById('related-products-grid');
        if (relEl) {
          relEl.innerHTML = StoreData.products
            .filter((p) => p.id !== product.id)
            .map(buildProductCard)
            .join('');
        }
      },
    },

    '#checkout': {
      mount() {
        const itemsEl = document.getElementById('checkout-order-items');
        const subEl = document.getElementById('checkout-subtotal');
        const totalEl = document.getElementById('checkout-total');
        const errEl = document.getElementById('checkout-validation-error');
        if (errEl) {
          errEl.textContent = '';
          errEl.classList.add('hidden');
        }
        document.getElementById('checkout-email')?.classList.remove('checkout-field-error');
        document.getElementById('checkout-cep')?.classList.remove('checkout-field-error');
        if (!itemsEl) return;

        if (cart.items.length === 0) {
          itemsEl.innerHTML =
            '<p class="text-concrete text-sm text-center py-6">Nenhum item no carrinho. Adicione produtos antes de finalizar.</p>';
          if (subEl) subEl.textContent = fmt(0);
          if (totalEl) totalEl.textContent = fmt(0);
        } else {
          itemsEl.innerHTML = cart.items
            .map(
              (i) =>
                `<div class="flex gap-3 text-sm">
           <img src="${i.img}" alt="${i.name}" ${imgErr()} class="w-14 h-14 object-cover rounded-xl flex-shrink-0" loading="lazy">
           <div class="flex-1">
             <p class="font-semibold text-navy text-sm leading-snug">${i.name}</p>
             <p class="text-concrete text-xs mt-0.5">Qtd: ${i.qty} &nbsp;|&nbsp; ${fmt(i.price)}</p>
           </div>
         </div>`,
            )
            .join('');

          const total = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
          if (subEl) subEl.textContent = fmt(total);
          if (totalEl) totalEl.textContent = fmt(total);
        }

        if (typeof syncCheckoutCtas === 'function') syncCheckoutCtas();
      },
    },

    '#minha-conta': {
      mount() {
        /* estático */
      },
    },

    '#admin-dashboard': {
      mount() {
        shell.setAdminNavActive('#admin-dashboard');
      },
    },

    '#admin-produtos': {
      mount() {
        shell.setAdminNavActive('#admin-produtos');
        const tbody = document.getElementById('admin-products-tbody');
        if (tbody) tbody.innerHTML = StoreData.products.map(buildAdminTableRow).join('');
      },
    },

    '#admin-inventario': {
      mount() {
        shell.setAdminNavActive('#admin-inventario');
        const grid = document.getElementById('inventario-grid');
        if (grid) {
          const addCard = `
          <article data-action="nav-admin-editar"
                   class="border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center
                          min-h-56 cursor-pointer hover:border-gold hover:bg-gold/5 transition-all group">
            <div class="text-center">
              <div class="text-5xl text-concrete group-hover:text-gold transition-colors mb-2">+</div>
              <p class="font-bold text-navy text-sm">Novo Produto</p>
              <p class="text-xs text-concrete">Clique para expandir o catálogo</p>
            </div>
          </article>`;
          grid.innerHTML = StoreData.products.map(buildInventarioCard).join('') + addCard;
        }
      },
    },

    '#admin-editar-produto': {
      mount() {
        shell.setAdminNavActive('#admin-editar-produto');
      },
    },
  };
}
