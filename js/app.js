'use strict';

import { StoreData } from './data/mockDatabase.js';
import { createCartService } from './services/CartService.js';
import { ROUTES, createNavigate } from './core/Router.js';
import { createViewControllers } from './controllers/ViewControllers.js';

/** Validação superficial de e-mail (protótipo; backend valida de verdade). */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** CEP brasileiro formatado XXXXX-XXX */
const CEP_RE = /^\d{5}-\d{3}$/;

const Shell = {
  header: document.getElementById('client-header'),
  footer: document.getElementById('client-footer'),
  adminSidebar: document.getElementById('admin-sidebar'),
  cartSidebar: document.getElementById('cart-sidebar'),
  cartOverlay: document.getElementById('cart-overlay'),
  appRoot: document.getElementById('app-root'),

  applyMode(mode) {
    const isClient = mode === 'client';
    const isAdmin = mode === 'admin';
    const showHdr = isClient || mode === 'checkout';
    const showFtr = isClient;

    this.header.style.display = showHdr ? '' : 'none';
    this.footer.style.display = showFtr ? '' : 'none';
    this.adminSidebar.style.display = isAdmin ? 'flex' : 'none';
    this.appRoot.style.marginLeft = isAdmin ? '240px' : '';
  },

  updateCartBadge() {
    const count = cart.count;
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  },

  openCart() {
    cart.renderSidebar();
    this.cartSidebar.classList.add('open');
    this.cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeCart() {
    this.cartSidebar.classList.remove('open');
    this.cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  },

  setAdminNavActive(route) {
    document.querySelectorAll('.admin-nav-item').forEach((el) => {
      const href = el.getAttribute('href') || el.dataset.nav;
      el.classList.toggle('active', href === route);
    });
  },
};

function syncCheckoutCtas() {
  const empty = cart.count === 0;
  document.querySelectorAll('[data-action="go-checkout"]').forEach((btn) => {
    btn.disabled = empty;
    btn.classList.toggle('opacity-40', empty);
    btn.classList.toggle('pointer-events-none', empty);
    btn.classList.toggle('cursor-not-allowed', empty);
    btn.setAttribute('aria-disabled', empty ? 'true' : 'false');
  });
  const fin = document.querySelector('[data-action="finalize-order"]');
  if (fin) {
    fin.disabled = empty;
    fin.classList.toggle('opacity-40', empty);
    fin.classList.toggle('pointer-events-none', empty);
    fin.classList.toggle('cursor-not-allowed', empty);
  }
}

const cart = createCartService({
  shell: Shell,
  afterRender: syncCheckoutCtas,
});

const viewControllers = createViewControllers({ cart, shell: Shell, syncCheckoutCtas });
const navigate = createNavigate({ shell: Shell, viewControllers, routes: ROUTES });

function showCheckoutError(msg) {
  const errEl = document.getElementById('checkout-validation-error');
  if (!errEl) return;
  errEl.textContent = msg;
  errEl.classList.remove('hidden');
}

function clearCheckoutError() {
  const errEl = document.getElementById('checkout-validation-error');
  if (!errEl) return;
  errEl.textContent = '';
  errEl.classList.add('hidden');
  document.getElementById('checkout-email')?.classList.remove('checkout-field-error');
  document.getElementById('checkout-cep')?.classList.remove('checkout-field-error');
}

const Actions = {
  'nav-home': () => {
    window.location.hash = '#home';
  },
  'nav-account': () => {
    window.location.hash = '#minha-conta';
  },
  'nav-storefront': () => {
    window.location.hash = '#home';
  },
  'nav-admin-editar': () => {
    window.location.hash = '#admin-editar-produto';
  },
  'admin-back': () => {
    history.back();
  },
  'admin-discard': () => {
    window.location.hash = '#admin-produtos';
  },
  'admin-logout': () => {
    window.location.hash = '#auth';
  },

  'admin-save-product': () => {
    alert('✅ Produto publicado com sucesso!');
    window.location.hash = '#admin-produtos';
  },

  'admin-delete-product': (el) => {
    const id = el.dataset.productId;
    if (confirm(`Remover produto #${id} do catálogo?`)) {
      alert(`Produto #${id} removido.`);
    }
  },

  'admin-repor-estoque': (el) => {
    alert(`📦 Pedido de reposição para "${el.dataset.product}" enviado ao fornecedor!`);
  },

  'open-cart': () => {
    Shell.openCart();
  },
  'close-cart': () => {
    Shell.closeCart();
  },

  'go-checkout': () => {
    if (cart.count === 0) return;
    Shell.closeCart();
    window.location.hash = '#checkout';
  },

  'add-to-cart': (el) => {
    const id = parseInt(el.dataset.productId, 10);
    const qtyEl = document.getElementById('produto-qty');
    const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
    cart.add(id, qty, (pid) => StoreData.getById(pid));
    Shell.openCart();
  },

  'cart-inc': (el) => {
    const id = parseInt(el.dataset.productId, 10);
    const item = cart.items.find((i) => i.id === id);
    if (item) cart.updateQty(id, item.qty + 1);
  },

  'cart-dec': (el) => {
    const id = parseInt(el.dataset.productId, 10);
    const item = cart.items.find((i) => i.id === id);
    if (!item) return;
    if (item.qty > 1) cart.updateQty(id, item.qty - 1);
    else cart.remove(id);
  },

  'cart-remove': (el) => {
    cart.remove(el.dataset.productId);
  },

  'view-product': (el) => {
    window.location.hash = `#produto/${el.dataset.productId}`;
  },

  'qty-inc': () => {
    const el = document.getElementById('produto-qty');
    if (el) el.textContent = parseInt(el.textContent, 10) + 1;
  },

  'qty-dec': () => {
    const el = document.getElementById('produto-qty');
    if (el && parseInt(el.textContent, 10) > 1) el.textContent = parseInt(el.textContent, 10) - 1;
  },

  'switch-image': (el) => {
    const mainImg = document.getElementById('produto-main-img');
    if (mainImg) mainImg.src = el.dataset.url;
    document.querySelectorAll('#produto-thumbnails img').forEach((img) => {
      img.classList.toggle('border-gold', img.dataset.url === el.dataset.url);
      img.classList.toggle('border-gray-200', img.dataset.url !== el.dataset.url);
    });
  },

  'finalize-order': () => {
    if (cart.count === 0) return;

    const emailEl = document.getElementById('checkout-email');
    const cepEl = document.getElementById('checkout-cep');
    const email = (emailEl && emailEl.value.trim()) || '';
    const cep = (cepEl && cepEl.value.trim()) || '';

    if (!EMAIL_RE.test(email)) {
      showCheckoutError('Informe um e-mail válido.');
      if (emailEl) emailEl.classList.add('checkout-field-error');
      if (cepEl) cepEl.classList.remove('checkout-field-error');
      return;
    }
    if (emailEl) emailEl.classList.remove('checkout-field-error');

    if (!CEP_RE.test(cep)) {
      showCheckoutError('CEP inválido. Use o formato 00000-000.');
      if (cepEl) cepEl.classList.add('checkout-field-error');
      if (emailEl) emailEl.classList.remove('checkout-field-error');
      return;
    }
    if (cepEl) cepEl.classList.remove('checkout-field-error');

    clearCheckoutError();
    alert('🎉 Pedido finalizado! Obrigado pela sua compra na NaveLuz.');
    cart.clear();
    window.location.hash = '#home';
  },

  'auth-login': () => {
    /* submit capturado no listener de form */
  },
};

document.addEventListener('click', (e) => {
  const tabBtn = e.target.closest('.tab-btn');
  if (tabBtn && tabBtn.dataset.tab) {
    const tab = tabBtn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach((b) => {
      const active = b.dataset.tab === tab;
      b.classList.toggle('tab-active', active);
      b.classList.toggle('border-navy', active);
      b.classList.toggle('text-navy', active);
      b.classList.toggle('border-transparent', !active);
      b.classList.toggle('text-concrete', !active);
    });
    document.querySelectorAll('.tab-panel').forEach((p) => {
      p.classList.toggle('hidden', p.id !== `tab-${tab}`);
    });
    return;
  }

  const pmBtn = e.target.closest('.payment-method-btn');
  if (pmBtn) {
    document.querySelectorAll('.payment-method-btn').forEach((b) => {
      const active = b === pmBtn;
      b.classList.toggle('border-2', active);
      b.classList.toggle('border-navy', active);
      b.classList.toggle('bg-chalk', active);
      b.classList.toggle('border', !active);
      b.classList.toggle('border-gray-200', !active);
      b.classList.toggle('text-navy', active);
      b.classList.toggle('text-concrete', !active);
    });
    return;
  }

  const voltBtn = e.target.closest('.volt-btn');
  if (voltBtn) {
    document.querySelectorAll('.volt-btn').forEach((b) => {
      const active = b === voltBtn;
      b.classList.toggle('bg-navy', active);
      b.classList.toggle('text-white', active);
      b.classList.toggle('border-navy', active);
      b.classList.toggle('text-concrete', !active);
      b.classList.toggle('border-gray-200', !active);
    });
    return;
  }

  const navEl = e.target.closest('[data-nav]');
  if (navEl) {
    e.preventDefault();
    window.location.hash = navEl.dataset.nav;
    return;
  }

  const actionEl = e.target.closest('[data-action]');
  if (!actionEl) return;
  const action = actionEl.dataset.action;
  if (typeof Actions[action] === 'function') {
    Actions[action](actionEl);
  }
}, false);

document.addEventListener('submit', (e) => {
  if (e.target.dataset.action === 'auth-login') {
    e.preventDefault();
    window.location.hash = '#home';
  }
}, false);

document.getElementById('cart-overlay').addEventListener('click', () => Shell.closeCart());

window.addEventListener('hashchange', () => navigate(window.location.hash));

function init() {
  Shell.updateCartBadge();
  cart.renderSidebar();
  syncCheckoutCtas();
  navigate(window.location.hash || '#home');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
