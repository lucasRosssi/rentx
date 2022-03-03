import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import { ptBR } from './localeConfig';
import { generateInterval } from './generateInterval';

import { Feather } from '@expo/vector-icons';

import {
	Calendar as CustomCalendar,
	DateData,
	LocaleConfig,
} from 'react-native-calendars';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

interface MarkedDatesProps {
	[date: string]: {
		color: string;
		textColor: string;
		disabled?: boolean;
		disableTouchEvent?: boolean;
	};
}

interface DayProps {
	dateString: string;
	day: number;
	month: number;
	year: number;
	timestamp: number;
}

interface CalendarProps {
	markedDates: MarkedDatesProps;
	onDayPress: (date: DateData) => void;
}

export function Calendar({ markedDates, onDayPress }: CalendarProps) {
	const theme = useTheme();

	return (
		<CustomCalendar
			renderArrow={(direction) => (
				<Feather
					size={24}
					color={theme.colors.text}
					name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
				/>
			)}
			headerStyle={{
				backgroundColor: theme.colors.background_secondary,
				borderBottomWidth: 0.5,
				borderBottomColor: theme.colors.text_detail,
				paddingBottom: 10,
				marginBottom: 10,
			}}
			theme={{
				textDayFontFamily: theme.fonts.primary_400,
				textDayHeaderFontFamily: theme.fonts.primary_500,
				textDayFontSize: RFValue(10),
				textMonthFontFamily: theme.fonts.secondary_600,
				textMonthFontSize: RFValue(20),
				monthTextColor: theme.colors.title,
				arrowStyle: {
					marginHorizontal: -15,
				},
			}}
			firstDay={1}
			minDate={String(new Date())}
			markingType="period"
			markedDates={markedDates}
			onDayPress={onDayPress}
		/>
	);
}

export { DayProps, MarkedDatesProps, generateInterval };
