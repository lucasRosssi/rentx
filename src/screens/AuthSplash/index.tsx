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

import { StatusBar } from 'react-native';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import { Container, Header } from './styles';
import { useAuth } from '../../hooks/auth';

export function AuthSplash() {
	const navigation = useNavigation();
	const { user } = useAuth();

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

	function startApp() {
		if (user.id) {
			return;
		}
		navigation.navigate('SignIn');
	}

	useEffect(() => {
		brandAnimation.value = withTiming(50, { duration: 800 }, () => {
			logoAnimation.value = withTiming(50, { duration: 1200 }, () => {
				'worklet';
				runOnJS(startApp)();
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

			<Animated.View style={[logoStyle_1, { position: 'absolute' }]}>
				<LogoSvg width={180} height={20} />
			</Animated.View>
		</Container>
	);
}
