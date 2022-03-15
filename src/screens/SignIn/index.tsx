import React, { useEffect, useState } from 'react';
import {
	Keyboard,
	KeyboardAvoidingView,
	StatusBar,
	TouchableWithoutFeedback,
} from 'react-native';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, Header, Subtitle, Title, Form, Footer } from './styles';

export function SignIn() {
	const [isKeyboardShown, setIsKeyboardShown] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const theme = useTheme();

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', () => setIsKeyboardShown(true));
		Keyboard.addListener('keyboardDidHide', () => setIsKeyboardShown(false));
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
							<Title>
								{'\n'}
								{'\n'}
							</Title>
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
							disabled
							style={{ marginBottom: 8, opacity: 0.5 }}
						/>
						{!isKeyboardShown && (
							<Button
								title="Criar conta"
								color={theme.colors.background_secondary}
								textColor={theme.colors.title}
							/>
						)}
					</Footer>
				</Container>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}
