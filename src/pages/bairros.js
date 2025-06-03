// Script para a página de bairros (bairros.js)

 

// Esperar pelo carregamento dos dados

document.addEventListener('dadosCarregados', inicializarPaginaBairros);

 

// Inicializar a página de bairros

function inicializarPaginaBairros() {

    // Obter a zona da URL

    const params = new URLSearchParams(window.location.search);

    const zona = params.get('zona');

   

    if (!zona) {

        console.error('Parâmetro zona não encontrado na URL');

        // Redirecionar para a página inicial

        window.location.href = '../../index.html';

        return;

    }

   

    // Atualizar o título da página

    const tituloZona = document.getElementById('nome-zona');

    if (tituloZona) {

        tituloZona.textContent = zona;

    }

   

    // Obter bairros da zona

    const bairros = obterBairrosPorZona(zona);

    const bairrosGrid = document.getElementById('bairros-grid');

   

    if (!bairrosGrid) {

        console.error('Elemento bairros-grid não encontrado');

        return;

    }

   

    if (bairros.length === 0) {

        bairrosGrid.innerHTML = '<p class="sem-resultados">Nenhum bairro encontrado para esta zona.</p>';

        return;

    }

   

    // Criar cards para cada bairro

    const cardsHTML = bairros.map(bairro => criarCardBairro(bairro, zona)).join('');

    bairrosGrid.innerHTML = cardsHTML;

   

    // Adicionar evento de clique aos cards

    const cards = bairrosGrid.querySelectorAll('.card');

    cards.forEach(card => {

        card.addEventListener('click', (event) => {

            const bairro = card.dataset.bairro;

            const zona = card.dataset.zona;

            // Redirecionar para a página de eventos com o bairro e zona selecionados

            window.location.href = `./eventos.html?bairro=${encodeURIComponent(bairro)}&zona=${encodeURIComponent(zona)}`;

        });

    });

}

 

// Inicializar assim que o DOM estiver pronto (caso os dados já estejam carregados)

document.addEventListener('DOMContentLoaded', () => {

    if (window.catalogoData) {

        inicializarPaginaBairros();

    }

});