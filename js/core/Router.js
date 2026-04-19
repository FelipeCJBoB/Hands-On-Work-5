/**
 * Mapa rota → template do <template id="…"> e modo de shell (header/footer/admin).
 */
export const ROUTES = {
  '#home': { template: 'view-home', mode: 'client' },
  '#categorias': { template: 'view-categorias', mode: 'client' },
  '#quem-somos': { template: 'view-quem-somos', mode: 'client' },
  '#auth': { template: 'view-auth', mode: 'fullscreen' },
  '#produto': { template: 'view-produto', mode: 'client' },
  '#checkout': { template: 'view-checkout', mode: 'checkout' },
  '#minha-conta': { template: 'view-conta', mode: 'client' },
  '#admin-dashboard': { template: 'view-admin-dashboard', mode: 'admin' },
  '#admin-produtos': { template: 'view-admin-produtos', mode: 'admin' },
  '#admin-inventario': { template: 'view-admin-inventario', mode: 'admin' },
  '#admin-editar-produto': { template: 'view-admin-editar', mode: 'admin' },
};

/**
 * Converte "#produto/3" em rota canônica e parâmetros de rota.
 */
export function parseHash(rawHash) {
  const clean = (rawHash || '').replace(/^#\/?/, '').trim();
  const parts = clean.split('/');
  const route = '#' + (parts[0] || 'home');
  const params = parts.slice(1);
  return { route, params };
}

/**
 * Fábrica do navegador: injeta dependências para testabilidade e evitar globais.
 */
export function createNavigate({ shell, viewControllers, routes = ROUTES } = {}) {
  return function navigate(rawHash) {
    const { route, params } = parseHash(rawHash || window.location.hash);
    const config = routes[route];

    if (!config) {
      window.location.hash = '#home';
      return;
    }

    const tpl = document.getElementById(config.template);
    if (!tpl) return;

    shell.applyMode(config.mode);

    const fragment = tpl.content.cloneNode(true);
    shell.appRoot.innerHTML = '';
    shell.appRoot.appendChild(fragment);

    window.scrollTo({ top: 0, behavior: 'instant' });

    const ctrl = viewControllers[route];
    if (ctrl && typeof ctrl.mount === 'function') {
      ctrl.mount(params);
    }
  };
}
