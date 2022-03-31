import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import FastImage from 'react-native-fast-image';

const screenWidth = Dimensions.get('window').width;

export const Container = styled.View`
	width: 100%;
`;

export const CarImageWrapper = styled.View`
	width: ${screenWidth}px;
	align-items: center;
	justify-content: center;
`;

export const CarImage = styled(FastImage)`
	width: ${RFValue(240)}px;
`;
