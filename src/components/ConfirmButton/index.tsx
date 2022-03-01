import React from 'react';
import { Pressable } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ConfirmButtonProps {
	title: string;
	onPress: () => void;
}

export function ConfirmButton({ title, onPress }: ConfirmButtonProps) {
	return (
		<Pressable onPress={onPress}>
			<Container>
				<Title>{title}</Title>
			</Container>
		</Pressable>
	);
}
