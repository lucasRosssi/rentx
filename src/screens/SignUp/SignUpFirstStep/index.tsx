import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { BackButton } from '../../../components/BackButton';
import { BulletIndicator } from '../../../components/BulletIndicator';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { Container, Header, Title, Subtitle, Form, FormTitle } from './styles';

export function SignUpFirstStep() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [driver_license, setDriver_license] = useState('');
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);

	const theme = useTheme();
	const navigation = useNavigation();

	async function handleNextStep() {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Digite o seu nome'),
				email: Yup.string()
					.required('Digite um email')
					.email('Digite um email válido'),
				driver_license: Yup.string().required('Digite o número da sua CNH'),
			});

			const data = { name, email, driver_license };
			await schema.validate(data);

			navigation.navigate('SignUpSecondStep', { user: data });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				Alert.alert('Opa', error.message);
			}
		}
	}

	useEffect(() => {
		const showKeyboard = Keyboard.addListener('keyboardDidShow', () =>
			setIsKeyboardShown(true)
		);
		const hideKeyboard = Keyboard.addListener('keyboardDidHide', () =>
			setIsKeyboardShown(false)
		);

		return () => {
			setIsKeyboardShown(false);
			Keyboard.removeSubscription(showKeyboard);
			Keyboard.removeSubscription(hideKeyboard);
		};
	}, []);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header>
					<BackButton />
					<BulletIndicator length={2} isActive={0} />
				</Header>

				{!isKeyboardShown && (
					<>
						<Title>
							Crie sua{'\n'}
							conta
						</Title>
						<Subtitle>
							Faça seu cadastro de{'\n'}
							forma rápida e fácil
						</Subtitle>
					</>
				)}

				<Form>
					<FormTitle>1. Dados</FormTitle>

					<Input
						iconName="user"
						placeholder="Nome"
						value={name}
						onChangeText={setName}
					/>
					<Input
						iconName="mail"
						placeholder="E-mail"
						keyboardType="email-address"
						value={email}
						onChangeText={setEmail}
					/>
					<Input
						iconName="credit-card"
						placeholder="CNH"
						keyboardType="numeric"
						value={driver_license}
						onChangeText={setDriver_license}
					/>
				</Form>
				<Button
					title="Próximo"
					onPress={handleNextStep}
					textColor={theme.colors.background_secondary}
				/>
			</Container>
		</TouchableWithoutFeedback>
	);
}
