import { Linking, StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function TabTwoScreen() {



  return (
    <View className='flex-1 bg-white items-center justify-start pt-12'>
       <Text className='text-3xl font-bold text-emerald-900 self-start ml-6 mb-16'>
        Resíduos
      </Text>

      <Text className='text-gray-600 text-left text-lg p-6 mb-10'>
      Uma aplicação web foi desenvolvida para cadastro e edição de informações a respeito dos descartes do restaurante universitário. Há uma página para administradores (que seriam funcionários do próprio RU) e uma página de consultas, aberta ao público, para transparência e para possíveis coletas de dados para relatórios e tomadas de decisão.
      </Text>
      <TouchableOpacity
        className='bg-emerald-600 items-center justify-center rounded-lg px-8 py-4'
        onPress={()=> {Linking.openURL("http://62.72.11.172:3000/web/")}}
      >
        <Text className='text-2xl font-bold text-white text-center'>
          Saiba mais sobre os resíduos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className='py-4'
        onPress={()=> {Linking.openURL("https://www.proad.ufscar.br/pt-br/servicos/restaurante-universitario")}}
      >
        <Text className='text-base font-bold text-gray-400 text-center underline'>
          Acesse o site do RU UFSCar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
