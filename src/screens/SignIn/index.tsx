import React, { useEffect, useState } from 'react';
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	StatusBar,
	TouchableWithoutFeedback,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import * as Yup from 'yup';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Feather } from '@expo/vector-icons';

import {
	Container,
	Header,
	Subtitle,
	Title,
	Form,
	Footer,
	HideButton,
} from './styles';

export function SignIn() {
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const theme = useTheme();
	const navigation = useNavigation();
	const { signIn } = useAuth();

	async function handleSignIn() {
		try {
			const schema = Yup.object().shape({
				email: Yup.string()
					.required('Digite um e-mail')
					.email('Digite um e-mail válido'),
				password: Yup.string().required('Digite a sua senha'),
			});

			await schema.validate({ email, password });

			signIn({ email, password });
		} catch (error) {
			if (error instanceof Yup.ValidationError) {
				Alert.alert('Opa', error.message);
			} else {
				Alert.alert(
					'Erro na autenticação',
					'Ocorreu um erro ao fazer login, verifique as credenciais'
				);
			}
		}
	}

	function handleNewAccount() {
		navigation.navigate('SignUpFirstStep');
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
		<KeyboardAvoidingView behavior="position" enabled>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<Container>
					<StatusBar
						translucent
						backgroundColor="transparent"
						barStyle="dark-content"
					/>
					<Header>
						{!isKeyboardShown ? (
							<Title>
								Estamos{'\n'}
								quase lá.
							</Title>
						) : (
							<>
								<Title>
									{'\n'}
									{'\n'}
								</Title>
								<HideButton onPress={Keyboard.dismiss}>
									<Feather
										name="chevron-left"
										color={theme.colors.text}
										size={RFValue(24)}
									/>
								</HideButton>
							</>
						)}
						<Subtitle>
							Faça seu login para começar{'\n'}uma experiência incrível.
						</Subtitle>
					</Header>

					<Form>
						<Input
							iconName="mail"
							placeholder="E-mail"
							placeholderTextColor={theme.colors.text_detail}
							keyboardType="email-address"
							autoCorrect={false}
							autoCapitalize="none"
							value={email}
							onChangeText={setEmail}
						/>
						<Input
							iconName="lock"
							placeholder="Senha"
							placeholderTextColor={theme.colors.text_detail}
							autoCorrect={false}
							autoCapitalize="none"
							value={password}
							onChangeText={setPassword}
						/>
					</Form>
					<Footer>
						<Button
							title="Login"
							disabled={email === '' && password === ''}
							style={{
								marginBottom: 8,
								opacity: email === '' && password === '' ? 0.5 : 1,
							}}
							onPress={handleSignIn}
							textColor={theme.colors.background_secondary}
						/>
						{!isKeyboardShown && (
							<Button
								title="Criar conta"
								color={theme.colors.background_secondary}
								textColor={theme.colors.title}
								onPress={handleNewAccount}
							/>
						)}
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
