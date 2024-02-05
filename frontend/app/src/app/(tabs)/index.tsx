import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Text, View } from '../../components/Themed';
import Cardapio from '../../components/cardapio'; 



export default function TabOneScreen() {

  const [data, setData] = useState< menu | null >(null);
  const day = new Date().getDay();

  useEffect(() => {
    fetch("http://62.72.11.172:3000/week-menu")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='flex-1'>
        <View className='flex-1 items-center justify-center bg-white'>
          <View className='bg-white flex flex-row items-center  justify-between w-full px-6 mb-4 mt-12'
          
          >
            <Text className='text-3xl font-bold text-emerald-900'>
              Cardápio
            </Text>

            <Text className='text-emerald-800 text-2xl font-bold'>{data?.menus[day].date}</Text>


          </View>
          
          {data?.menus[day].lunch && (
            <>      
              <Cardapio
                title='Almoço'
                main_dish={data.menus[day].lunch.main_dish_unrestricted}
                main_dish_veg={data.menus[day].lunch.main_dish_vegetarian}
                garnishes={data.menus[day].lunch.garnishes}
                accompaniment={data.menus[day].lunch.accompaniment}
                salad={data.menus[day].lunch.salad}
                dessert={data.menus[day].lunch.dessert}
              
              />
              <Cardapio 
                title='Jantar'
                main_dish={data?.menus[day].dinner.main_dish_unrestricted}
                main_dish_veg={data?.menus[day].dinner.main_dish_vegetarian}
                garnishes={data?.menus[day].dinner.garnishes}
                accompaniment={data?.menus[day].dinner.accompaniment}
                salad={data?.menus[day].dinner.salad}
                dessert={data?.menus[day].dinner.dessert}      
              />
            </>
          )}

          {!data?.menus[day].lunch && (
            <View className='flex-1 items-center justify-center self-center bg-white'>
              <Text className='text-2xl font-bold text-gray-500 mt-10 py-10'>
                Cardápio indisponível
              </Text>
            </View>
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

