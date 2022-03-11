import React from 'react';
import LottieView from 'lottie-react-native';

import loadingCar from '../../assets/loading_car.json';

import { Container } from './styles';

export function LoadingIndicator() {
	return (
		<Container>
			<LottieView
				source={loadingCar}
				autoPlay
				style={{ height: 200 }}
				resizeMode="contain"
				loop
			/>
		</Container>
	);
}
