import React from 'react';
import { Pressable, PressableProps } from 'react-native';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from '../../dtos/CarDTO';

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
import { Car as ModelCar } from '../../database/models/Car';
import { useNetInfo } from '@react-native-community/netinfo';

interface CarProps extends PressableProps {
	data: ModelCar;
}

export function Car({ data, disabled, ...rest }: CarProps) {
	const MotorIcon = getAccessoryIcon(data.fuel_type);
	const netInfo = useNetInfo();

	return (
		<Pressable {...rest}>
			<Container enabled={!disabled}>
				<Details>
					<Brand>{data.brand}</Brand>
					<Name>{data.name}</Name>

					<About>
						<Rent>
							<Period>{data.period}</Period>
							<Price>
								R$ {netInfo.isConnected === true ? data.price : '--'}
							</Price>
						</Rent>

						<Type>
							<MotorIcon />
						</Type>
					</About>
				</Details>

				<CarImage
					source={{
						uri: data.thumbnail,
					}}
					resizeMode="contain"
					style={{ height: 150 }}
				/>
			</Container>
		</Pressable>
	);
}
