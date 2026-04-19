# 💡 Hands On Work V (HOW V) - Plataforma E-commerce NaveLuz

![Status](https://img.shields.io/badge/Status-Concluído-success)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
![Tech](https://img.shields.io/badge/Stack-Vanilla_JS_%7C_Tailwind-blue)

[cite_start]Este projeto foi desenvolvido como requisito para a disciplina de **Hands on Work V**  [cite_start]do curso de Análise e Desenvolvimento de Sistemas (ADS) na **Univali - Campus Itajaí**[cite: 2]. [cite_start]O objetivo central foi projetar e implementar a transformação digital da **NaveLuz Comércio de Materiais Elétricos**[cite: 14], elevando a marca de um varejo local para um patamar institucional e digital.

---

## 🏢 Sobre a NaveLuz e o Desafio
[cite_start]A NaveLuz nasceu da expertise prática de seus fundadores[cite: 27]. [cite_start]O que começou como uma oportunidade repentina em um espaço de apenas duas salas [cite: 32, 35][cite_start], transformou-se, ao longo de 6 anos, em uma operação consolidada de 5 salas e infraestrutura de apoio logístico[cite: 36]. 

[cite_start]**O Problema:** A empresa sofria com processos analógicos (vendas "fiado") e ausência de catálogo online, limitando seu crescimento ao tráfego físico[cite: 55, 59, 60].
**A Solução:** Desenvolvimento de uma plataforma web focada em conversão, com catálogo dinâmico (PLP), simulação de checkout para padronização de pagamentos digitais e um painel de telemetria administrativa.

---

## 🚀 Arquitetura e Tecnologias

O projeto foi construído sob o paradigma de **Single Page Application (SPA)**, evitando frameworks pesados neste estágio (como React ou Angular) para demonstrar domínio absoluto sobre a manipulação do DOM, roteamento assíncrono e arquitetura de software *Vanilla*.

* **HTML5 Semântico:** Estruturação baseada em `<template>` para renderização dinâmica *client-side*.
* **CSS3 & Tailwind CSS:** Estilização via JIT Compiler, garantindo um design *Mobile-First* fluido, com paleta de cores institucional (*Azul Naval* e *Ouro Queimado*).
* **JavaScript (ES6+):** Arquitetura modularizada (Controllers, Services, Core Routing).
* **Gestão de Estado:** Uso de `localStorage` para persistência de dados do carrinho.
* **Simulação de Back-end:** Consumo de dados assíncrono via *Promises* para emular latência de rede e APIs.
* **Hospedagem (CI/CD):** Deploy automatizado via Vercel.

---

## ✨ Funcionalidades Principais

* **Motor de Roteamento Customizado:** Navegação instantânea sem recarregamento de página.
* **Product Listing Page (PLP):** Catálogo avançado com motor de filtragem reativo (por categoria e busca textual simultânea).
* **Carrinho de Compras Assíncrono:** Gestão de itens off-canvas com cálculo de subtotais em tempo real.
* **Simulação de Checkout:** Fluxo de 3 etapas com formulários validados.
* **Micro-interações:** Animações de *Scroll Reveal* utilizando a API `Intersection Observer`.
* **Dashboard Administrativo:** Interface de gestão com indicadores de desempenho (KPIs) e controle de estoque simulado.

---

## 📂 Estrutura de Diretórios (SoC)

A base de código segue o princípio de *Separation of Concerns* (Separação de Responsabilidades):

```text
/
├── assets/img/          # Assets otimizados (WebP) com tratamento de fallback
├── css/
│   └── styles.css       # Classes utilitárias do Tailwind e animações customizadas
├── js/
│   ├── app.js           # Entrypoint e orquestração de eventos delegados
│   ├── core/
│   │   └── Router.js    # Motor de roteamento dinâmico baseado em Hash
│   ├── controllers/
│   │   └── ViewControllers.js # Ciclo de vida das telas e injeção de DOM
│   ├── data/
│   │   └── mockDatabase.js    # Estrutura de dados e simulação de latência de API
│   └── services/
│       └── CartService.js     # Lógica de negócio e persistência local
└── index.html           # Shell da aplicação contendo os templates
```

##⚙️ Como Executar o Projeto 
Visualizar em Produção:
O sistema está acessível publicamente ao link: 
https://hands-on-work-5.vercel.app/#home 

Executar Localmente:
Para utilizar módulos ES6 (importação/exportação), o projeto requer um servidor HTTP local para funcionar corretamente (evitando blocos de CORS do protocolo file://).
Faça o clone do repositório:
clonar git (https://github.com/FelipeCJBoB/Hands-On-Work-5)
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
