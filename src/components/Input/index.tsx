import React, { useState } from 'react';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons';
import { TextInputProps } from 'react-native';

import {
	Container,
	IconBox,
	TextInput,
	ShowPassword,
	RedBorder,
} from './styles';

interface InputProps extends TextInputProps {
	iconName: React.ComponentProps<typeof Feather>['name'];
	value?: string;
}

export function Input({ iconName, value, ...rest }: InputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);

	const theme = useTheme();

	function handleShowPassword() {
		setIsPasswordVisible(!isPasswordVisible);
	}

	function handleInputFocus() {
		setIsFocused(true);
	}

	function handleInputBlur() {
		setIsFocused(false);
		setIsFilled(!!value);
	}

	return (
		<Container>
			<IconBox>
				<Feather
					name={iconName}
					size={24}
					color={
						isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
					}
				/>
			</IconBox>

			<TextInput
				{...rest}
				secureTextEntry={iconName === 'lock' && !isPasswordVisible}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
			/>

			{iconName === 'lock' && (
				<ShowPassword activeOpacity={0.5} onPress={handleShowPassword}>
					<Feather
						name={isPasswordVisible ? 'eye-off' : 'eye'}
						size={24}
						color={theme.colors.text}
					/>
				</ShowPassword>
			)}
			{isFocused && <RedBorder />}
		</Container>
	);
}
