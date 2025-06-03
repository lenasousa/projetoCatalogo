// Carregando os dados do JSON

fetch(window.location.pathname.includes('/src/pages/') ? '../data/data.json' : './src/data/data.json')

    .then(response => {

        if (!response.ok) {

            throw new Error('Não foi possível carregar o arquivo data.json');

        }

        return response.json();

    })

    .then(data => {

        // Salvando os dados em uma variável global

        window.catalogoData = data;

       

        // Disparando um evento para indicar que os dados foram carregados

        const event = new CustomEvent('dadosCarregados');

        document.dispatchEvent(event);

    })

    .catch(error => {

        console.error('Erro ao carregar os dados:', error);

        alert('Ocorreu um erro ao carregar os dados. Por favor, recarregue a página.');

    });

 

// Funções utilitárias para manipulação dos dados

 

// Obter todas as zonas únicas que têm eventos

function obterZonasUnicas() {

    if (!window.catalogoData || !window.catalogoData.eventos) return [];

   

    // Obter todas as zonas únicas

    const zonasUnicas = new Set();

   

    window.catalogoData.eventos.forEach(evento => {

        if (evento.zona === 'Todas') {

            // Se for "Todas", adiciona as zonas principais            zonasUnicas.add('Central');

            zonasUnicas.add('Norte');

            zonasUnicas.add('Sul');

            zonasUnicas.add('Leste');

            zonasUnicas.add('Oeste');

        } else {

            zonasUnicas.add(evento.zona);

        }

    });

   

    return Array.from(zonasUnicas).sort();

}

 

// Obter todos os bairros únicos de uma zona específica

function obterBairrosPorZona(zona) {

    if (!window.catalogoData || !window.catalogoData.eventos) return [];

   

    const bairrosUnicos = new Set();

   

    window.catalogoData.eventos.forEach(evento => {

        // Se o evento é de todas as zonas ou da zona específica

        if (evento.zona === 'Todas' || evento.zona === zona) {

            // Para eventos em "Vários bairros", podemos tratá-los separadamente

            if (evento.bairro.includes('Vários')) {

                // Podemos adicionar um bairro especial para eventos que ocorrem em vários locais

                bairrosUnicos.add('Eventos em Múltiplos Bairros');

            } else {

                bairrosUnicos.add(evento.bairro);

            }

        }

    });

   

    return Array.from(bairrosUnicos).sort();

}

 

// Obter eventos por bairro

function obterEventosPorBairro(bairro) {

    if (!window.catalogoData || !window.catalogoData.eventos) return [];

   

    // Se for o bairro especial de múltiplos locais

    if (bairro === 'Eventos em Múltiplos Bairros') {

        return window.catalogoData.eventos.filter(evento =>

            evento.bairro.includes('Vários') || evento.bairro.includes(',')

        );

    }

   

    // Retorna eventos do bairro específico

    return window.catalogoData.eventos.filter(evento => evento.bairro === bairro);

}

 

// Obter evento por ID

function obterEventoPorId(id) {

    if (!window.catalogoData || !window.catalogoData.eventos) return null;

   

    return window.catalogoData.eventos.find(evento => evento.id === parseInt(id));

}

 

// Buscar eventos por termo

function buscarEventos(eventos, termo) {

    if (!termo) return eventos;

   

    termo = termo.toLowerCase();

    return eventos.filter(evento =>

        evento.nome.toLowerCase().includes(termo) ||

        evento.descricao.toLowerCase().includes(termo)

    );

}

 

// Filtrar eventos por tipo

function filtrarEventosPorTipo(eventos, tipo) {

    if (!tipo || tipo === 'todos') return eventos;

   

    return eventos.filter(evento => evento.tipo === tipo);

}

 

// Filtrar eventos por valor (gratuito ou pago)

function filtrarEventosPorValor(eventos, valor) {

    console.log("Iniciando filtro por valor:", valor);

    console.log("Total de eventos antes do filtro:", eventos.length);

   

    // Se não houver filtro ou for 'todos', retornar todos

    if (!valor || valor === 'todos') {

        console.log("Retornando todos os eventos - sem filtro");

        return eventos;

    }

   

    // Filtrar eventos por valor

    const eventosFiltrados = eventos.filter(evento => {

        // Verificar se o valor do filtro é 'gratuito'

        if (valor === 'gratuito') {

            // Verifica várias condições que indicam que o evento é gratuito

            const isGratuito =

                evento.gratuito === true || // Flag gratuito

                evento.valor === 'R$ 00,00' || // Valor zero

                evento.valor === 'Gratuito' || // Texto "Gratuito"

                evento.valor === 'R$ 00,00 (consumo opcional)' || // Valor zero com observação

                evento.valor === 'R$ 00,00 (doação de alimentos não perecíveis)' || // Valor zero com doação

                (typeof evento.valor === 'string' && evento.valor.toLowerCase().includes('grátis')); // Contém "grátis"

               

            console.log(`Evento ${evento.id} - ${evento.nome} - Gratuito: ${isGratuito} (gratuito=${evento.gratuito}, valor=${evento.valor})`);

            return isGratuito;

        }

        // Verificar se o valor do filtro é 'pago'

        else if (valor === 'pago') {

            // Verifica se o evento é pago

            const isPago =

                evento.gratuito === false && // Flag não gratuito

                evento.valor !== 'R$ 00,00' && // Valor não é zero

                evento.valor !== 'Gratuito' && // Não é gratuito

                evento.valor !== 'R$ 00,00 (consumo opcional)' && // Não é gratuito com observação

                evento.valor !== 'R$ 00,00 (doação de alimentos não perecíveis)' && // Não é gratuito com doação

                !(typeof evento.valor === 'string' && evento.valor.toLowerCase().includes('grátis')); // Não contém "grátis"

               

            console.log(`Evento ${evento.id} - ${evento.nome} - Pago: ${isPago} (gratuito=${evento.gratuito}, valor=${evento.valor})`);

            return isPago;

        }

       

        // Caso padrão, retornar true para incluir o evento

        return true;

    });

   

    console.log("Total de eventos após filtro:", eventosFiltrados.length);

    return eventosFiltrados;

}