import React from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import { Container } from './styles';
import { useTheme } from 'styled-components';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface BackButtonProps {
	color?: string;
}

export function BackButton({ color }: BackButtonProps) {
	const theme = useTheme();
	const { goBack } = useNavigation();

	return (
		<Pressable onPress={goBack}>
			<Container>
				<MaterialIcons
					name="chevron-left"
					size={24}
					color={color ? color : theme.colors.text}
				/>
			</Container>
		</Pressable>
	);
}
