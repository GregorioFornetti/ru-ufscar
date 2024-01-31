# Projeto sustentabilidade RU UFSCar

Este é a entrega do trabalho “Projeto de Melhoria DMAIC na UFSCar, com foco na Sustentabilidade” que integra os alunos dos cursos de Ciência da Computação, Engenharia Florestal e Engenharia de Produção.

Este é o trabalho da equipe 2, com os seguintes integrantes:
<ul>
    <li>Alexandre Ferrati Faitanini</li>
    <li>Daniel Meireles Nogueira</li>
    <li>Guilherme Augusto Lucena Vicentini</li>
    <li>Joao Pedro Gonzales dos Santos</li>
    <li>Maria Eduarda Canaparo Zago Cezar</li>
    <li>Willian Akio Tanaka</li>
    <li>Gregório Fornetti Azevedo</li>
    <li>Maria Anita de Moura</li>
    <li>Matheus de Araujo</li>
    <li>Wilson Antunes Luques Oliver</li>
    <li>Evandro Barbosa de Castro Junior</li>
    <li>Giuliana Graziela Zavatta </li>
    <li>Pedro Augusto Soares Campos</li>
    <li>Sara Rodrigues Minguzzi</li>
    <li>Vinícius Luvizotto Denardi</li>
</ul>

**OBS:** Este projeto é apenas um protótipo da proposta feita pela equipe, e ainda precisa do desenovilmento de mais funcionalidades, como melhores interfaces, geração automática de gráficos pelo componente web, cadastro de informações
a respeito do gasto energético do RU, etc. Este protótipo pode servir como base para projetos de extensão da UFSCar.

## Componentes do projeto

O projeto pode ser dividido em três componentes principais, sendo eles definidos logo a seguir

### Backend

O backend está responsável por acessar a [página oficial do RU da UFSCar](https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario) e extrair as informações dele para serví-las em uma API. Além disso, a API também é responsável por servir os dados a respeito
dos descartes do RU da UFSCar de Sorocaba. Está API está [documentada na README da pasta backend](https://github.com/GregorioFornetti/ru-ufscar/blob/main/backend/readme.md), e é responsável por servir os dois componentes a seguir.

### Frontend - Mobile app

Um aplicativo para dispositivos móveis foi implementado. Neste são mostrados algumas informações relevantes, como o cardápio do RU atualizado, preços da refeição dependendo da categoria e horários de funcionamento. Neste app também há uma aba direcionando para outras
páginmas, como o próximo componente que será descrito. Um dos objetivos do app é divulgar iniciativas e informações do restaurante universitário.

### Frontend - Aplicação web

Uma aplicação web foi desenvolvida para cadastro e edição de informações a respeito dos descartes do restaurante universitário. Há uma página para administradores (que seriam funcionários do próprio RU) e uma página de consultas, aberta ao público, para transparência
e para possíveis coletas de dados para relatórios e tomadas de decisão.

- A página de consulta de dados está atualmente disponível em: http://62.72.11.172:3000/web/

- A página de administrador pode ser acessada em: http://62.72.11.172:3000/web/admin/

Um vídeo mostrando este componente fncionando está disponível no [YouTube](https://www.youtube.com/watch?v=QMkddbeLSxE).

## Instalação e execução

Existem duas formas de executar o projeto, e cada uma com uma finalidade. Uma forma de execução é o modo produção, para colocar no ar o jogo para que o público possa jogar. A outra forma é desenvolvimento, para conseguir visualizar o resultado das modificações do código ao vivo.

### Como executar - Modo produção

Para subir o servidor, é preciso ter instalado o `Docker` e o `Docker Compose`. O docker disponibiliza um [tutorial para sua instalação](https://docs.docker.com/desktop/).

Com tudo instalado, para colocar o jogo no ar em modo de produção, siga os passos abaixo:

1 - Configurar `.env`

As principais variáveis que devem ser modificadas são:

  - `API_PATH`: endpoint para fazer requisições à API.
  - `ADMIN_PATH`: endpoint para acessar a página de administração (configurações do banco de dados). Para acessar a página, a URL final será: `<endereço_servidor>/<ADMIN_PATH>`.
  - `PUBLIC_PATH`: endpoint para acessar a página pública de consultas. Para acessar a página, a URL final será: `<endereço_servidor>/<PUBLIC_PATH>`.
  - `PORT`: porta em que toda a aplicação ficará exposta.
  - `PASSWORD`: senha que será pedida para acessar a página de administração. Essa senha dará acesso total para manipulação do banco de dados, logo, cuide bem dela.

2 - `docker-compose up`

Esse comando irá subir o servidor no ar (esse comando funciona para o Windows, mas pode ser diferente para outro OS). Isso pode levar um tempo considerável, já que irá instalar todas as bibliotecas necessárias. Mas, uma vez feito isso, é esperado que não seja mais tão demorado para executar novamente.

### Como executar - Modo desenvolvimento

Para subir o servidor de banco de dados, é preciso ter instalado o `Docker` e o `Docker Compose`. O docker disponibiliza um [tutorial para sua instalação](https://docs.docker.com/desktop/).

Para instalar as bibliotecas, é neceessário ter o Node.js instalado. Pode ser instalado pelo [próprio site do Node.js](https://nodejs.org/en).

Com tudo instalado, para começar a desenvolver, siga os passos abaixo:

1 - Na pasta `backend`, rodar `docker-compose up`

Este comando irá subir o servidor de banco de dados.

2 - Na mesma pasta, em outro terminal, executar `npm install`

Instalará as bibliotecas necessárias para subir o servidor do backend.

3- Rodar o comando `npm run start`

Irá subir o servidor backend

4 - Escolher o frontend `admin` ou `puiblic` e rodar `npm install` e depois `npm run dev`.

Isso irá gerar o frontend ao vivo, podendo edita-lo e ver as modificações rapidamente.

