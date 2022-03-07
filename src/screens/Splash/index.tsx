import React, { useEffect } from 'react';
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	interpolate,
	Extrapolate,
	runOnJS,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { StatusBar, Dimensions } from 'react-native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container, Header } from './styles';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const HEIGHT = Dimensions.get('window').height;
const statusBarHeight = getStatusBarHeight();

export function Splash() {
	const navigation = useNavigation();
	const theme = useTheme();

	const brandAnimation = useSharedValue(0);
	const logoAnimation = useSharedValue(0);
	const startAppAnimation = useSharedValue(0);

	const brandStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: interpolate(
						brandAnimation.value,
						[0, 50],
						[0, 75],
						Extrapolate.CLAMP
					),
				},
				{
					scale: interpolate(brandAnimation.value, [0, 50], [1, 0.4]),
				},
			],
			opacity: interpolate(startAppAnimation.value, [0, 1], [1, 0]),
		};
	});

	const logoStyle_1 = useAnimatedStyle(() => {
		return {
			opacity: interpolate(logoAnimation.value, [0, 25, 50], [0, 0.3, 1]),
		};
	});

	const logoStyle_2 = useAnimatedStyle(() => {
		return {
			transform: [
				{
					scale: interpolate(startAppAnimation.value, [0, 50], [1, 0.6]),
				},
				{
					translateY: interpolate(startAppAnimation.value, [0, 50], [0, -527]),
				},
				{
					translateX: interpolate(startAppAnimation.value, [0, 50], [0, -197]),
				},
			],
		};
	});

	const whiteBackgroundStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateY: interpolate(
						startAppAnimation.value,
						[0, 50],
						[0, 113 - HEIGHT - statusBarHeight]
					),
				},
			],
		};
	});

	function startApp() {
		navigation.navigate('Home');
	}

	useEffect(() => {
		brandAnimation.value = withTiming(50, { duration: 800 }, () => {
			logoAnimation.value = withTiming(50, { duration: 1200 }, () => {
				startAppAnimation.value = withTiming(50, { duration: 400 }, () => {
					'worklet';
					runOnJS(startApp)();
				});
			});
		});
	}, []);

	return (
		<Container>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="light-content"
			/>

			<Header />

			<Animated.View style={[brandStyle, { position: 'absolute' }]}>
				<BrandSvg width={80} height={50} />
			</Animated.View>

			<Animated.View
				style={[logoStyle_1, logoStyle_2, { position: 'absolute' }]}
			>
				<LogoSvg width={180} height={20} />
			</Animated.View>

			<Animated.View
				style={[
					whiteBackgroundStyle,
					{
						flex: 1,
						height: '100%',
						width: '100%',
						position: 'absolute',
						bottom: -HEIGHT - statusBarHeight,
						backgroundColor: theme.colors.background_primary,
					},
				]}
			/>
		</Container>
	);
}
