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
  last_update_date: "string",  // Data da última atualização do cardápio
  info_from: "string",  // De onde veio as informações (ex: site do RU)
  info_type: "string: 'manual' ou 'automatic'",  // manual: se as informações foram coletadas manualmente | automatic: se foram coletadas automáticamente
  menus_interval: {  // Objeto: De que dia até que dia é este cardápio ?
    start_date: "string",  // Data do primeiro dia da semana do cardápio (domingo)
    end_date: "string"  // Data do último dia da semana do cardápio (sábado)
  },
  menus: [  // Uma lista contendo informações do cardápio de cada dia (totalizando 7 elementos na lista) - Primeiro será o cardápio de domingo, depois segunda, ...
    {
      date: "string",  // Data que o cardápio será aplicado
      weekday_name: "string",  // Nome do dia da semana (Ex: segunda, terça-feita, etc)
      weekday_abreviation: "string",  // Nome do dia da semana abrevidado (Ex: Dom, Seg, Ter, etc)
      lunch: {  // Objeto ou null: Cardápio do almoço  (OBS: será null se não tiver um cardápio definido para o almoço naquele dia)
        main_dish_unrestricted: "string",  // Prato principal sem restrições
        main_dish_vegetarian: "string",  // Prato principal vegetariano
        garnishes: "string",  // Guarnições
        accompaniment: "string",  // Acompanhamentos
        salad: "string",  // Saladas
        dessert: "string"  // Sobremesas
      },
      dinner: {  // Objeto ou null: Cardápio do janta  (OBS: será null se não tiver um cardápio definido para o almoço naquele dia)
        ...  // O objeto do jantar possui as mesmas propriedades do objeto do almoço
      }
    }
    ... // Os outros dias seguem todos o mesmo formato definido acima
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

#### Resposta



### Consultar horário de funcionamento

#### Endpoint

```
/schedules
```

#### Método

```
GET
```

#### Descrição

#### Resposta
