type menu = {
  menus: [
    {
      weekday_name: string,
      weekday_abbreviation: string,
      date: string,
      lunch: {
        main_dish_unrestricted?: string,
        main_dish_vegetarian?: string,
        garnishes?: string,
        accompaniment?: string,
        salad?: string,
        dessert?: string,
      },
      dinner: {
        main_dish_unrestricted?: string,
        main_dish_vegetarian?: string,
        garnishes?: string,
        accompaniment?: string,
        salad?: string,
        dessert?: string,
      }        
    }
  ]
}