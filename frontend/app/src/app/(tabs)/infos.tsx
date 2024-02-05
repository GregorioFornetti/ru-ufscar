import React, { useEffect, useState } from 'react';
import { SafeAreaView} from 'react-native';
import { Text, View } from '../../components/Themed';
import { Horario, Valores } from '../../components/infos';



export default function TabOneScreen() {

  const [price, setPrice] = useState< prices | null >(null);
  const [schedule, setSchedule] = useState< any | null >(null);
  const day = new Date().getDay();

  useEffect(() => {
    fetch("http://62.72.11.172:3000/prices")
      .then((res) => res.json())
      .then((data) => setPrice(data.prices));
  }, []);

  useEffect(() => {
    fetch("http://62.72.11.172:3000/schedules?sorocaba")
    .then((res) => res.json())
    .then((data) => setSchedule(data.campi_schedules[1].weekdays_schedules[day].schedule));
  }, []);
    
    
    console.log({schedule});
    return (
    <SafeAreaView className='flex-1 bg-white'>

      <View className='bg-white flex flex-row items-center  justify-between w-full px-6 mb-4 mt-12'>
        <Text className='text-3xl font-bold text-emerald-900'>
          Informações
        </Text>

      </View>
      
        <View className='flex-1 items-center justify-center bg-white'>
          <Horario
            title="Horários"
            titleOne='Almoço'
            contentOne={`${schedule?.lunch?.start_time} - ${schedule?.lunch?.end_time}`}
            titleTwo='Jantar'
            contentTwo={`${schedule?.dinner?.start_time} - ${schedule?.dinner?.end_time}`}
          />

          {price && 
            <Valores valores={price as prices} />
          }
          {/* {schedule &&(
            <Horario
              title="Horários"
              titleOne='Abertura'
              contentOne={schedule.lunch}
              titleTwo='Fechamento'
              contentTwo={schedule.dinner}
            />
          )} */}
 
        </View>
    </SafeAreaView>
  );
}

