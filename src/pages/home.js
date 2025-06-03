// Script para a página inicial (home.js)

 

// Esperar pelo carregamento dos dados

document.addEventListener('dadosCarregados', inicializarPaginaInicial);

 

// Inicializar a página inicial

function inicializarPaginaInicial() {

    const zonasGrid = document.getElementById('zonas-grid');

   

    if (!zonasGrid) {

        console.error('Elemento zonas-grid não encontrado');

        return;

    }

   

    // Obter zonas únicas

    const zonas = obterZonasUnicas();

   

    if (zonas.length === 0) {

        zonasGrid.innerHTML = '<p class="sem-resultados">Nenhuma zona encontrada nos dados.</p>';

        return;

    }

   

    // Criar cards para cada zona

    const cardsHTML = zonas.map(zona => criarCardZona(zona)).join('');

    zonasGrid.innerHTML = cardsHTML;

   

    // Adicionar evento de clique aos cards

    const cards = zonasGrid.querySelectorAll('.card');

    cards.forEach(card => {

        card.addEventListener('click', (event) => {

            const zona = card.dataset.zona;

            // Redirecionar para a página de bairros com a zona selecionada

            window.location.href = `./src/pages/bairros.html?zona=${encodeURIComponent(zona)}`;

        });

    });

}

 

// Inicializar assim que o DOM estiver pronto (caso os dados já estejam carregados)

document.addEventListener('DOMContentLoaded', () => {

    if (window.catalogoData) {

        inicializarPaginaInicial();

    }

});