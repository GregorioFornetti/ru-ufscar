# Backend

Todo o código do backend está nesta pasta. Toda lógica do servidor/API responsável por enviar informações para o app estão aqui.

## Documentação da API

A documentação pode ser acessada no Postman (COLOCAR LINK). Logo abaixo também há uma versão dessa documentação em Markdown:






### Consultar cardápio da semana

#### Endpoint

```
/week-menu
```

#### Método

```
GET
```

#### Descrição

Consulta o cardápio da semana, retornando quais refeições serão servidas nos dias da semana. OBS: nem todos os dias da semana possuem um cardápio definido.

#### Resposta

Retorna um JSON no seguinte formato:

```javascript
{
  last_update: {  // Data e horário da última atualização do cardápio
    date: "string",  // Data da última atualização do cardápio no formato DD/MM/YYYY
    time: "string"  // Horário da última atualização no formato HH:MM
  },
  info_from: "string",  // De onde veio as informações (ex: site do RU)
  info_type: "string: 'manual' ou 'automatic'",  // manual: se as informações foram coletadas manualmente | automatic: se foram coletadas automáticamente
  menus_interval: {  // Objeto: De que dia até que dia é este cardápio ?
    start_date: "string",  // Data do primeiro dia da semana do cardápio (domingo) no formato DD/MM
    end_date: "string"  // Data do último dia da semana do cardápio (sábado) no formato DD/MM
  },
  menus: [  // Uma lista contendo informações do cardápio de cada dia (totalizando 7 elementos na lista) - Primeiro será o cardápio de domingo, depois segunda, ...
    {
      date: "string",  // Data que o cardápio será aplicado no formato DD/MM
      weekday_name: "string",  // Nome do dia da semana (Ex: segunda, terça-feita, etc)
      weekday_abbreviation: "string",  // Nome do dia da semana abrevidado (Ex: Dom, Seg, Ter, etc)
      lunch: {  // Objeto ou null: Cardápio do almoço  (OBS: será null se não tiver um cardápio definido para o almoço naquele dia)
        main_dish_unrestricted: "string",  // Prato principal sem restrições
        main_dish_vegetarian: "string",  // Prato principal vegetariano
        garnishes: "string",  // Guarnições
        accompaniment: "string",  // Acompanhamentos
        salad: "string",  // Saladas
        dessert: "string"  // Sobremesas
      },
      dinner: {  // Objeto ou null: Cardápio do janta  (OBS: será null se não tiver um cardápio definido para o almoço naquele dia)
        // ... O objeto do jantar possui as mesmas propriedades do objeto do almoço
      }
    }
    // ... Os outros dias seguem todos o mesmo formato definido acima
  ]
}
```

Exemplo de resposta:

```javascript
{
   "last_update":{
      "date":"09/01/2024",
      "time":"16:20"
   },
   "info_from":"https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario",
   "info_type":"automatic",
   "menus_inteval":{
      "start_date":"07/01",
      "end_date":"13/01"
   },
   "menus":[
      {
         "weekday_name":"domingo",
         "weekday_abbreviation":"dom",
         "date":"07/01",
         "lunch":null,
         "dinner":null
      },
      {
         "weekday_name":"segunda-feira",
         "weekday_abbreviation":"seg",
         "date":"08/01",
         "lunch":{
            "main_dish_unrestricted":"Iscas de frango à chinesa e ovo frito à parmegiana",
            "main_dish_vegetarian":"Bolinho de feijão preto e ovo frito à parmegiana",
            "garnishes":"Repolho refogado",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         },
         "dinner":{
            "main_dish_unrestricted":"Strogonoff de frango e ovo frito à brasileira",
            "main_dish_vegetarian":"Strogonoff de pts e ovo frito à brasileira",
            "garnishes":"Batata palha",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         }
      },
      {
         "weekday_name":"terça-feira",
         "weekday_abbreviation":"ter",
         "date":"09/01",
         "lunch":{
            "main_dish_unrestricted":"Carne louca e cubos de frango com legumes",
            "main_dish_vegetarian":"Berinjela recheada com pts e mix de grãos com legumes",
            "garnishes":"Polenta",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         },
         "dinner":{
            "main_dish_unrestricted":"Iscas bovinas e frango desfiado",
            "main_dish_vegetarian":"Almondega de ervilha e charuto de repolho com pts",
            "garnishes":"Polenta",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         }
      },
      {
         "weekday_name":"quarta-feira",
         "weekday_abbreviation":"qua",
         "date":"10/01",
         "lunch":{
            "main_dish_unrestricted":"Pernil suíno desfiado e carne assada",
            "main_dish_vegetarian":"Feijão branco ao vinagrete e nuggets de grão de bico",
            "garnishes":"Farofa",
            "accompaniment":"Arroz branco e integral / feijão preto",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         },
         "dinner":{
            "main_dish_unrestricted":"Copa lombo ao molho limão e filé de frango grelhado",
            "main_dish_vegetarian":"Batata recheada com pts e grão de bico xadrez",
            "garnishes":"Farofa",
            "accompaniment":"Arroz branco e integral / feijão preto",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         }
      },
      {
         "weekday_name":"quinta-feira",
         "weekday_abbreviation":"qui",
         "date":"11/01",
         "lunch":{
            "main_dish_unrestricted":"Carne moída e frango assado",
            "main_dish_vegetarian":"Assado de grão de bico com batatas e bolinho de mandioca com pts",
            "garnishes":"Macarrão alho e óleo",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         },
         "dinner":{
            "main_dish_unrestricted":"Quibe de forno e frango ao sugo",
            "main_dish_vegetarian":"Quibe veg e soja á primavera",
            "garnishes":"Macarrão alho e óleo",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         }
      },
      {
         "weekday_name":"sexta-feira",
         "weekday_abbreviation":"sex",
         "date":"12/01",
         "lunch":{
            "main_dish_unrestricted":"Filé de frango grelhado e torta madalena de carne",
            "main_dish_vegetarian":"Bolinho de tofu e torta madalena veg",
            "garnishes":"Seleta de legumes",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada",
            "dessert":"Fruta ou doce"
         },
         "dinner":{
            "main_dish_unrestricted":"Canjiquinha e iscas de frango ao molho vinagrete",
            "main_dish_vegetarian":"Canjiquinha veg e feijão branco com brócolis",
            "garnishes":"Seleta de legumes",
            "accompaniment":"Arroz branco e integral / feijão",
            "salad":"Dois tipos de salada"
         }
      },
      {
         "weekday_name":"sábado",
         "weekday_abbreviation":"sáb",
         "date":"13/01",
         "lunch":null,
         "dinner":null
      }
   ]
}
```



### Consultar preços

#### Endpoint

```
/prices
```

#### Método

```
GET
```

#### Descrição

Consulta os preços da refeição no RU, por categorias.

#### Resposta

Retorna um JSON no seguinte formato:

```javascript
{
  last_update: {  // Data e horário da última atualização do cardápio
    date: "string",  // Data da última atualização do cardápio no formato DD/MM/YYYY
    time: "string"  // Horário da última atualização no formato HH:MM
  },
  info_from: "string",  // De onde veio as informações (ex: site do RU)
  info_type: "string: 'manual' ou 'automatic'",  // manual: se as informações foram coletadas manualmente | automatic: se foram coletadas automáticamente
  prices: [
    {
      category: "string",  // Categoria (discentes, servidores, etc)
      price: "number",  // Preço a ser pago pela categoria
      number_in_full: "string"  // Preço a ser pago em extenso
    }
    // ... Para cada categoria temos um objeto igual ao exemplo mostrado acima
  ]
}
```

Exemplo de resposta:

```javascript
{
  "last_update": {
    "date": "24/01/2024",
    "time": "12:20"
  },
  "info_from": "https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario",
  "info_type": "automatic",
  "prices": [
    {
      "category": "discente bolsista",
      "price": 0,
      "number_in_full": "zero"
    },
    {
      "category": "discente categoria intermediário",
      "price": 2.5,
      "number_in_full": "dois reais e cinquenta centavos"
    },
    {
      "category": "discente regular (graduação e pós graduação)",
      "price": 4.2,
      "number_in_full": "quatro reais e vinte centavos"
    },
    {
      "category": "servidor (técnico administrativo e docente)",
      "price": 12.39,
      "number_in_full": "doze reais e trinta e nove centavos"
    },
    {
      "category": "visitante",
      "price": 12.5,
      "number_in_full": "doze reais e cinquenta centavos"
    }
  ]
}
```

### Consultar horário de funcionamento

#### Endpoint

```
/schedules
OU
/schedules?campus=<nome-do-campus-codificado>
```

#### Método

```
GET
```

#### Descrição

Consulta os horários de funcionamento dos campi. 

Essa consulta aceita o parâmetro de busca `campus`, para a especificação de qual campus os horários devem ser retornados.

Caso não seja fornecido nenhum valor do parâmetro `campus`, então, todos os horários de funcionamento serão retornados.

Valores possíveis de `campus`:

- `sao-carlos` (São Carlos)
- `sorocaba` (Sorocaba)
- `lagoa-do-sino` (Lagoa do Sino)
- `araras` (Araras)

Caso tenha sido fornecido um valor de `campus` incorreto (inexistente), será retornado uma mensagem de erro, com o status 404.

#### Resposta

Caso nenhum valor tenha sido fornecido no parâmetro `campus`, o JSON terá o seguinte formato:

```javascript
{
  last_update: {  // Data e horário da última atualização do cardápio
    date: "string",  // Data da última atualização do cardápio no formato DD/MM/YYYY
    time: "string"  // Horário da última atualização no formato HH:MM
  },
  info_from: "string",  // De onde veio as informações (ex: site do RU)
  info_type: "string: 'manual' ou 'automatic'",  // manual: se as informações foram coletadas manualmente | automatic: se foram coletadas automáticamente
  campi_schedules: [  // Uma lista contendo informações do cardápio de cada dia (totalizando 7 elementos na lista) - Primeiro será o cardápio de domingo, depois segunda, ...
    {
      name: "string",  //
      query_name: "string",  //
      weekday_schedules: [  //
        {
          name: "string",  //
          abbreviation: "string",  //
          schedule {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
            lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
              start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
              end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
            },
            dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
              start_time:	"string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
              end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
            }
          }
        }
        // ... Os outros dias seguem todos o mesmo formato definido acima
      ],
      holiday_schedule: {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
        lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
          start_time:	"string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
          end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
        },
        dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
          start_time:	"string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
          end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
        }
      },
      optional_workday_schedule: {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
        lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
          start_time:	"string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
          end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
        },
        dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
          start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
          end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
        }
      }
    }
    // ... Todos os campi seguem o mesmo padrão, para cada campus, um objeto com o mesmno padrão definido logo acima será retornado
  ]
}
```

E um exemplo de resposta nesse caso é:

Caso seja fornecido um valor do parâmetro `campus`, ele terá o seguinte formato:

E um exemplo de resposta nesse caso, usando `campus=sorocaba`, temos:
