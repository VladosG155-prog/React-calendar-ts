import classNames from 'classnames';
import React from 'react';
import styles from './Select.module.scss';
interface SelectItem {
	value: number;
	id: number;
	displayValue: string;
}

interface SelectProps {
	items: SelectItem[];
	onChangeItem: (value: number) => void;
}

const Select = ({ items, onChangeItem }: SelectProps) => {
	const [selectedValue, setSelectedValue] = React.useState<SelectItem>(items[0]);
	const [isOpenDropDown, setIsOpenDropDown] = React.useState(false);

	const mySelect = React.useRef<HTMLDivElement | any>(null);

	const clickOutsideElem = (e: Event) => {
		const { current } = mySelect;
		if (!e.composedPath().includes(current)) setIsOpenDropDown(false);
	};

	React.useEffect(() => {
		document.addEventListener('click', clickOutsideElem);
		return () => document.removeEventListener('click', clickOutsideElem);
	}, []);

	const handleOpenDropDown = () => {
		setIsOpenDropDown((open) => !open);
	};

	const selectValue = (value: SelectItem): void => {
		setSelectedValue(value);
		setIsOpenDropDown(false);
		onChangeItem(value.value);
	};

	return (
		<div className={styles.root} ref={mySelect}>
			<div className={styles.header} onClick={handleOpenDropDown}>
				<span>{selectedValue.displayValue}</span>
				<i>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M6.29289 8.79289C6.68342 8.40237 7.31658 8.40237 7.70711 8.79289L12 13.0858L16.2929 8.79289C16.6834 8.40237 17.3166 8.40237 17.7071 8.79289C18.0976 9.18342 18.0976 9.81658 17.7071 10.2071L12.7071 15.2071C12.3166 15.5976 11.6834 15.5976 11.2929 15.2071L6.29289 10.2071C5.90237 9.81658 5.90237 9.18342 6.29289 8.79289Z"
							fill="#94A3B8"
						/>
					</svg>
				</i>
			</div>
			{isOpenDropDown && (
				<div className={styles.wrapper}>
					<div className={styles.drowDown}>
						{items.map((item) => (
							<p
								onClick={() => selectValue(item)}
								className={classNames({
									[styles.active]: selectedValue.id === item.id,
								})}
								data-value={item.value}
								key={item.id}>
								{item.displayValue}
							</p>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Select;
