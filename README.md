# 💡 Hands On Work V (HOW V) - Plataforma E-commerce NaveLuz

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Implantar](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Tecnologia](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_Tailwind-blue)

[citar_iniciar]Este projeto foi desenvolvido como requisito para a disciplina de **Trabalho prático V**  [citar_iniciar]do curso de Análise e Desenvolvimento de Sistemas (ADS) na **Univali - Campus Itajaí**[citar: 2]. [citar_iniciar]O objetivo central foi projetar e implementar uma transformação digital da **NaveLuz Comércio de Materiais Elétricos**[citar: 14], elevando a marca de um varejo local para um patamar institucional e digital.

---

## 🏢 Sobre a NaveLuz e o Desafio
[citar_iniciar]A NaveLuz nasceu da expertise prática de seus financiadores[citar: 27]. [citar_iniciar]O que veio como uma oportunidade se arrepende em um espaço de casas duas salas [citar: 32, 35][citar_início], transformou-se, ao longo de 6 anos, em uma operação consolidada de 5 salas e infraestrutura de apoio lógico[citar: 36]. 

[citar_iniciar]**Ó Problema:** A empresa soja com processos analíticos (endas "fiado") e ausência de catálogo online, limitando seu crescimento ao comércio físico[citar: 55, 59, 60].
**A Solução:** Desenvolvimento de uma plataforma web focada em conversão, com catálogo dinâmico (PLP), simulação de checkout para padronização de pagamentos digitais e um painel de telemetria administrativa.

---

## 🚀 Arquitetura e Tecnologias

O projeto foi construído sob o paradigma de **Aplicação de página sonora (SPA)**, evitando frameworks pesados neste estágio (como React ou Angular) para demonstrar domínio absoluto sobre a manipulação do DOM, sistema de software *Baunilha*.

* **HTML5 Semântico:** Estruturação básica em `<modelo>` para renderização dinâmica *lado do cliente*.
* **CSS3 e Tailwind CSS:** Estilização via JIT Compiler, garantindo um design *Primeiro celular* fluido, com paleta de núcleos institucionais (*Azul Naval* e *Ouro Queimado*).
* **JavaScript (ES6+):** Arquitetura modularizada (Controladores, Serviços, Roteamento de Núcleos).
* **Gestão de Estado:** Uso de `armamento local` para persistência de dados do carro.
* **Simulação de Back-end:** Consumo de dados assíncrono via *Promessas* para emular latência de rede e APIs.
* **Hospedagem (CI/CD):** Implante automatizado via Vercel.

---

## ✨ Funções Principais

* **Motor de Roteamento Personalizado:** Navegação instantânea sem registro de página.
* **Página de lista de produtos (PLP):** Catálogo avançado com motor de filtro reativo (por categoria e busca textual simultânea).
* **Carrinho de Compras Assíncrono:** Gestão de itens off-canvas com cálculo de subtotais em tempo real.
* **Simulação de Checkout:** Fluxo de 3 etapas com formulários válidos.
* **Microinterações:** Animações de *Revelação do pergaminho* utilizando uma API `Observador de Interseção`.
* **Pintura Administrativa:** Interface de gestão com indicadores de desempenho (KPIs) e controle de estoque simulado.

---

## 📂 Estrutura de Diretórios (SoC)

A base de código segue o princípio de *Separação de Preocupações* (Separação de Responsabilidades):
```texto
/
├── ativos/img/ # Ativos otimizados (WebP) com tratamento de fallback
├── css/
│ └── styles.css # Classes utilitárias do Tailwind e animações personalizadas
├── js/
│ ├── app.js # Entrypoint e organização de eventos delegados
│ ├── núcleo/
│ │ └── Router.js # Motor de controle dinâmico baseado em Hash
│ ├── controladores/
│ │ └── ViewControllers.js # Ciclo de vida das telas e injeção de DOM
│ ├── dados/
│ │ └── mockDatabase.js # Estrutura de dados e simulação de latência de API
│ └── serviços/
│ └── CartService.js # Lógica de negação e persistência local
└── index.html # Shell da aplicação contendo os templates
```

##⚙️ Como Executar o Projeto 
Visualizar em Produção:
O sistema está acessível publicamente ao link: https://hands-on-work-5.vercel.app/#home 

Executar Localmente:
Para utilizar módulos ES6 (importação/exportação), o projeto requer um servidor HTTP local para funcionar corretamente (evitando blocos de CORS do protocolo file://).
Faça o clone do repositório:
clone git https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
Abra uma massa sem VS Code.
Utilize uma extensão Live Server (ou similar) no arquivo index.html.

##👥 Equipe de Desenvolvimento 
Projeto concebido e desenvolvido sob orientação do Prof. Maurício Pasetto de Freitas, pelos acadêmicos:

- Felipe Ramos Silva 
- Felipe Ribeiro 
- Fernando Menezes de Jesus 
- João Gabriel Kuhn Burigo 
- Letícia Lamara Vieira dos Anjos 
- Samuel Santos
