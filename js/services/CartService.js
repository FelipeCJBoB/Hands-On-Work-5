const STORAGE_KEY = 'naveluz_cart';

/** Evita loop infinito se o placeholder também falhar. */
export const IMG_ONERROR_ATTR =
  'this.onerror=null; this.src=\'./assets/img/placeholder.webp\';';

/**
 * Carrinho com persistência local.
 * shell: badge no header; afterRender: sincroniza CTAs (checkout) pós-DOM.
 */
export function createCartService({ shell, afterRender } = {}) {
  const tick = () => {
    if (shell && typeof shell.updateCartBadge === 'function') shell.updateCartBadge();
    if (typeof afterRender === 'function') afterRender();
  };

  const service = {
    _items: JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'),

    get items() {
      return this._items;
    },
    get count() {
      return this._items.reduce((s, i) => s + i.qty, 0);
    },
    get total() {
      return this._items.reduce((s, i) => s + i.price * i.qty, 0);
    },

    add(productId, qty = 1, getProduct) {
      const p = getProduct(productId);
      if (!p) return;
      const existing = this._items.find((i) => i.id === p.id);
      if (existing) existing.qty += qty;
      else this._items.push({ id: p.id, name: p.name, price: p.price, img: p.img, qty });
      this._save();
    },

    remove(productId) {
      this._items = this._items.filter((i) => i.id !== parseInt(productId, 10));
      this._save();
    },

    updateQty(productId, qty) {
      const item = this._items.find((i) => i.id === parseInt(productId, 10));
      if (item) {
        item.qty = Math.max(1, qty);
        this._save();
      }
    },

    clear() {
      this._items = [];
      this._save();
    },

    _save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items));
      this.renderSidebar();
    },

    renderSidebar() {
      const container = document.getElementById('cart-items');
      const emptyMsg = document.getElementById('cart-empty-msg');
      const subtotalEl = document.getElementById('cart-subtotal');
      const totalEl = document.getElementById('cart-total');
      const countHdr = document.getElementById('cart-count-header');
      if (!container) return;

      tick();

      if (countHdr) countHdr.textContent = `(${this.count})`;

      container.querySelectorAll('.cart-item-row').forEach((el) => el.remove());

      if (this._items.length === 0) {
        if (emptyMsg) emptyMsg.style.display = '';
        if (subtotalEl) subtotalEl.textContent = 'R$ 0,00';
        if (totalEl) totalEl.textContent = 'R$ 0,00';
        return;
      }
      if (emptyMsg) emptyMsg.style.display = 'none';

      const fmt = (n) =>
        n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      this._items.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'cart-item-row flex gap-3';
        div.innerHTML = `
        <img src="${item.img}" alt="${item.name}" onerror="${IMG_ONERROR_ATTR}"
             class="w-14 h-14 object-cover rounded-xl flex-shrink-0 bg-chalk" loading="lazy">
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-navy leading-snug truncate">${item.name}</p>
          <p class="text-xs text-gold font-bold mt-0.5">${fmt(item.price)}</p>
          <div class="flex items-center gap-3 mt-2">
            <button data-action="cart-dec" data-product-id="${item.id}"
                    class="w-6 h-6 bg-chalk rounded-full text-navy font-bold text-sm flex items-center justify-center hover:bg-gray-200 transition-colors select-none">−</button>
            <span class="text-sm font-bold text-navy">${item.qty}</span>
            <button data-action="cart-inc" data-product-id="${item.id}"
                    class="w-6 h-6 bg-chalk rounded-full text-navy font-bold text-sm flex items-center justify-center hover:bg-gray-200 transition-colors select-none">+</button>
          </div>
        </div>
        <button data-action="cart-remove" data-product-id="${item.id}"
                class="self-start text-concrete hover:text-red-500 transition-colors text-xl leading-none flex-shrink-0">×</button>`;
        container.appendChild(div);
      });

      if (subtotalEl) subtotalEl.textContent = fmt(this.total);
      if (totalEl) totalEl.textContent = fmt(this.total);
    },
  };

  return service;
}
