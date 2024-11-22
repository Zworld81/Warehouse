import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Role, useAuth } from '../../context/AuthContext';
import { Tabs } from 'expo-router';

const TabLayout = () => {
  const { authState } = useAuth();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs>
        {/* Home Tab */}
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: 'Home',
            tabBarLabel: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
          redirect={authState?.authenticated === null}
        />

        {/* News Tab */}
        <Tabs.Screen
          name="news"
          options={{
            headerShown: false,
            headerTitle: 'Newsfeed',
            tabBarLabel: 'News',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="newspaper-outline" size={size} color={color} />
            ),
          }}
          redirect={authState?.role !== Role.USER}
        />

        {/* Admin Tab */}
        <Tabs.Screen
          name="admin"
          options={{
            headerShown: false,
            headerTitle: 'Admin Area',
            tabBarLabel: 'Admin',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="cog-outline" size={size} color={color} />
            ),
          }}
          redirect={authState?.role !== Role.ADMIN}
        />
      <Tabs.Screen
          name="test"
          options={{
            headerShown: false,
            headerTitle: 'test area',
            tabBarLabel: 'test',
            tabBarIcon: ({ size, color }) => (
              <Ionicons  name="cog-outline" size={size} color={color} />
            ),
          }}
          redirect={authState?.role !== Role.ADMIN}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
};

export default TabLayout;
