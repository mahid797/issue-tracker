import React, { useState, useEffect } from 'react';
import './Countdown.css';
const Countdown: React.FC = () => {
	const [days, setDays] = useState<number>(0);
	const [hours, setHours] = useState<number>(0);
	const [minutes, setMinutes] = useState<number>(0);
	const [seconds, setSeconds] = useState<number>(0);

	// Set your target date (e.g., launch date, event date)
	const targetDate = new Date('2024-05-10T23:59:59');

	useEffect(() => {
		const intervalId = setInterval(() => {
			const now = new Date();
			const timeRemaining = targetDate.getTime() - now.getTime();

			if (timeRemaining <= 0) {
				clearInterval(intervalId);
				setDays(0);
				setHours(0);
				setMinutes(0);
				setSeconds(0);
			} else {
				// Calculate remaining days, hours, minutes, seconds
				const totalSeconds = Math.floor(timeRemaining / 1000);
				const remainingDays = Math.floor(totalSeconds / (24 * 60 * 60));
				const remainingHours = Math.floor(
					(totalSeconds % (24 * 60 * 60)) / 3600
				);
				const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
				const remainingSeconds = totalSeconds % 60;

				// Update the countdown state
				setDays(remainingDays);
				setHours(remainingHours);
				setMinutes(remainingMinutes);
				setSeconds(remainingSeconds);
			}
		}, 1000);

		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div>
			<div id="countdown">
				<div className="col-4">
					<div className="box">
						<p id="day">{days}</p>
						<span className="text">Days</span>
					</div>
				</div>
				<div className="col-4">
					<div className="box">
						<p id="hour">{hours}</p>
						<span className="text">Hours</span>
					</div>
				</div>
				<div className="col-4">
					<div className="box">
						<p id="minute">{minutes}</p>
						<span className="text">Minutes</span>
					</div>
				</div>
				<div className="col-4">
					<div className="box">
						<p id="second" className="animate-pulse ">
							{seconds}
						</p>
						<span className="text">Seconds</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Countdown;
