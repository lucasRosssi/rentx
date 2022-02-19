import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { Car } from '../../components/Car';
import Logo from '../../assets/logo.svg';

import { Container, Header, TotalCars } from './styles';

export function Home() {
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

			<Car />
		</Container>
	);
}
