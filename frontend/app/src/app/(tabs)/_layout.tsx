import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import colors from "tailwindcss/colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={18} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.emerald[600],
      }}>
      <Tabs.Screen
        name="index"        
        options={{
          title: 'Cardápio',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
        }}
      />

      <Tabs.Screen
        name="infos"
        options={{
          title: 'infos',
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
          headerShown: false 
        }}
      />

      <Tabs.Screen
        name="two"
        options={{
          title: 'Resíduos',
          tabBarIcon: ({ color }) => <TabBarIcon name="recycle" color={color} />,
          headerShown: false 
        }}
      />
    </Tabs>
  );
}
