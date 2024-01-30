# Backend

Todo o código do backend está nesta pasta. Toda lógica do servidor/API responsável por enviar informações para o app estão aqui.

A API está publica atualmente em: http://62.72.11.172:3000/

## Documentação da API

A documentação com exemplos pode ser acessada no [Postman](https://documenter.getpostman.com/view/20890406/2s9YypDN42). 

Logo abaixo também há uma versão dessa documentação em Markdown (está possui o schema das respostas):






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
  last_update: {  // Data e horário da última atualização dos preços
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

**OBS:** Caso tenha sido fornecido um valor de `campus` incorreto (inexistente), será retornado uma mensagem de erro, com o status 404.

#### Resposta

Caso nenhum valor tenha sido fornecido no parâmetro `campus`, o JSON terá o seguinte formato:

```javascript
{
  last_update: {  // Data e horário da última atualização dos horários de funcionamento
    date: "string",  // Data da última atualização do cardápio no formato DD/MM/YYYY
    time: "string"  // Horário da última atualização no formato HH:MM
  },
  info_from: "string",  // De onde veio as informações (ex: site do RU)
  info_type: "string: 'manual' ou 'automatic'",  // manual: se as informações foram coletadas manualmente | automatic: se foram coletadas automáticamente
  campi_schedules: [  // Uma lista contendo os horários de funcionamento para cada campi
    {
      name: "string",  // Nome da cidade do campus (Ex: São Carlos)
      query_name: "string",  // Nome codificado para busca usando o parâmetro campus (Ex sao-carlos)
      weekday_schedules: [  // Uma lista contendo informações do funcionamento de cada dia (totalizando 7 elementos na lista) - Primeiro será o cardápio de domingo, depois segunda, ... (OBS: não conta pontos facultativos ou feriados)
        {
          name: "string",  // Nome do dia da semana (Ex: segunda-feira)
          abbreviation: "string",  // Abreviação do nome do dia da semana (Ex: seg)
          schedule {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
            lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
              start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
              end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
            },
            dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
              start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
              end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
            }
          }
        }
        // ... Os outros dias seguem todos o mesmo formato definido acima
      ],
      holiday_schedule: {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
        lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
          start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
          end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
        },
        dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
          start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
          end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
        }
      },
      optional_workday_schedule: {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
        lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
          start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
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

Caso seja fornecido um valor do parâmetro `campus`, ele terá o seguinte formato:


```javascript
{
  last_update: {  // Data e horário da última atualização dos horários de funcionamento
    date: "string",  // Data da última atualização do cardápio no formato DD/MM/YYYY
    time: "string"  // Horário da última atualização no formato HH:MM
  },
  info_from: "string",  // De onde veio as informações (ex: site do RU)
  info_type: "string: 'manual' ou 'automatic'",  // manual: se as informações foram coletadas manualmente | automatic: se foram coletadas automáticamente
  campus_schedules: {  // Horário de funcionamento do campus selecionado no parâmetro de busca campus
    name: "string",  // Nome da cidade do campus (Ex: São Carlos)
    query_name: "string",  // Nome codificado para busca usando o parâmetro campus (Ex sao-carlos)
    weekday_schedules: [  // Uma lista contendo informações do funcionamento de cada dia (totalizando 7 elementos na lista) - Primeiro será o cardápio de domingo, depois segunda, ... (OBS: não conta pontos facultativos ou feriados)
      {
        name: "string",  // Nome do dia da semana (Ex: segunda-feira)
        abbreviation: "string",  // Abreviação do nome do dia da semana (Ex: seg)
        schedule {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
          lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
            start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
            end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
          },
          dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
            start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
            end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
          }
        }
      }
      // ... Os outros dias seguem todos o mesmo formato definido acima
    ],
    holiday_schedule: {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
      lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
        start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
        end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
      },
      dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
        start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
        end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
      }
    },
    optional_workday_schedule: {  // Horários de funcionamento naquele dia especifico (tanto no almoço, quanto no jantar)
      lunch: {  // Horário de funcionamento no almoço - Pode ser null caso o restaurante não funcione neste dia no almoço
        start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
        end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
      },
      dinner: {  // Horário de funcionamento no jantar - Pode ser null caso o restaurante não funcione neste dia no jantar
        start_time: "string",  // Momento em que o restaurante irá abrir (no formato HH:MM)
        end_time: "string"  // Momento em que o restaurante irá fechar (no formato HH:MM)
      }
    }
  }
}
```

### Consultar informações de descarte RU UFSCar Sorocaba

#### Endpoint

```
/residues
OU
/residues?startDate=<YYYY-MM-DD>&endDate=<YYYY-MM-DD>
```

#### Método

```
GET
```

#### Descrição

Consulta os dados a respeito dos descartes no campus de Sorocaba.

Pode ser especificado um intervalo o qual serão retornados os registros da consulta. Estes podem ser informados a partir do parâmetros de busca `startDate` e `endDate`.

Estes parâmetros precisam seguir o formato `YYYY-MM-DD` (ex - 2024-01-30 = 30 de janeiro de 2024).

Caso não encontre nenhum registro ou um itervalo inválido seja fornecido (`startDate` > `endDate`) um JSON com uma mensagem de erro será retornado.


#### Resposta

Caso sejam encontrados registros, a resposta será um JSON seguindo o formato abaixo:

```javascript
[
  {
    id: "integer",  // Identificador único de um registro
    type: "string",  // Tipo da alimentação, podendo ser um valor entre "almoço" e "jantar"
    date: "string",  // Data em que o registro faz referência, no formato DD/MM/YYYY
    preparationResidues: "float",  // Quantidade descartada a partir da preparação do alimento, em kgs
    plateRemainsResidues: "float",  // Quantidade descartada a partir do resto nos pratos, em kgs
    counterRemainsResidues: "float",  // Quantidade descartada a partir da cuba, em kgs
    preparedFood: "float"  // Quantidade de comida preparada, em kgs
  }
  ... // Todos os registros retornados seguirão o formato definido acima
]
```

Caso seja fornecido um intervalo inválido (status `400`) de datas ou não forem encontrados nenhum registro (status `404`):

```javascript
{
  message: "string"  // Mensagem de erro
}
```

### Consultar informações um registro especifico de descarte RU UFSCar Sorocaba

#### Endpoint

```
/residues/:id
```

#### Método

```
GET
```

#### Descrição

Consulta um registro especifico sobre descarte do campus de Sorocaba.

Utiliza uma váriavel de caminho para determinar o `id` do registro que será retornado na consulta. Caso seja fornecido um id inexistente ou inválido, um JSON com mensagem de erro será retornado (status `404`).

#### Resposta

Caso seja encontrado um registro, a resposta será um JSON seguindo o formato abaixo:

```javascript
{
  id: "integer",  // Identificador único de um registro
  type: "string",  // Tipo da alimentação, podendo ser um valor entre "almoço" e "jantar"
  date: "string",  // Data em que o registro faz referência, no formato DD/MM/YYYY
  preparationResidues: "float",  // Quantidade descartada a partir da preparação do alimento, em kgs
  plateRemainsResidues: "float",  // Quantidade descartada a partir do resto nos pratos, em kgs
  counterRemainsResidues: "float",  // Quantidade descartada a partir da cuba, em kgs
  preparedFood: "float"  // Quantidade de comida preparada, em kgs
}
```

Se não for encontrado nenhum registro:

```javascript
{
  message: "string"  // Mensagem de erro
}
```
