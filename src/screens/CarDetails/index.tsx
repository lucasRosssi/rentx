import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from 'styled-components';

import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { Car as ModelCar } from '../../database/models/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import {
	Container,
	Header,
	CarImages,
	Content,
	Details,
	Description,
	Brand,
	Name,
	Rent,
	Period,
	Price,
	Accessories,
	About,
	Footer,
	OfflineInfo,
} from './styles';

interface Params {
	car: ModelCar;
}

export function CarDetails() {
	const theme = useTheme();
	const navigation = useNavigation();
	const route = useRoute();
	const netInfo = useNetInfo();
	const { car } = route.params as Params;

	const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

	const scrollY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler((event) => {
		scrollY.value = event.contentOffset.y;
	});

	const headerStyleAnimation = useAnimatedStyle(() => {
		return {
			height: interpolate(
				scrollY.value,
				[0, 200],
				[230, 90],
				Extrapolate.CLAMP
			),
		};
	});

	const sliderCarsStyleAnimation = useAnimatedStyle(() => {
		return {
			opacity: interpolate(scrollY.value, [0, 130], [1, 0], Extrapolate.CLAMP),
		};
	});

	const carAccessories =
		carUpdated.accessories &&
		carUpdated.accessories.map((accessory) => (
			<Accessory
				key={accessory.type}
				name={accessory.name}
				icon={getAccessoryIcon(accessory.type)}
			/>
		));

	function handleConfirmRental() {
		navigation.navigate('Scheduling', { car });
	}

	useEffect(() => {
		async function fetchOnlineData() {
			const response = await api.get(`/cars/${car.id}`);
			setCarUpdated(response.data);
		}

		if (netInfo.isConnected === true) {
			fetchOnlineData();
		}
	}, [netInfo.isConnected]);

	return (
		<Container>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle="dark-content"
			/>

			<Animated.View style={[headerStyleAnimation, { overflow: 'hidden' }]}>
				<Header>
					<BackButton />
				</Header>

				<CarImages style={sliderCarsStyleAnimation}>
					<ImageSlider
						imageUrl={
							!!carUpdated.photos
								? carUpdated.photos
								: [{ id: car.thumbnail, photo: car.thumbnail }]
						}
					/>
				</CarImages>
			</Animated.View>

			<Content onScroll={scrollHandler}>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.period}</Period>
						<Price>R$ {netInfo.isConnected === true ? car.price : '--'}</Price>
					</Rent>
				</Details>

				{carUpdated.accessories && <Accessories>{carAccessories}</Accessories>}

				<About>{car.about}</About>
			</Content>

			<Footer>
				<Button
					title="Escolher período do aluguel"
					onPress={handleConfirmRental}
					disabled={netInfo.isConnected !== true}
					color={
						netInfo.isConnected === true
							? theme.colors.main
							: theme.colors.text_detail
					}
				/>

				{netInfo.isConnected === false && (
					<OfflineInfo>
						Conecte-se à internet para ver mais detalhes do carro.
					</OfflineInfo>
				)}
			</Footer>
		</Container>
	);
}
