// Funções para criar cards

 

// Função para gerar cores pastéis aleatórias

function gerarCorPastel() {

    const coresPasteis = [

        '#FFD6E0', // Rosa claro

        '#FFEFB5', // Amarelo claro

        '#B5DEFF', // Azul claro

        '#C7CEEA', // Lavanda

        '#D4F0F0', // Turquesa claro

        '#E2F0CB', // Verde menta

        '#FFDFD3', // Pêssego

        '#E0BBE4', // Lilás

        '#C4E3CB', // Verde sage

        '#F4DADA'  // Rosa antigo

    ];

   

    return coresPasteis[Math.floor(Math.random() * coresPasteis.length)];

}

 

// Criar card de zona

function criarCardZona(zona) {

    // Definir cores para cada zona para usar em gradientes

    const coresZonas = {

        'Central': ['#FFD6E0', '#C7CEEA'], // Rosa e lavanda

        'Norte': ['#B5DEFF', '#E0BBE4'],   // Azul claro e lilás

        'Sul': ['#FFEFB5', '#D4F0F0'],     // Amarelo claro e turquesa

        'Leste': ['#E2F0CB', '#FFDFD3'],   // Verde menta e pêssego

        'Oeste': ['#C4E3CB', '#F4DADA']    // Verde sage e rosa antigo

    };

   

    // Define o background-image com gradiente para todas as zonas

    let backgroundImage;

    if (coresZonas[zona]) {

        backgroundImage = `linear-gradient(135deg, ${coresZonas[zona][0]}, ${coresZonas[zona][1]})`;

    } else {

        const corPrincipal = gerarCorPastel();

        const corSecundaria = gerarCorPastel();

        backgroundImage = `linear-gradient(135deg, ${corPrincipal}, ${corSecundaria})`;

    }

   

    // Contar número de bairros na zona

    const bairros = obterBairrosPorZona(zona);

   

    return `

        <div class="card" data-zona="${zona}">

            <div class="card-image" style="background-image: ${backgroundImage}"></div>

            <div class="card-content">

                <h3 class="card-title">Zona ${zona}</h3>

                <p class="card-subtitle">${bairros.length} bairros com eventos culturais</p>

                <div class="card-info">

                    <p>Clique para explorar os bairros</p>

                </div>

            </div>

        </div>

    `;

}

 

// Criar card de bairro

function criarCardBairro(bairro, zona) {

    // Geramos um degradê com cores pastéis em vez de usar placeholders cinza

    const corPrincipal = gerarCorPastel();

    const corSecundaria = gerarCorPastel();

    const backgroundImage = `linear-gradient(135deg, ${corPrincipal}, ${corSecundaria})`;

   

    // Contar número de eventos no bairro

    const eventos = obterEventosPorBairro(bairro);

   

    return `

        <div class="card" data-bairro="${bairro}" data-zona="${zona}">

            <div class="card-image" style="background-image: ${backgroundImage}"></div>

            <div class="card-content">

                <h3 class="card-title">${bairro}</h3>

                <p class="card-subtitle">${eventos.length} evento${eventos.length !== 1 ? 's' : ''} cultural</p>

                <div class="card-info">

                    <p>Clique para ver os eventos</p>

                    <span class="card-zona">${zona}</span>

                </div>

            </div>

        </div>

    `;

}

 

// Função para formatar datas do formato 'yyyy-MM-dd' ou 'yyyy-MM-dd a yyyy-MM-dd' para 'dd/MM/yyyy'

function formatarData(dataString) {

    if (!dataString) return '';

   

    // Verifica se a data contém um intervalo (contém 'a')

    if (dataString.includes('a')) {

        // Dividir as duas datas

        const datas = dataString.split(' a ');

       

        // Formatar ambas as datas

        const dataInicio = formatarDataSimples(datas[0]);

        const dataFim = formatarDataSimples(datas[1]);

       

        return `${dataInicio} a ${dataFim}`;

    } else {

        // É uma data única

        return formatarDataSimples(dataString);

    }

}

 

// Função auxiliar para formatar uma data simples

function formatarDataSimples(dataString) {

    try {

        // Verificar se a data está definida

        if (!dataString) return '';

       

        // Se a data já estiver no formato correto ou for um texto especial, retorna sem modificar

        if (dataString.includes('/') || dataString.includes('todos os') || dataString.includes('fins de semana')) {

            return dataString;

        }

       

        // Verifica se é uma data válida no formato ano-mes-dia

        const partes = dataString.split('-');

        if (partes.length !== 3) return dataString;

       

        const ano = partes[0];

        const mes = partes[1];

        const dia = partes[2];

       

        // Retorna no formato dd/MM/yyyy

        return `${dia}/${mes}/${ano}`;

    } catch (e) {

        console.error('Erro ao formatar data:', e);

        return dataString || ''; // Em caso de erro, retorna a data original ou string vazia

    }

}

 

// Criar card de evento

function criarCardEvento(evento) {

    // Definir cores por tipo de evento para melhor consistência visual

    const coresPorTipo = {

        'Exposição': ['#FFD6E0', '#C7CEEA'],                 // Rosa e lavanda

        'Festival': ['#FFEFB5', '#FFDFD3'],                  // Amarelo e pêssego

        'Show Musical': ['#B5DEFF', '#D4F0F0'],              // Azul e turquesa

        'Teatro': ['#E2F0CB', '#C4E3CB'],                    // Verde menta e verde sage

        'Cinema': ['#FFDFD3', '#F4DADA'],                    // Pêssego e rosa antigo

        'Concerto Clássico': ['#C7CEEA', '#E0BBE4'],         // Lavanda e lilás

        'Circuito Cultural': ['#D4F0F0', '#B5DEFF'],         // Turquesa e azul

        'Festival Multicultural': ['#FFEFB5', '#E0BBE4'],    // Amarelo e lilás

        'Festival de Cinema': ['#FFDFD3', '#B5DEFF'],        // Pêssego e azul

        'Festival Cultural': ['#FFEFB5', '#C4E3CB'],         // Amarelo e verde sage

        'Exposição Interativa': ['#FFD6E0', '#D4F0F0'],      // Rosa e turquesa

        'Exposição Imersiva': ['#FFD6E0', '#B5DEFF']         // Rosa e azul

    };

   

    // Se tiver imagem, usa URL, senão usa gradient com cores específicas para o tipo

    const seed = evento.id || Math.random() * 100;

    let backgroundImage;

   

    if (evento.imagem) {

        backgroundImage = `url('${evento.imagem}')`;

    } else {

        // Usar cores para o tipo específico do evento ou gerar aleatoriamente

        const cores = coresPorTipo[evento.tipo] || [

            gerarCorPastel(seed),

            gerarCorPastel(seed + 1)

        ];

        backgroundImage = `linear-gradient(to right, ${cores[0]}, ${cores[1]})`;

    }

   

    // Formatar a data para exibição

    const dataFormatada = formatarData(evento.data);

   

    return `

        <div class="card" data-evento-id="${evento.id}">

            <div class="card-image" style="background-image: ${backgroundImage}"></div>

            <div class="card-content">

                <h3 class="card-title">${evento.nome}</h3>

                <p class="card-subtitle">${evento.tipo}</p><div class="card-info">

                    <p>${evento.endereco}</p>

                    <p><span class="card-data">${dataFormatada}</span></p>

                    <p>${evento.gratuito ? '<span class="tag-gratuito">Gratuito</span>' : `<span class="tag-valor">${evento.valor}</span>`}</p>

                    <span class="card-zona">${evento.zona}</span>

                </div>

            </div>

        </div>

    `;

}