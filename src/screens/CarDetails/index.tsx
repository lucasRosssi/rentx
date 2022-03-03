import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

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
			<Header>
				<BackButton />
			</Header>

			<CarImages>
				<ImageSlider imageUrl={car.photos} />
			</CarImages>

			<Content>
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
