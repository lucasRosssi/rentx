import React, { useEffect, useState } from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import { Input } from '../../components/Input';

import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';

import {
	Container,
	Header,
	HeaderTop,
	HeaderTitle,
	SignOutButton,
	PhotoContainer,
	Photo,
	PhotoButton,
	Content,
	Options,
	Option,
	OptionTitle,
	RedBorder,
	Section,
} from './styles';

export function Profile() {
	const theme = useTheme();
	const { user } = useAuth();

	const [isKeyboardShown, setIsKeyboardShown] = useState(false);
	const [option, setOption] = useState('data');

	function handleSignOut() {}

	function handleChangeOption(option: 'data' | 'password') {
		setOption(option);
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
				<Header isKeyboardShown={isKeyboardShown}>
					<HeaderTop>
						<BackButton color={theme.colors.shape} />
						<HeaderTitle>Editar Perfil</HeaderTitle>
						<SignOutButton onPress={handleSignOut}>
							<Feather
								name="power"
								size={RFValue(24)}
								color={theme.colors.shape}
							/>
						</SignOutButton>
					</HeaderTop>

					{!isKeyboardShown && (
						<PhotoContainer>
							<Photo
								source={{ uri: 'https://www.github.com/lucasRosssi.png' }}
							/>
							<PhotoButton>
								<Feather
									name="camera"
									color={theme.colors.shape}
									size={RFValue(24)}
								/>
							</PhotoButton>
						</PhotoContainer>
					)}
				</Header>

				<Content isKeyboardShown={isKeyboardShown}>
					<Options>
						<Option
							onPress={() => handleChangeOption('data')}
							disabled={option === 'data'}
						>
							<OptionTitle isActive={option === 'data'}>Dados</OptionTitle>
							{option === 'data' && <RedBorder />}
						</Option>
						<Option
							onPress={() => handleChangeOption('password')}
							disabled={option === 'password'}
						>
							<OptionTitle isActive={option === 'password'}>
								Trocar senha
							</OptionTitle>
							{option === 'password' && <RedBorder />}
						</Option>
					</Options>

					<Section>
						{option === 'data' && (
							<>
								<Input
									iconName="user"
									placeholder="Nome"
									autoCapitalize="words"
									autoCorrect={false}
									defaultValue={user.name}
								/>
								<Input
									editable={false}
									iconName="mail"
									placeholder="E-mail"
									autoCorrect={false}
									defaultValue={user.email}
								/>
								<Input
									iconName="credit-card"
									placeholder="CNH"
									keyboardType="numeric"
									defaultValue={user.driver_license}
								/>
							</>
						)}
						{option === 'password' && (
							<>
								<Input iconName="lock" placeholder="Senha atual" />
								<Input iconName="lock" placeholder="Nova senha" />
								<Input iconName="lock" placeholder="Repetir nova senha" />
							</>
						)}
					</Section>
				</Content>
			</Container>
		</TouchableWithoutFeedback>
	);
}
