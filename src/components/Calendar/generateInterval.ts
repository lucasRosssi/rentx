import { eachDayOfInterval, format } from 'date-fns';
import { MarkedDatesProps, DayProps } from '.';
import { getPlatformDate } from '../../utils/getPlatformDate';
import theme from '../../styles/theme';

export function generateInterval(start: DayProps, end: DayProps) {
	let interval: MarkedDatesProps = {};

	eachDayOfInterval({
		start: new Date(start.timestamp),
		end: new Date(end.timestamp),
	}).forEach((item) => {
		const date = format(getPlatformDate(item), 'yyyy-MM-dd');

		interval = {
			...interval,
			[date]: {
				color:
					start.dateString === date || end.dateString === date
						? theme.colors.main
						: theme.colors.main_light,

				textColor:
					start.dateString === date || end.dateString === date
						? theme.colors.shape
						: theme.colors.main,
			},
		};
	});

	return interval;
}
