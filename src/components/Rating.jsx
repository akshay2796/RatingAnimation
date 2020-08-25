import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	ViewPropTypes,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, { Easing, Value } from 'react-native-reanimated';
import PropTypes from 'prop-types';

export default function Rating({
	maxRating,
	color,
	size,
	style,
	animation: customAnimation,
	getAnimationValue,
}) {
	const ratings = Array.from(Array(maxRating), (_, i) => i + 1);
	const [selected, setSelected] = useState(0);

	function Star({ id, selectedId }) {
		const animationValue = new Value(0);
		useEffect(() => {
			console.log('SELECTED: ' + selected);
			Animated.timing(animationValue, {
				toValue: 1,
				duration: 400,
				easing: Easing.ease,
			}).start();
		});
		getAnimationValue(animationValue);
		const isSelected = id <= selectedId;
		const scaleAnimation = animationValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 1.5, 1],
		});
		const opacityAnimation = animationValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [1, 0.5, 1],
		});
		const rotation = animationValue.interpolate({
			inputRange: [0, 0.25, 0.75, 1],
			outputRange: ['0deg', '-3deg', '3deg', '0deg'],
		});

		const animation = {
			opacity: opacityAnimation,
			transform: [
				{
					scale: scaleAnimation,
				},
				{
					rotate: rotation,
				},
			],
		};

		return (
			<TouchableWithoutFeedback
				onPress={() => {
					console.log('Pressed: ', id);
					setSelected(id);
				}}>
				<Animated.View
					style={[
						styles.star,
						style,
						isSelected && (customAnimation || animation),
					]}>
					<Icon
						name="star"
						color={color}
						solid={isSelected}
						size={size}
					/>
				</Animated.View>
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
					/>
				);
			})}
		</View>
	);
}

Rating.propTypes = {
	maxRating: PropTypes.number,
	color: PropTypes.string,
	size: PropTypes.number,
	style: ViewPropTypes.style,
	animation: PropTypes.object,
	getAnimationValue: PropTypes.func,
};

Rating.defaultProps = {
	maxRating: 5,
	color: '#000000',
	size: 40,
	getAnimationValue: () => {},
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
	},
	star: {
		marginHorizontal: 8,
	},
});
