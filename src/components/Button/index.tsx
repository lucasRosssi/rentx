import React from 'react';
import { Pressable } from 'react-native';

import { Container, Title } from './styles';

interface ButtonProps {
	title: string;
	color?: string;
	onPress: () => void;
}

export function Button({ title, color, onPress }: ButtonProps) {
	return (
		<Pressable onPress={onPress}>
			<Container color={color}>
				<Title>{title}</Title>
			</Container>
		</Pressable>
	);
}
