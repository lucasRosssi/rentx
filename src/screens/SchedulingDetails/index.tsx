import React from 'react';

import { Feather } from '@expo/vector-icons';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Button } from '../../components/Button';

import SpeedSvg from '../../assets/speed.svg';
import AccelerationSvg from '../../assets/acceleration.svg';
import ForceSvg from '../../assets/force.svg';
import GasolineSvg from '../../assets/gasoline.svg';
import ExchangeSvg from '../../assets/exchange.svg';
import PeopleSvg from '../../assets/people.svg';

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
	Footer,
	RentalPeriod,
	CalendarIcon,
	DateInfo,
	DateTitle,
	DateValue,
	RentalPrice,
	RentalPriceDetails,
	RentalPriceLabel,
	RentalPriceQuota,
	RentalPriceTotal,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

export function SchedulingDetails() {
	const theme = useTheme();

	return (
		<Container>
			<Header>
				<BackButton onPress={() => {}} />
			</Header>

			<CarImages>
				<ImageSlider
					imageUrl={[
						'https://png.monster/wp-content/uploads/2020/11/2018-audi-rs5-4wd-coupe-angular-front-5039562b.png',
					]}
				/>
			</CarImages>

			<Content>
				<Details>
					<Description>
						<Brand>Lamborghini</Brand>
						<Name>Huracan</Name>
					</Description>

					<Rent>
						<Period>Ao dia</Period>
						<Price>R$ 580</Price>
					</Rent>
				</Details>

				<Accessories>
					<Accessory name="380kM/h" icon={SpeedSvg} />
					<Accessory name="3.2s" icon={AccelerationSvg} />
					<Accessory name="800 HP" icon={ForceSvg} />
					<Accessory name="Gasolina" icon={GasolineSvg} />
					<Accessory name="Auto" icon={ExchangeSvg} />
					<Accessory name="2 pessoas" icon={PeopleSvg} />
				</Accessories>

				<RentalPeriod>
					<CalendarIcon>
						<Feather
							name="calendar"
							size={RFValue(24)}
							color={theme.colors.shape}
						/>
					</CalendarIcon>

					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>28/02/2022</DateValue>
					</DateInfo>

					<Feather
						name="chevron-right"
						size={RFValue(10)}
						color={theme.colors.text}
					/>

					<DateInfo>
						<DateTitle>DE</DateTitle>
						<DateValue>05/03/2022</DateValue>
					</DateInfo>
				</RentalPeriod>

				<RentalPrice>
					<RentalPriceLabel>TOTAL</RentalPriceLabel>
					<RentalPriceDetails>
						<RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
						<RentalPriceTotal>R$ 2900</RentalPriceTotal>
					</RentalPriceDetails>
				</RentalPrice>
			</Content>

			<Footer>
				<Button
					title="Agendar agora"
					color={theme.colors.success}
					onPress={() => {}}
				/>
			</Footer>
		</Container>
	);
}
