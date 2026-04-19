💡 Hands On Work V (HOW V) - Plataforma E-commerce NaveLuz
Este projeto foi desenvolvido como requisito para a disciplina de Hands on Work V do curso de Análise e Desenvolvimento de Sistemas (ADS) na Univali - Campus Itajaí. O objetivo central foi projetar e implementar a transformação digital da NaveLuz Comércio de Materiais Elétricos, elevando a marca de um retalho local para um patamar institucional e digital.

🏢 Sobre a NaveLuz e o Desafio
A NaveLuz é uma loja tradicional de materiais elétricos e de construção. O projeto nasceu da necessidade de modernizar a operação comercial da empresa, que até então dependia estritamente do fluxo presencial de clientes.

O Problema: A empresa enfrentava desafios com processos manuais e não possuía um catálogo online, o que limitava o seu alcance no mercado atual.
A Solução: Desenvolvimento de uma plataforma web focada em conversão, com catálogo dinâmico (PLP), simulação de checkout para pagamentos digitais e um painel de telemetria administrativa.

🚀 Arquitetura e Tecnologias
O projeto foi construído sob o paradigma de Single Page Application (SPA), estruturado de forma nativa (Vanilla) para demonstrar domínio absoluto sobre a manipulação do DOM e roteamento assíncrono.

HTML5 Semântico: Estruturação baseada em templates para renderização dinâmica no cliente.

CSS3 & Tailwind CSS: Estilização via JIT Compiler, garantindo um design Mobile-First e paleta institucional.

JavaScript (ES6+): Arquitetura modular (Controllers, Services, Core Routing).

Gestão de Estado: Uso de Local Storage para persistência de dados do carrinho.

Simulação de Back-end: Consumo de dados assíncrono via Promises.

Hospedagem (CI/CD): Deploy automatizado na Vercel.

✨ Funcionalidades Principais
Motor de Roteamento Customizado: Navegação instantânea sem recarregamento de página.

Product Listing Page (PLP): Catálogo avançado com motor de filtragem reativo.

Carrinho de Compras: Gestão de itens off-canvas com cálculos de subtotais em tempo real.

Simulação de Checkout: Fluxo completo com formulários validados.

Micro-interações: Animações de Scroll Reveal.

Dashboard Administrativo: Interface de gestão com indicadores de desempenho e controle de estoque simulado.

📂 Estrutura de Diretórios (SoC)
A base de código segue o princípio de Separação de Responsabilidades (Separation of Concerns):

```text
/
├── assets/img/          # Assets otimizados (WebP)
├── css/
│   └── styles.css       # Classes utilitárias do Tailwind
├── js/
│   ├── app.js           # Entrypoint e orquestração
│   ├── core/
│   │   └── Router.js    # Motor de roteamento
│   ├── controllers/
│   │   └── ViewControllers.js # Ciclo de vida das views
│   ├── data/
│   │   └── mockDatabase.js    # Simulação de API e dados
│   └── services/
│       └── CartService.js     # Lógica de negócio do carrinho
└── index.html           # Shell da aplicação
```

⚙️ Como Executar o Projeto
Visualizar em Produção:
O sistema está acessível publicamente através do link: https://hands-on-work-5.vercel.app/#home

Executar Localmente:
Por utilizar módulos ES6, o projeto requer um servidor HTTP local para evitar bloqueios de CORS do protocolo file://.

Faça o clone do repositório.

Abra a pasta no VS Code.

Utilize a extensão Live Server no arquivo index.html.
##👥 Equipe de Desenvolvimento 
Projeto concebido e desenvolvido sob orientação do Prof. Maurício Pasetto de Freitas, pelos acadêmicos:

- Felipe Ramos Silva 
- Felipe Ribeiro 
- Fernando Menezes de Jesus 
- João Gabriel Kuhn Burigo 
- Letícia Lamara Vieira dos Anjos 
- Samuel Santos
