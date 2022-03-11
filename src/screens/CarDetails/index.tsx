import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import Animated, {
	useSharedValue,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	interpolate,
	Extrapolate,
} from 'react-native-reanimated';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

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
} from './styles';

interface Params {
	car: CarDTO;
}

export function CarDetails() {
	const navigation = useNavigation();
	const route = useRoute();
	const { car } = route.params as Params;

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

	const carAccessories = car.accessories.map((accessory) => (
		<Accessory
			key={accessory.type}
			name={accessory.name}
			icon={getAccessoryIcon(accessory.type)}
		/>
	));

	function handleConfirmRental() {
		navigation.navigate('Scheduling', { car });
	}

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
					<ImageSlider imageUrl={car.photos} />
				</CarImages>
			</Animated.View>

			<Content onScroll={scrollHandler}>
				<Details>
					<Description>
						<Brand>{car.brand}</Brand>
						<Name>{car.name}</Name>
					</Description>

					<Rent>
						<Period>{car.rent.period}</Period>
						<Price>R$ {car.rent.price}</Price>
					</Rent>
				</Details>

				<Accessories>{carAccessories}</Accessories>

				<About>{car.about}</About>
			</Content>

			<Footer>
				<Button
					title="Escolher período do aluguel"
					onPress={handleConfirmRental}
				/>
			</Footer>
		</Container>
	);
}
