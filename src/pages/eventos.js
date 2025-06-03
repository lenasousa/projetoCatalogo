// Script para a página de eventos (eventos.js)

 

// Variáveis globais

let eventosAtuais = [];

let filtroTipoAtual = 'todos';

let filtroValorAtual = 'todos';

let termoBuscaAtual = '';

 

// Esperar pelo carregamento dos dados

document.addEventListener('dadosCarregados', inicializarPaginaEventos);

 

// Inicializar a página de eventos

function inicializarPaginaEventos() {

    // Obter parâmetros da URL

    const params = new URLSearchParams(window.location.search);

    const bairro = params.get('bairro');

    const zona = params.get('zona');

   

    if (!bairro) {

        console.error('Parâmetro bairro não encontrado na URL');

        // Redirecionar para a página inicial

        window.location.href = '../../index.html';

        return;

    }

   

    // Configurar o link de voltar para bairros

    const linkVoltarBairros = document.getElementById('link-voltar-bairros');

    if (linkVoltarBairros && zona) {

        linkVoltarBairros.href = `./bairros.html?zona=${encodeURIComponent(zona)}`;

    }

      // Atualizar o título da página

    const tituloBairro = document.getElementById('nome-bairro');

    if (tituloBairro) {

        tituloBairro.textContent = bairro;

    }

   

    // Obter eventos do bairro

    eventosAtuais = obterEventosPorBairro(bairro);

      // Adicionar contador de eventos

    const contadorEventos = document.getElementById('contador-eventos');

    if (contadorEventos) {

        // Garantir que o contador seja visível

        contadorEventos.style.opacity = '1';

        contadorEventos.textContent = `${eventosAtuais.length} evento${eventosAtuais.length !== 1 ? 's' : ''} encontrado${eventosAtuais.length !== 1 ? 's' : ''}`;

    }

   

    atualizarListaEventos();

      // Configurar eventos de filtro e busca

    configurarFiltrosTipos();

    configurarFiltrosValor();

    configurarCampoBusca();

}

 

// Atualizar a lista de eventos com base nos filtros atuais

function atualizarListaEventos() {

    const eventosGrid = document.getElementById('eventos-grid');

    const semResultados = document.getElementById('sem-resultados');

   

    if (!eventosGrid || !semResultados) {

        console.error('Elementos da interface não encontrados');

        return;

    }

   

    // Aplicar filtros

    console.log('Iniciando filtros com', eventosAtuais.length, 'eventos');

    console.log('Filtros ativos - Tipo:', filtroTipoAtual, 'Valor:', filtroValorAtual, 'Busca:', termoBuscaAtual);

   

    let eventosFiltrados = [...eventosAtuais]; // Criar uma cópia do array

   

    // Filtrar por tipo

    let eventosFiltradosPorTipo = filtrarEventosPorTipo(eventosFiltrados, filtroTipoAtual);

    console.log('Após filtro de tipo:', eventosFiltradosPorTipo.length, 'eventos');

      // Filtrar por valor e ordenar eventos

    let eventosFiltradosPorValor = filtrarEventosPorValor(eventosFiltradosPorTipo, filtroValorAtual);

    console.log('Após filtro de valor:', eventosFiltradosPorValor.length, 'eventos');

   

    // Ordenar eventos - gratuitos primeiro se o filtro estiver ativo

    if (filtroValorAtual === 'gratuito') {

        eventosFiltradosPorValor.sort((a, b) => {

            const isGratuitoA = a.gratuito === true || a.valor === 'R$ 00,00' || a.valor === 'Gratuito' ||

                              (typeof a.valor === 'string' && a.valor.toLowerCase().includes('grátis'));

            const isGratuitoB = b.gratuito === true || b.valor === 'R$ 00,00' || b.valor === 'Gratuito' ||

                              (typeof b.valor === 'string' && b.valor.toLowerCase().includes('grátis'));

           

            if (isGratuitoA === isGratuitoB) return 0;

            return isGratuitoA ? -1 : 1;

        });

    }

   

    // Filtrar por termo de busca

    eventosFiltrados = buscarEventos(eventosFiltradosPorValor, termoBuscaAtual);

    console.log('Após busca:', eventosFiltrados.length, 'eventos');

      // Atualizar o contador de eventos filtrados com animação

    const contadorEventos = document.getElementById('contador-eventos');

    if (contadorEventos) {

        // Aplicar fade out para animação suave

        contadorEventos.style.opacity = '0';

       

        // Atualizar o texto

        setTimeout(() => {

            contadorEventos.textContent = `${eventosFiltrados.length} evento${eventosFiltrados.length !== 1 ? 's' : ''} encontrado${eventosFiltrados.length !== 1 ? 's' : ''}`;

            contadorEventos.style.opacity = '1';

            contadorEventos.style.transition = 'opacity 0.3s ease-in';

        }, 150);

    }

      // Exibir mensagem se não houver resultados

    if (eventosFiltrados.length === 0) {

        eventosGrid.innerHTML = '';

        semResultados.classList.remove('escondido');

        // Adicionar animação de entrada

        semResultados.style.animation = 'fadeIn 0.5s ease-out forwards';

        return;

    }

   

    // Esconder mensagem de sem resultados

    semResultados.classList.add('escondido');

      // Criar cards para cada evento

    const cardsHTML = eventosFiltrados.map(evento => criarCardEvento(evento)).join('');

   

    // Aplicar animação de fade out antes de atualizar

    eventosGrid.style.opacity = '0';

   

    // Atualizar conteúdo

    eventosGrid.innerHTML = cardsHTML;

   

    // Aplicar animação de fade in após atualizar

    setTimeout(() => {

        eventosGrid.style.opacity = '1';

        eventosGrid.style.transition = 'opacity 0.3s ease-in';

    }, 50);

   

    // Adicionar evento de clique aos cards para mostrar detalhes

    const cards = eventosGrid.querySelectorAll('.card');

    cards.forEach(card => {

        card.addEventListener('click', () => {

            const eventoId = parseInt(card.dataset.eventoId);

            mostrarDetalhesEvento(eventoId);

        });

    });

}

 

// Configurar filtros de tipos

function configurarFiltrosTipos() {

    const botoesFiltro = document.querySelectorAll('.btn-filtro');

   

    // Adicionar índice para animação sequencial

    botoesFiltro.forEach((botao, index) => {

        botao.style.setProperty('--btn-index', index);

       

        botao.addEventListener('click', () => {

            // Atualizar classe ativa

            botoesFiltro.forEach(b => b.classList.remove('ativo'));

            botao.classList.add('ativo');

           

            // Atualizar filtro atual

            filtroTipoAtual = botao.dataset.tipo;

           

            // Atualizar lista

            atualizarListaEventos();

        });

    });

}

 

// Configurar filtros de valor

function configurarFiltrosValor() {

    const botoesFiltroValor = document.querySelectorAll('.btn-filtro-valor');

    console.log("Botões de filtro valor encontrados:", botoesFiltroValor.length);

   

    // Adicionar índice para animação sequencial e configurar evento de clique

    botoesFiltroValor.forEach((botao, index) => {

        botao.style.setProperty('--btn-index', index);

       

        botao.addEventListener('click', () => {

            if (botao.classList.contains('ativo')) {

                // Se clicar no botão ativo, não faz nada

                return;

            }

           

            console.log(`Aplicando filtro de valor: ${botao.dataset.valor}`);

           

            // Atualizar classes

            botoesFiltroValor.forEach(b => b.classList.remove('ativo'));

            botao.classList.add('ativo');

           

            // Aplicar efeito visual de seleção

            botao.style.animation = 'pulseSelect 0.3s ease-out';

            setTimeout(() => botao.style.animation = '', 300);

           

            // Atualizar filtro e lista

            filtroValorAtual = botao.dataset.valor;

            atualizarListaEventos();

        });

    });

}

 

// Configurar campo de busca

function configurarCampoBusca() {

    const campoBusca = document.getElementById('busca-evento');

   

    if (!campoBusca) {

        console.error('Campo de busca não encontrado');

        return;

    }

   

    // Buscar ao digitar (com debounce para não sobrecarregar)

    let timeoutId;

    campoBusca.addEventListener('input', () => {

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {

            termoBuscaAtual = campoBusca.value;

            atualizarListaEventos();

        }, 300);

    });

}

 

// Configurar botão Voltar ao Topo

function configurarBotaoVoltarTopo() {

    const btnVoltarTopo = document.getElementById('btn-voltar-topo');

   

    // Mostrar/esconder botão baseado na posição da página

    window.addEventListener('scroll', () => {

        if (window.scrollY > 300) {

            btnVoltarTopo.classList.add('visible');

        } else {

            btnVoltarTopo.classList.remove('visible');

        }

    });

   

    // Ação de voltar ao topo com animação suave

    btnVoltarTopo.addEventListener('click', () => {

        window.scrollTo({

            top: 0,

            behavior: 'smooth'

        });

    });

}

 

// Inicializar assim que o DOM estiver pronto (caso os dados já estejam carregados)

document.addEventListener('DOMContentLoaded', () => {

    if (window.catalogoData) {

        inicializarPaginaEventos();

    }

    configurarBotaoVoltarTopo();

});