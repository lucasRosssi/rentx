import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Car } from '../../components/Car';
import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars } from './styles';

export function Home() {
	const carData_01 = {
		brand: 'audi',
		name: 'RS 5 Coupé',
		rent: {
			time: 'ao dia',
			price: 120,
		},
		thumbnail:
			'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
	};

	const carData_02 = {
		brand: 'porsche',
		name: 'Panamera',
		rent: {
			time: 'ao dia',
			price: 340,
		},
		thumbnail:
			'https://pensecarros.com.br/cms/uploads/porsche-panamera-2-9-v6-e-hybrid-4-pdk-60f0ebf583b0a.png',
	};

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<Header>
				<Logo
					width={RFValue(108)}
					height={RFValue(12)}
					style={{ marginBottom: RFValue(4) }}
				/>

				<TotalCars>Total de 12 carros</TotalCars>
			</Header>

			<Car data={carData_01} />
			<Car data={carData_02} />
		</Container>
	);
}
