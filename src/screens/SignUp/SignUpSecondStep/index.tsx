import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { api } from '../../../services/api';

import { BackButton } from '../../../components/BackButton';
import { BulletIndicator } from '../../../components/BulletIndicator';
import { Input } from '../../../components/Input';
import { Button } from '../../../components/Button';

import { Container, Header, Title, Subtitle, Form, FormTitle } from './styles';

interface Params {
	user: {
		name: string;
		email: string;
		driver_license: string;
	};
}

export function SignUpSecondStep() {
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const theme = useTheme();
	const navigation = useNavigation();
	const route = useRoute();

	const { user } = route.params as Params;

	async function handleRegister() {
		if (!password) {
			return Alert.alert('', 'Informe uma senha');
		}

		if (!passwordConfirm) {
			return Alert.alert('', 'Confirme a senha');
		}

		if (passwordConfirm !== password) {
			return Alert.alert('', 'As senhas não são iguais');
		}

		await api
			.post('/users', {
				name: user.name,
				email: user.email,
				driver_license: user.driver_license,
				password,
			})
			.then(() => {
				navigation.navigate('Confirmation', {
					title: 'Conta criada',
					message: 'Agora é só aproveitar',
					nextNavigation: 'HomeStack',
				});
			})
			.catch(() => {
				Alert.alert('Opa', 'Não foi possível cadastrar');
			});
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
					<BulletIndicator length={2} isActive={1} />
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
					<FormTitle>2. Senha</FormTitle>

					<Input
						iconName="lock"
						placeholder="Senha"
						value={password}
						onChangeText={setPassword}
					/>
					<Input
						iconName="lock"
						placeholder="Repetir senha"
						value={passwordConfirm}
						onChangeText={setPasswordConfirm}
					/>
				</Form>
				<Button
					title="Cadastrar"
					color={theme.colors.success}
					textColor={theme.colors.background_secondary}
					onPress={handleRegister}
				/>
			</Container>
		</TouchableWithoutFeedback>
	);
}
