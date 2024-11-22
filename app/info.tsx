import WithRole from '../components/WithRole';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth, Role } from '../context/AuthContext';

const News = () => {
	return (
		<View style={styles.container}>
			<WithRole role={Role.ADMIN}>
				<Text>Only visible for admins</Text>
			</WithRole>
			<Text>تست</Text>
			<WithRole role={Role.USER}>
				<Text>Only visible for users</Text>
			</WithRole>
		</View>
	);
};

export default News;
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
