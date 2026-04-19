/**
 * Fonte única de verdade do catálogo (protótipo).
 * Imagens locais: deploy institucional não depende de CDNs de terceiros.
 */
const PRODUCTS = [
  {
    id: 1,
    name: 'Torneira Slim 4T Hydra',
    tagline: 'Multitemperatura com design contemporâneo para sua cozinha.',
    price: 219.0,
    oldPrice: 580.0,
    category: 'Hidráulica',
    sku: 'HYD-4TSL-127',
    stock: 32,
    img: './assets/img/products/produto-1.webp',
    thumbnails: [
      './assets/img/products/produto-1.webp',
      './assets/img/products/produto-1.webp',
      './assets/img/products/produto-1.webp',
    ],
    specs: [
      { label: 'Potência', value: '5500W (127V) / 6400W (220V)' },
      { label: 'Pressão Mínima', value: '20 kPa (2 m.c.a.)' },
      { label: 'Grau de Proteção', value: 'IP24' },
      { label: 'Garantia', value: '1 Ano' },
    ],
    badge: 'PREMIUM HYDRA SERIES',
    discount: 64,
    detailsTitle: 'Eficiência e Controle',
    detailsText:
      'A Torneira Slim 4T da Hydra possui sistema multitemperatura que permite a escolha gradual da temperatura da água, garantindo economia e conforto em todas as estações do ano.',
  },
  {
    id: 2,
    name: 'Luminária Pendente LED',
    tagline: 'Design minimalista e alta eficiência energética para ambientes modernos.',
    price: 489.9,
    oldPrice: 689.0,
    category: 'Iluminação',
    sku: 'LUM-882-VNTG',
    stock: 45,
    img: './assets/img/products/produto-2.webp',
    thumbnails: ['./assets/img/products/produto-2.webp'],
    specs: [
      { label: 'Potência', value: '12W' },
      { label: 'Fluxo Luminoso', value: '1200 lm' },
      { label: 'Temperatura de cor', value: '3000K (Branco Quente)' },
      { label: 'Garantia', value: '2 Anos' },
    ],
    badge: 'LINHA CONTEMPORÂNEA',
    discount: 29,
    detailsTitle: 'Luz que valoriza o ambiente',
    detailsText:
      'Luminária pendente com LED de alto fluxo luminoso e consumo reduzido. Corpo em alumínio com acabamento premium, ideal para salas de estar, jantar e áreas gourmet. Projetada para harmonizar com arquiteturas contemporâneas e oferecer conforto visual sem ofuscamento.',
  },
  {
    id: 3,
    name: 'Parafusadeira Furadeira 20V',
    tagline: 'Potência e autonomia para os maiores desafios da construção.',
    price: 1049.0,
    oldPrice: null,
    category: 'Ferramentas',
    sku: 'FER-PFD-20V',
    stock: 18,
    img: './assets/img/products/produto-3.webp',
    thumbnails: ['./assets/img/products/produto-3.webp'],
    specs: [
      { label: 'Tensão', value: '20V Max' },
      { label: 'Torque Máx.', value: '65 Nm' },
      { label: 'Chuck', value: '13mm Metálico' },
      { label: 'Garantia', value: '1 Ano' },
    ],
    badge: 'LINHA PRO',
    detailsTitle: 'Alta potência e precisão',
    detailsText:
      'Parafusadeira e furadeira sem fio 20V com torque elevado para madeira, metal e alvenaria leve. Mandril metálico de 13 mm, empunhadura ergonômica e bateria de íon-lítio para longas jornadas de trabalho em obra ou oficina.',
  },
  {
    id: 4,
    name: 'Porcelanato 60x60 Concreto',
    tagline: 'Sofisticação e durabilidade para pisos e paredes de alto padrão.',
    price: 159.92,
    oldPrice: 199.0,
    category: 'Pisos',
    sku: 'PIS-PRC-6060',
    stock: 200,
    img: './assets/img/products/produto-4.webp',
    thumbnails: ['./assets/img/products/produto-4.webp'],
    specs: [
      { label: 'Dimensão', value: '60×60 cm' },
      { label: 'Acabamento', value: 'Acetinado' },
      { label: 'PEI', value: '4' },
      { label: 'Cobertura', value: '2,16 m² por caixa' },
    ],
    badge: 'BEST SELLER',
    discount: 20,
    detailsTitle: 'Piso premium com textura concreto',
    detailsText:
      'Porcelanato acetinado 60×60 cm inspirado no cimento queimado, com alta resistência a abrasão (PEI 4) e baixa porosidade. Indicado para pisos e paredes internas em residências e comerciais de alto padrão, com fácil limpeza e tonalidade uniforme caixa após caixa.',
  },
];

export const StoreData = {
  products: PRODUCTS,
  getById(id) {
    return this.products.find((p) => p.id === parseInt(id, 10)) || this.products[0];
  },
};

/** Latência simulada: UI pode exibir estado intermediário (skeleton) antes do paint do catálogo. */
const MOCK_LATENCY_MS = 600;

export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...StoreData.products]), MOCK_LATENCY_MS);
  });
}
