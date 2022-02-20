import React from 'react';

import GasolineSvg from '../../assets/gasoline.svg';

import {
	Container,
	Details,
	Brand,
	Name,
	About,
	Rent,
	Time,
	Price,
	Type,
	CarImage,
} from './styles';

interface CarData {
	brand: string;
	name: string;
	rent: {
		time: string;
		price: number;
	};
	thumbnail: string;
}

interface CarProps {
	data: CarData;
}

export function Car({ data }: CarProps) {
	return (
		<Container>
			<Details>
				<Brand>{data.brand}</Brand>
				<Name>{data.name}</Name>

				<About>
					<Rent>
						<Time>{data.rent.time}</Time>
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
	);
}
