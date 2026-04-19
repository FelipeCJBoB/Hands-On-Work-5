# NaveLuz SPA — Plano de Implementação

## Mapeamento das 11 Páginas

| # | Arquivo | Domínio | Rota SPA | Descrição |
|---|---------|---------|----------|-----------|
| 1 | pagina-1.html | Front-Office | `#auth` | Login / Autenticação |
| 2 | pagina-2.html | Front-Office | `#home` | Homepage (Hero, Categorias, Ofertas, Sobre) |
| 3 | pagina-3.html | Front-Office | `#produto` | Detalhe de Produto (v1 — layout denso) |
| 4 | pagina-4.html | Front-Office | `#produto` | Detalhe de Produto (v2 — canonical, usa imagens reais) |
| 5 | pagina-5.html | Front-Office | `#checkout` | Finalizar Pagamento |
| 6 | pagina-6.html | Front-Office | `#minha-conta` | Minha Conta / Meus Pedidos |
| 7 | pagina-7.html | Back-Office | `#admin-dashboard` | Admin Dashboard (visão geral) |
| 8 | pagina-8.html | Back-Office | `#admin-editar-produto` | Admin — Editar Produto |
| 9 | pagina-9.html | Back-Office | `#admin-produtos` | Admin — Lista de Produtos |
| 10 | pagina-10.html | Back-Office | `#admin-dashboard` | Admin Dashboard (variante light) |
| 11 | pagina-11.html | Back-Office | `#admin-inventario` | Admin — Gestão de Inventário |

> Pages 3 e 4 são duas variantes da mesma view; a pagina-4 (com imagens reais) será a canonical. Pages 7 e 10 são variantes do dashboard; usaremos a 7 (dark) como primária e a 10 (light) como variante alternativa integrada.

---

## Arquitetura SPA

### Shell Global (sempre presente no `<body>`)
```
<body>
  <header id="client-header">  <!-- Loja -->
  <aside id="admin-sidebar">   <!-- Admin, oculto por padrão -->
  <main id="app-root">         <!-- Host injetável -->
  <footer id="client-footer">  <!-- Loja -->
```

### Rotas e Templates
| Hash | Template ID | Shell State |
|------|-------------|-------------|
| `#home` | `view-home` | client-header + client-footer visíveis |
| `#auth` | `view-auth` | header/footer ocultos (página fullscreen) |
| `#produto` | `view-produto` | client-header + client-footer |
| `#checkout` | `view-checkout` | header simplificado |
| `#minha-conta` | `view-conta` | client-header + client-footer |
| `#admin-dashboard` | `view-admin-dashboard` | admin-sidebar visível, header/footer ocultos |
| `#admin-produtos` | `view-admin-produtos` | admin-sidebar |
| `#admin-inventario` | `view-admin-inventario` | admin-sidebar |
| `#admin-editar-produto` | `view-admin-editar` | admin-sidebar |

### Router State Machine (Vanilla JS)
```js
const ROUTES = {
  '#home': { template: 'view-home', mode: 'client' },
  '#auth': { template: 'view-auth', mode: 'fullscreen' },
  '#produto': { template: 'view-produto', mode: 'client' },
  '#checkout': { template: 'view-checkout', mode: 'checkout' },
  '#minha-conta': { template: 'view-conta', mode: 'client' },
  '#admin-dashboard': { template: 'view-admin-dashboard', mode: 'admin' },
  '#admin-produtos': { template: 'view-admin-produtos', mode: 'admin' },
  '#admin-inventario': { template: 'view-admin-inventario', mode: 'admin' },
  '#admin-editar-produto': { template: 'view-admin-editar', mode: 'admin' },
};
```

### Shell Mode switcher
```js
function applyShellMode(mode) {
  clientHeader.style.display  = mode === 'client' ? '' : 'none';
  clientFooter.style.display  = mode === 'client' ? '' : 'none';
  adminSidebar.style.display  = mode === 'admin'  ? '' : 'none';
  // 'fullscreen' e 'checkout' ocultam ambos
}
```

---

## Design System (Tailwind Config)

```js
tailwind.config = {
  theme: {
    extend: {
      colors: {
        navy:    '#1B2A41',   // Azul Naval
        gold:    '#C5A059',   // Ouro Queimado
        concrete:'#809490',   // Concreto Aparente
        chalk:   '#FBF9FA',   // Branco Gesso
      },
      fontFamily: {
        sans:  ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    }
  }
}
```

---

## window.StoreData (Mock Global)

```js
window.StoreData = {
  products: [
    { id: 1, name: 'Torneira Slim 4T Hydra', price: 219.00, oldPrice: 580.00, category: 'Hidráulica', img: '...' },
    { id: 2, name: 'Luminária LED Pendente', price: 489.90, category: 'Iluminação', img: '...' },
    { id: 3, name: 'Parafusadeira 20V',      price: 1049.00, category: 'Ferramentas', img: '...' },
    { id: 4, name: 'Porcelanato 60x60',      price: 159.92, category: 'Pisos', img: '...' },
  ],
  categories: ['Ferramentas', 'Iluminação', 'Pisos', 'Hidráulica'],
};
```

---

## Persistência do Carrinho

```js
// Leitura inicial
window.Cart = JSON.parse(localStorage.getItem('naveluz_cart') || '[]');

// Escrita após mutação
function saveCart() {
  localStorage.setItem('naveluz_cart', JSON.stringify(window.Cart));
  updateCartBadge();
}
```

---

## Proposta de Mudanças (Arquivo Único)

### [NEW] index.html
Localização: `c:\Users\Felipe_a_Lenda\Documents\- UNIVALI\Trimestre 5\HOW V\Site_Git\How V Paginas CSS\index.html`

**Estrutura interna:**

1. `<head>` — meta, Google Fonts (Montserrat + Playfair Display), Tailwind CDN, tailwind.config inline
2. `<style>` — CSS customizado mínimo para animações e estados que Tailwind não cobre (ex: transitions da sidebar, scrollbar personalizada)
3. **Shell HTML:**
   - `<header id="client-header">` — logo NaveLuz, nav (Home, Categorias, Serviços, Contato), barra de busca, ícones user/cart com badge
   - `<aside id="admin-sidebar">` — logo Admin, nav links (Dashboard, Pedidos, Produtos, Inventário, Clientes, Relatórios), botão Sair
   - `<main id="app-root">` — vazio, receberá conteúdo via router
   - `<footer id="client-footer">` — colunas (logo+desc, links, newsletter, redes sociais)
4. **Templates `<template>` (11 views):**
   - `view-home` — hero, benefits bar, categories grid, products grid, about section
   - `view-auth` — split layout (hero-left + form-right)
   - `view-produto` — galeria + info + tabs (descrição, avaliações, instalação) + produtos relacionados
   - `view-checkout` — form em 3 steps + order summary
   - `view-conta` — sidebar de conta + lista de pedidos
   - `view-admin-dashboard` — KPI cards + tabela de pedidos + estoque crítico
   - `view-admin-produtos` — filtros + tabela de produtos + pagination
   - `view-admin-inventario` — filtros + grid de cards de produto + pagination
   - `view-admin-editar` — form de edição de produto (2 colunas)
5. **`<script>`** — StoreData, Cart (localStorage), Router (hashchange + navigate)

---

## Plano de Verificação

### Testes de Roteamento
- [ ] `#home` → renderiza hero e produtos
- [ ] `#auth` → oculta header/footer, renderiza split screen
- [ ] `#admin-dashboard` → oculta header/footer client, renderiza sidebar admin
- [ ] Hash vazio / inválido → fallback para `#home`
- [ ] Navegar entre rotas admin e client → shell muda corretamente

### Testes de Estado
- [ ] Adicionar produto ao carrinho → badge atualiza
- [ ] F5 / refresh → carrinho persiste via localStorage

### Testes Visuais
- [ ] Design system aplicado (cores navy/gold/concrete/chalk)
- [ ] Fontes Montserrat e Playfair Display carregadas
- [ ] Animações smooth nas transições de view
