import React from 'react';
import { Pressable, PressableProps } from 'react-native';

import { CarDTO } from '../../dtos/CarDTO';
import GasolineSvg from '../../assets/gasoline.svg';

import {
	Container,
	Details,
	Brand,
	Name,
	About,
	Rent,
	Period,
	Price,
	Type,
	CarImage,
} from './styles';

interface CarProps extends PressableProps {
	data: CarDTO;
}

export function Car({ data, ...rest }: CarProps) {
	return (
		<Pressable {...rest}>
			<Container>
				<Details>
					<Brand>{data.brand}</Brand>
					<Name>{data.name}</Name>

					<About>
						<Rent>
							<Period>{data.rent.period}</Period>
							<Price>R$ {data.rent.price}</Price>
						</Rent>

						<Type>
							<GasolineSvg />
						</Type>
					</About>
				</Details>

				<CarImage
					source={{
						uri: data.thumbnail,
					}}
					resizeMode="contain"
				/>
			</Container>
		</Pressable>
	);
}
