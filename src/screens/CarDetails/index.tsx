import React from 'react';

import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

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
	About,
} from './styles';

export function CarDetails() {
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

				<About>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime quia
					sit fuga, iusto soluta culpa molestias unde aliquid consequatur,
					quaerat reiciendis dolorum illo at incidunt quibusdam nesciunt quam
					voluptatem esse!
				</About>
			</Content>
		</Container>
	);
}
