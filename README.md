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

#### Prints

#### Vídeo

### Frontend - Aplicação web

Uma aplicação web foi desenvolvida para cadastro e edição de informações a respeito dos descartes do restaurante universitário. Há uma página para administradores (que seriam funcionários do próprio RU) e uma página de consultas, aberta ao público, para transparência
e para possíveis coletas de dados para relatórios e tomadas de decisão.

- A página de consulta de dados está atualmente disponível em: http://62.72.11.172:3000/web/

- A página de administrador pode ser acessada em: http://62.72.11.172:3000/web/admin/

#### Prints

#### Vídeo

