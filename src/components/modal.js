// Modal de Sugestão

const modalSugestao = document.getElementById('modal-sugestao');

const btnSugerir = document.getElementById('sugerir-espaco');

const closeButtons = document.querySelectorAll('.close-button');

const formSugestao = document.getElementById('form-sugestao');

 

// Abre o modal de sugestão

if (btnSugerir) {

    btnSugerir.addEventListener('click', () => {

        modalSugestao.style.display = 'block';

        // Adicionamos um pequeno delay para garantir que o display:block seja aplicado antes da animação

        setTimeout(() => {

            modalSugestao.classList.add('show');

        }, 10);

    });

}

 

// Fecha os modais quando clicar no X

closeButtons.forEach(button => {

    button.addEventListener('click', () => {

        // Encontra o modal pai do botão

        const modal = button.closest('.modal');

       

        // Remove a classe show para iniciar a animação de saída

        modal.classList.remove('show');

       

        // Aguarda a animação terminar antes de esconder o modal

        setTimeout(() => {

            modal.style.display = 'none';

        }, 300); // Tempo igual à duração da transição no CSS

    });

});

 

// Fecha os modais quando clicar fora deles

window.addEventListener('click', (event) => {

    if (event.target.classList.contains('modal')) {

        event.target.style.display = 'none';

    }

});

 

// Adiciona validação em tempo real para os campos do formulário

if (formSugestao) {

    const camposFormulario = formSugestao.querySelectorAll('input, select, textarea');

   

    camposFormulario.forEach(campo => {

        // Valida quando o usuário sai do campo (blur)

        campo.addEventListener('blur', () => {

            validarCampo(campo);

        });

       

        // Remove a mensagem de erro quando o usuário começa a digitar novamente

        campo.addEventListener('input', () => {

            campo.closest('.form-group').classList.remove('error');

        });

    });

}

 

// Função para validar um campo individual

function validarCampo(campo) {

    const formGroup = campo.closest('.form-group');

   

    // Se o campo é obrigatório e está vazio

    if (campo.hasAttribute('required') && !campo.value.trim()) {

        formGroup.classList.add('error');

        return false;

    }

   

    // Validação específica para URLs

    if (campo.type === 'url' && campo.value) {

        try {

            new URL(campo.value);

        } catch (e) {

            formGroup.classList.add('error');

            return false;

        }

    }

   

    // Validação específica para emails

    if (campo.type === 'email' && campo.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {

        formGroup.classList.add('error');

        return false;

    }

   

    // Se passou em todas as validações

    formGroup.classList.remove('error');

    return true;

}

 

// Processa o envio do formulário de sugestão

if (formSugestao) {

    formSugestao.addEventListener('submit', (event) => {

        event.preventDefault();

       

        // Limpa os estados de erro anteriores

        const formGroups = formSugestao.querySelectorAll('.form-group');

        formGroups.forEach(group => {

            group.classList.remove('error');

        });

       

        // Valida os campos obrigatórios

        let formValido = true;

        const camposObrigatorios = formSugestao.querySelectorAll('[required]');

       

        camposObrigatorios.forEach(campo => {

            if (!campo.value.trim()) {

                // Campo vazio

                formValido = false;

                campo.closest('.form-group').classList.add('error');

            } else if (campo.type === 'url' && campo.value) {

                // Valida URL se preenchida (campo opcional)

                try {

                    new URL(campo.value);

                } catch (e) {

                    formValido = false;

                    campo.closest('.form-group').classList.add('error');

                }

            }

           

            // Para campo de email, validar formato se preenchido

            if (campo.type === 'email' && campo.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campo.value)) {

                formValido = false;

                campo.closest('.form-group').classList.add('error');

            }

        });

       

        // Se o formulário for válido, processa o envio

        if (formValido) {

            // Coleta os dados do formulário

            const formData = new FormData(formSugestao);

            const sugestaoData = {};

           

            for (const [key, value] of formData.entries()) {

                sugestaoData[key] = value;

            }

           

            // Aqui enviaria os dados para um servidor real

            // No nosso caso, simularemos o envio de email

            enviarSugestaoEmail(sugestaoData);

           

            // Limpa o formulário

            formSugestao.reset();

           

            // Fecha o modal

            modalSugestao.style.display = 'none';

           

            // Mostra confirmação

            alert('Obrigado pela sua sugestão! Nossa equipe irá analisá-la em breve.');

        } else {

            // Mostra uma mensagem de erro geral

            alert('Por favor, preencha todos os campos obrigatórios corretamente.');

           

            // Foca no primeiro campo com erro

            const primeiroErro = formSugestao.querySelector('.form-group.error input, .form-group.error select, .form-group.error textarea');

            if (primeiroErro) {

                primeiroErro.focus();

            }

        }

    });

}

 

// Simulação de envio de e-mail (em um cenário real, isso seria feito no servidor)

function enviarSugestaoEmail(dados) {

    console.log('Enviando sugestão para moderação:', dados);

    // Em um projeto real, aqui tería a lógica para enviar o e-mail para a moderação

    // Como é apenas um projeto pequeno, vou apenas logar os dados no console por hora

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

 

// Modal de Detalhes do Evento

const modalDetalhes = document.getElementById('modal-detalhes');

const detalhesEventoContainer = document.getElementById('detalhes-evento');

 

// Função para mostrar detalhes de um evento

function mostrarDetalhesEvento(eventoId) {

    const evento = obterEventoPorId(eventoId);

   

    if (!evento) {

        console.error('Evento não encontrado:', eventoId);

        return;

    }

   

    // Função para gerar cores pastéis (duplicada aqui para não depender do arquivo cards.js)

    function gerarCorPastelModal(seed) {

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

       

        // Usar o ID do evento como seed para ter consistência nas cores

        const seedIndex = (evento.id || 0) % coresPasteis.length;

        return coresPasteis[(seedIndex + (seed || 0)) % coresPasteis.length];

    }

     

    // Definir cores com base no tipo de evento para melhor consistência visual

    const coresPorTipo = {

        'Exposição': ['#FFD6E0', '#C7CEEA', '#E0BBE4'],         // Rosa, lavanda, lilás

        'Festival': ['#FFEFB5', '#FFDFD3', '#F4DADA'],          // Amarelo, pêssego, rosa antigo

        'Show Musical': ['#B5DEFF', '#D4F0F0', '#C7CEEA'],      // Azul, turquesa, lavanda

        'Teatro': ['#E2F0CB', '#C4E3CB', '#D4F0F0'],            // Verde menta, verde sage, turquesa

        'Cinema': ['#FFDFD3', '#F4DADA', '#FFD6E0'],            // Pêssego, rosa antigo, rosa

        'Concerto Clássico': ['#C7CEEA', '#E0BBE4', '#FFD6E0'], // Lavanda, lilás, rosa

        'Circuito Cultural': ['#D4F0F0', '#B5DEFF', '#E2F0CB']  // Turquesa, azul, verde menta

    };

   

    // Gerar HTML para os detalhes do evento

    // Usar um degradê mais suave para o fundo da imagem no modal

    // Define o background-image adequadamente

    let backgroundImage;

    if (evento.imagem) {

        backgroundImage = `url('${evento.imagem}')`;

    } else {

        // Usar cores específicas para o tipo de evento ou gerar baseado no ID

        const cores = coresPorTipo[evento.tipo] || [

            gerarCorPastelModal(evento.id),

            gerarCorPastelModal(evento.id + 2),

            gerarCorPastelModal(evento.id + 4)

        ];

       

        backgroundImage = `linear-gradient(45deg, ${cores[0]}, ${cores[1]}, ${cores[2]})`;

    }

   

    let destaquesList = '';

   

    if (evento.destaques && evento.destaques.length > 0) {

        destaquesList = `

            <div class="evento-detalhe-destaques">

                <h3>Destaques:</h3>

                <ul>

                    ${evento.destaques.map(destaque => `<li>${destaque}</li>`).join('')}

                </ul>

            </div>

        `;

    }

      // Formatar a data para exibição no formato dd/MM/yyyy

    const dataFormatada = formatarData(evento.data);

   

    const detalhesHTML = `

        <div class="evento-detalhe-imagem" style="background-image: ${backgroundImage}"></div>

        <h2 class="evento-detalhe-titulo">${evento.nome}</h2>

        <span class="evento-detalhe-tipo">${evento.tipo}</span>

       

        <div class="evento-detalhe-info">            <p><strong>Local:</strong> ${evento.bairro}</p>

            <p><strong>Endereço:</strong> ${evento.endereco}</p>

            <p><strong>Data:</strong> ${dataFormatada}</p>

            <p class="evento-detalhe-preco">

                ${evento.gratuito ?

                  '<span class="tag-gratuito-modal">Gratuito</span>' :

                  `<strong>Valor:</strong> <span class="tag-valor-modal">${evento.valor}</span>`}

            </p>

            ${evento.site ? `<p><strong>Site:</strong> <a href="${evento.site}" target="_blank" class="btn-site">Acesse o Site</a></p>` : ''}</div>

       

        <div class="evento-detalhe-descricao">

            <p>${evento.descricao}</p>

        </div>

       

        ${destaquesList}

       

        <div class="evento-detalhe-acoes">

            <button class="btn-voltar-modal">Voltar</button>

        </div>

    `;

   

    // Inserir HTML no container

    detalhesEventoContainer.innerHTML = detalhesHTML;

      // Adicionar evento ao botão voltar

    const btnVoltar = detalhesEventoContainer.querySelector('.btn-voltar-modal');

    if (btnVoltar) {

        btnVoltar.addEventListener('click', () => {

            // Aplicar animação de saída

            modalDetalhes.classList.remove('show');

           

            // Aguardar a animação terminar antes de esconder o modal

            setTimeout(() => {

                modalDetalhes.style.display = 'none';

            }, 300);

        });

    }

   

    // Mostrar o modal

    modalDetalhes.style.display = 'block';

   

    // Adicionar pequeno delay antes de iniciar a animação de entrada

    setTimeout(() => {

        modalDetalhes.classList.add('show');

    }, 10);

}