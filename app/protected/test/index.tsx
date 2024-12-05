import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth, Role } from '../../../context/AuthContext';
import { useRouter, Link } from 'expo-router';
import WithRole from '../../../components/WithRole';
import ThemeToggleButton from '../../../components/ThemeToggleButton';
const Page = () => {
  const { authState, onLogout } = useAuth();
  const router = useRouter();

  const onLogoutPressed = () => {
    onLogout!();
  };

  return (
    <View className="">
      <Text style={styles.title}>Home</Text>
      <Text style={styles.title}>Role: {authState?.role}</Text>

      <Button title="Logout" onPress={onLogoutPressed} />

      <View style={styles.separator} />

      <WithRole role={Role.ADMIN}>
        <Text>Only visible for admins</Text>
      </WithRole>
      <Text className="font-Light text-lg  text-blue-500">تست برای فونت</Text>
      <Text className="font-Regular text-lg">تست برای فونت</Text>
      <Text className="text-[50px]">تست برای فونت</Text>
      <Text className="font-Bold  text-[50px]">تست برای فونت</Text>

      <WithRole role={Role.USER}>
        <Text>Only visible for users</Text>
      </WithRole>
      <Button
        title="Go to Info"
        onPress={() => router.push('./protected/test')} // استفاده از router برای ناوبری
      />
      <Link href="./protected/admin">
        <Text>Go to Admin</Text>
      </Link>
      <ThemeToggleButton />
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
