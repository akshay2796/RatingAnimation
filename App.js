import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Rating } from './src/components';

function App() {
	return (
		<View style={styles.container}>
			<Rating
				maxRating={5}
				color={'blue'}
				size={40}
				style={{
					marginHorizontal: 10,
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;
