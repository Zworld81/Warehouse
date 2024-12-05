import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth, Role } from '../../context/AuthContext';
import { useRouter, Link } from 'expo-router';
import WithRole from '../../components/WithRole';
import ThemeToggleButton from '../../components/ThemeToggleButton';
const Page = () => {
  const { authState, onLogout } = useAuth();
  const router = useRouter();

  const onLogoutPressed = () => {
    onLogout!();
  };

  return (
    <View className="">
      <Text className="font-Light text-lg  text-blue-500">تست برای فونت</Text>
      <Text className="font-Regular text-lg">تست برای فونت</Text>
      <Text className="text-[50px]">تست برای فونت</Text>
      <Text className="font-Bold  text-[50px]">تست برای فونت</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    marginVertical: 30,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
