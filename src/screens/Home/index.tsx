import React from 'react';
import { StatusBar, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import { Car } from '../../components/Car';
import Logo from '../../assets/logo.svg';

import { CarList, Container, Header, TotalCars } from './styles';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export function Home() {
	const navigation = useNavigation();

	const carData = {
		brand: 'audi',
		name: 'RS 5 Coupé',
		rent: {
			period: 'ao dia',
			price: 120,
		},
		thumbnail:
			'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
	};

	function handleCarDetails() {
		navigation.navigate('CarDetails');
	}

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

			<CarList
				data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
				keyExtractor={(item) => String(item)}
				renderItem={({ item }) => (
					<Car data={carData} onPress={handleCarDetails} />
				)}
			/>
		</Container>
	);
}
