import React from 'react';

import { Container, ImageIndex } from './styles';

interface BulletIndicatorProps {
	length: number;
	isActive: number;
}

export function BulletIndicator({ length, isActive }: BulletIndicatorProps) {
	const bullets = new Array(length).fill(1);

	const bulletsIndicator = bullets.map((_, index) => (
		<ImageIndex key={index} active={isActive === index} />
	));

	return <Container>{bulletsIndicator}</Container>;
}
