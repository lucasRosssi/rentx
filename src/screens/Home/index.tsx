import React, { useEffect, useState } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import {
	useSharedValue,
	useAnimatedStyle,
	useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Ionicons } from '@expo/vector-icons';
import Logo from '../../assets/logo.svg';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Car } from '../../components/Car';

import {
	CarList,
	Container,
	Header,
	TotalCars,
	MyCarsButton,
	MyCarsButtonWrapper,
} from './styles';

export function Home() {
	const [cars, setCars] = useState<CarDTO[]>([]);
	const [loading, setLoading] = useState(true);

	const { width, height } = useWindowDimensions();

	const positionY = useSharedValue(0);
	const positionX = useSharedValue(0);
	const myCarsButtonAnimatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{ translateX: positionX.value },
				{ translateY: positionY.value },
			],
		};
	});
	const onGestureEvent = useAnimatedGestureHandler({
		onStart(_, ctx: any) {
			ctx.positionX = positionX.value;
			ctx.positionY = positionY.value;
		},
		onActive(event, ctx: any) {
			positionX.value = ctx.positionX + event.translationX;
			positionY.value = ctx.positionY + event.translationY;
			if (positionX.value > 23) {
				positionX.value = 23;
			}
			if (positionX.value < -width + 83) {
				positionX.value = -width + 83;
			}
			if (positionY.value > 13) {
				positionY.value = 13;
			}
			if (positionY.value < -height + 73) {
				positionY.value = -height + 73;
			}
		},
		onEnd() {},
	});

	const theme = useTheme();
	const navigation = useNavigation();

	function handleCarDetails(car: CarDTO) {
		navigation.navigate('CarDetails', { car });
	}

	function handleOpenMyCars() {
		navigation.navigate('MyCars');
	}

	useEffect(() => {
		async function fetchCars() {
			try {
				const response = await api.get('/cars');
				setCars(response.data);
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		}

		fetchCars();
	}, []);

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Header>
				<Logo width={108} height={12} style={{ marginBottom: RFValue(4) }} />

				<TotalCars>{loading ? '' : `Total de ${cars.length} carros`}</TotalCars>
			</Header>

			{loading ? (
				<LoadingIndicator />
			) : (
				<CarList
					data={cars}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<Car data={item} onPress={() => handleCarDetails(item)} />
					)}
				/>
			)}

			<PanGestureHandler onGestureEvent={onGestureEvent}>
				<MyCarsButtonWrapper style={myCarsButtonAnimatedStyle}>
					<MyCarsButton onPress={handleOpenMyCars}>
						<Ionicons
							name="ios-car-sport"
							size={RFValue(32)}
							color={theme.colors.shape}
						/>
					</MyCarsButton>
				</MyCarsButtonWrapper>
			</PanGestureHandler>
		</Container>
	);
}
