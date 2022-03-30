import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';
import { useNetInfo } from '@react-native-community/netinfo';
import * as Yup from 'yup';

import * as ImagePicker from 'expo-image-picker';
import { Input } from '../../components/Input';
import { BackButton } from '../../components/BackButton';
import { Feather } from '@expo/vector-icons';
import { Button } from '../../components/Button';

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
	Initials,
	OfflineInfo,
} from './styles';

export function Profile() {
	const theme = useTheme();
	const netInfo = useNetInfo();
	const { user, signOut, updateUser } = useAuth();

	const [isKeyboardShown, setIsKeyboardShown] = useState(false);
	const [option, setOption] = useState('data');
	const [photo, setPhoto] = useState(user.avatar);
	const [name, setName] = useState(user.name);
	const [driver_license, setDriver_license] = useState(user.driver_license);

	let userInitials = user.name
		.trim()
		.split(' ')
		.map((names) => names[0])
		.reduce((previousLetter, letter) => previousLetter + ' ' + letter);

	function handleSignOut() {
		Alert.alert('Sair', 'Tem certeza que deseja sair do RentX?', [
			{
				text: 'Não',
			},
			{
				text: 'Sim',
				onPress: signOut,
			},
		]);
	}

	function handleChangeOption(option: 'data' | 'password') {
		if (netInfo.isConnected === false && option === 'password') {
			return;
		}
		setOption(option);
	}

	async function handleChangePhoto() {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 4],
			quality: 1,
		});

		if (result.cancelled) {
			return;
		}

		if (result.uri) {
			setPhoto(result.uri);
		}
	}

	async function handleUpdateProfile() {
		try {
			const schema = Yup.object().shape({
				name: Yup.string().required('Digite o seu nome'),
				driver_license: Yup.string().required('Digite o número da sua CNH'),
			});

			const data = { name, driver_license };
			await schema.validate(data);

			await updateUser({
				...user,
				name,
				driver_license,
				avatar: photo,
			});

			Keyboard.dismiss();
			Alert.alert('', 'Perfil atualizado');
		} catch (error) {
			console.log(error);
			if (error instanceof Yup.ValidationError) {
				Alert.alert('Opa', error.message);
			} else {
				Alert.alert('Erro', 'Não foi possível atualizar o perfil');
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

	useEffect(() => {
		if (netInfo.isConnected === false) {
			setOption('data');
		}
	}, [netInfo.isConnected]);

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
							{photo ? (
								<Photo source={{ uri: photo }} />
							) : (
								<Initials>{userInitials}</Initials>
							)}
							<PhotoButton onPress={handleChangePhoto}>
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
							disabled={option === 'password' || netInfo.isConnected === false}
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
									onChangeText={setName}
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
									onChangeText={setDriver_license}
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

					<Button title="Salvar alterações" onPress={handleUpdateProfile} />

					{netInfo.isConnected === false && (
						<OfflineInfo>
							Para alterar a senha, conecte-se à internet
						</OfflineInfo>
					)}
				</Content>
			</Container>
		</TouchableWithoutFeedback>
	);
}
