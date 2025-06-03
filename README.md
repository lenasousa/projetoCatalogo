# Catálogo Cultural Interativo de São Paulo

 

Um site responsivo e interativo que facilita a descoberta e divulgação de espaços culturais da cidade de São Paulo, organizados por zonas e bairros.

 

## 🌟 Visão Geral

 

Este projeto foi desenvolvido como parte de uma iniciativa de um Projeto de extensão univeritario para promover a cultura na cidade de São Paulo. O catálogo oferece uma interface amigável para que os usuários possam descobrir eventos culturais em diferentes regiões da cidade.

 

### Metas ODS atendidas:

- ODS 4: Educação de qualidade

- ODS 8: Trabalho decente e crescimento econômico

- ODS 11: Cidades e comunidades sustentáveis

 

## 🛠️ Tecnologias Utilizadas

 

- HTML5

- CSS3

- JavaScript (Vanilla)

- LocalStorage para persistência de preferências

- Dados estáticos via JSON

- Animações e transições CSS

 

## 📋 Funcionalidades

 

- **Navegação por Zonas**: Visualize as diferentes zonas de São Paulo (Central, Norte, Sul, Leste e Oeste)

- **Exploração por Bairros**: Descubra quais bairros possuem eventos culturais em cada zona

- **Listagem de Eventos**: Veja todos os eventos disponíveis em um bairro específico

- **Sistema de Filtros Avançado**:

  - Filtre eventos por tipo (shows, exposições, etc.)

  - Filtre por valor (gratuito/pago)

  - Visualize contagem de eventos em tempo real com animações

- **Detalhes Completos**: Acesse informações detalhadas de cada evento cultural

- **Navegação Aprimorada**: Botão "Voltar ao Topo" para facilitar a navegação em listas longas

- **Experiência Visual Aprimorada**: Gradientes de cores específicos por tipo de evento

- **Sugestão de Novos Espaços**: Envie sugestões de novos espaços culturais para inclusão no catálogo

 

## 🚀 Como Executar o Projeto

 

1. Clone este repositório:

```

git clone https://github.com/lenasousa/projetoCatalogo.git

```

 

2. Navegue até a pasta do projeto:

```

cd projetoCatalogo
```

 

3. Certifique-se que tem python instalado (visto que é a melhor forma de rodar o projeto completo):

```
python --version

```

4. Caso não tenha instalado será necessário fazer o download e a instalação. Pode fazer isso no site: https://www.python.org/
   
5. Com o python instalado, rode o projeto localmente com o comando, para abrir na porta 8000 (você pode escolher outra porta se esta estiver ocupada):

```
python -m http.server 8000

```

 

### Funcionalidades do Usuário

 

1. **Navegação**: Use o menu principal para explorar zonas e bairros

2. **Filtros**: Na página de eventos, utilize os filtros para encontrar eventos por tipo ou valor

3. **Navegação Rápida**: Use o botão "Voltar ao Topo" para retornar rapidamente ao início da página

 

## 📱 Responsividade

 

O projeto foi desenvolvido seguindo o conceito mobile-first e é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:

- Smartphones

- Tablets

- Desktops

 

### Recursos de Acessibilidade

- Contraste adequado entre texto e fundo

- Botões e interações com feedback visual claro

- Navegação facilitada com botão "Voltar ao Topo"

 

## 🎨 Design

- **Paleta de Cores**: Esquemas de cores adaptáveis com variáveis CSS

- **Transições Suaves**: Animações e transições para melhorar a experiência do usuário

- **Feedback Visual**: Contadores animados e indicadores visuais para interações

- **Tipografia**: Fonte Inter do Google Fonts

- **Interface**: Cards interativos com design moderno e acessível

 

## 📊 Estrutura do Projeto

 

```

/

├── index.html

├── src/

│   ├── assets/

│   │   └── css/

│   │       └── styles.css

│   ├── components/

│   │   ├── cards.js

│   │   └── modal.js

│   ├── data/

│   │   ├── data.js

│   │   └── data.json

│   └── pages/

│       ├── bairros.html

│       ├── bairros.js

│       ├── eventos.html

│       └── eventos.js

└── README.md

```

 

## 🤝 Contribuições

 

Contribuições são bem-vindas! Para contribuir:

 

1. Faça um fork do projeto

2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)

3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)

4. Faça push para a branch (`git push origin feature/nova-feature`)

5. Abra um Pull Request

 

## 📞 Contato

 

Para sugestões ou dúvidas sobre o projeto, entre em contato através do email helenasousasilva1@gmail.com.

 

---

 

Desenvolvido com ❤️ como parte do projeto de extensão para o segundo periodo do curso facultativo de Engenharia de Software da ANHANGUERA, por HELENA SOUSA SILVA, projeto Catálogo Cultural Interativo de São Paulo.
