import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { Easing, Value } from 'react-native-reanimated';
import PropTypes from 'prop-types';

export default function Rating({ maxRating, color, size, style, animation }) {
	const animationValue = new Value(0);
	useEffect(() => {
		console.log('SELECTED: ' + selected);
		Animated.timing(animationValue, {
			toValue: 1,
			duration: 300,
			easing: Easing.ease,
		}).start();
	});
	const ratings = Array.from(Array(maxRating), (_, i) => i + 1);
	const [selected, setSelected] = useState(0);

	function Star({ id, selectedId }) {
		const AnimatedIcon = Animated.createAnimatedComponent(Icon);
		const isSelected = id <= selectedId;
		const scaleAnimation = animationValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 1.5, 1],
		});

		const scale = {
			transform: [
				{
					scale: scaleAnimation,
				},
			],
		};

		return (
			<TouchableWithoutFeedback onPress={() => setSelected(id)}>
				<AnimatedIcon
					name="star"
					color={color}
					solid={isSelected}
					size={size}
					style={[
						styles.star,
						style,
						isSelected && (animation || scale),
					]}
				/>
			</TouchableWithoutFeedback>
		);
	}

	return (
		<View style={styles.container}>
			{ratings.map((rating) => {
				return (
					<Star
						key={rating}
						id={rating}
						selectedId={selected}
						setSelected={(val) => setSelected(val)}
						animationValue={animationValue}
					/>
				);
			})}
		</View>
	);
}

Rating.propTypes = {
	maxRating: PropTypes.number,
	color: PropTypes.string,
};

Rating.defaultProps = {
	maxRating: 5,
	color: '#000000',
	size: 40,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	star: {
		marginHorizontal: 8,
	},
});
