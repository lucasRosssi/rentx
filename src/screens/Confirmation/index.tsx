import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';

export interface ConfirmationProps {
	title: string;
	message: string;
	nextNavigation: keyof ReactNavigation.RootParamList;
}

export function Confirmation() {
	const { width } = useWindowDimensions();
	const navigation = useNavigation();
	const route = useRoute();
	const { title, message, nextNavigation } = route.params as ConfirmationProps;

	function handleConfirm() {
		navigation.navigate(nextNavigation);
	}

	return (
		<Container>
			<StatusBar
				barStyle="light-content"
				backgroundColor="transparent"
				translucent
			/>
			<LogoSvg width={width} />

			<Content>
				<DoneSvg width={80} height={80} />
				<Title>{title}</Title>

				<Message>{message}</Message>
			</Content>

			<Footer>
				<ConfirmButton title="OK" onPress={handleConfirm} />
			</Footer>
		</Container>
	);
}
