import classNames from 'classnames';
import Select from '../Select/index';
import React from 'react';
import styles from './Calendar.module.scss';

interface CalendarProps {
	value?: Date;
	onChange?: (value: Date) => Date;
	locale: keyof typeof days;
}

interface FullDate {
	month: number;
	year: number;
	day: number;
}

const days = {
	en: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
};
const years = [
	{ id: 2022, value: 2022, displayValue: '2022' },
	{ id: 2021, value: 2021, displayValue: '2021' },
	{ id: 2020, value: 2020, displayValue: '2020' },
];
const months = [
	{ id: 0, value: 0, displayValue: 'January' },
	{ id: 1, value: 1, displayValue: 'February' },
	{ id: 2, value: 2, displayValue: 'March' },
	{ id: 3, value: 3, displayValue: 'April' },
	{ id: 4, value: 4, displayValue: 'May' },
	{ id: 5, value: 5, displayValue: 'June' },
	{ id: 6, value: 6, displayValue: 'July' },
	{ id: 7, value: 7, displayValue: 'August' },
	{ id: 8, value: 8, displayValue: 'September' },
	{ id: 9, value: 9, displayValue: 'October' },
	{ id: 10, value: 10, displayValue: 'November' },
	{ id: 11, value: 11, displayValue: 'December' },
];
const Calendar = ({ value, onChange, locale }: CalendarProps) => {
	const date = new Date();

	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const [fullDate, setFullDate] = React.useState<FullDate>({
		month: date.getMonth(),
		year: date.getFullYear(),
		day: 0,
	});

	const changeMonth = (value: number) => {
		setFullDate({ ...fullDate, month: value });
	};
	const changeYear = (value: number) => {
		setFullDate({ ...fullDate, year: value });
	};
	const changeDay = (value: number) => {
		setFullDate({ ...fullDate, day: value });
	};

	const getDays = (month: number, year: number) => {
		const resultDays = [];
		const date = new Date(year, month, 1 - 1);
		const firstElemDate = new Date(year, month, 1);
		for (let i = 0; i < firstElemDate.getDay() - 1; i++) {
			resultDays.push(0);
		}
		for (let i = 1; i <= Number(date.getDate()); i++) {
			resultDays.push(i);
		}
		return resultDays;
	};
	return (
		<div className={styles.root}>
			<div className={styles.selects}>
				<Select items={months} onChangeItem={(value) => changeMonth(value)} />
				<Select items={years} onChangeItem={(value) => changeYear(value)} />
			</div>
			<div className={styles.days}>
				{days[locale]?.map((day) => (
					<span key={day}>{day}</span>
				))}
			</div>
			<div className={styles.dayNumbers}>
				{getDays(fullDate.month, fullDate.year).map((elem, index) =>
					elem === 0 ? (
						<span key={`${index}-${elem}`} className={styles.hidden}></span>
					) : (
						<span
							key={index}
							onClick={() => changeDay(elem)}
							className={classNames({
								[styles.active]: fullDate.day === elem,
							})}>
							{elem}
						</span>
					),
				)}
			</div>
		</div>
	);
};

export default Calendar;
