'use client';
import { useState, useEffect } from 'react';
import Countdown from './Countdown';
import { PiSpinner } from 'react-icons/pi';

const ComingSoonPage = () => {
	const [isVisible, setIsVisible] = useState(false);

	const delay = 3000;

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setIsVisible(true);
		}, delay);

		return () => {
			clearTimeout(timeoutId);
		};
	}, []);

	return (
		<div className="w-full h-screen bg-gradient-to-bl from-teal-400 to-blue-500 flex flex-col items-center text-white">
			<div className="mt-72 mb-10">
				<div className="flex space-x-2 justify-center items-center">
					<h1 className="text-5xl text-white font-bold mb-8">Coming Soon </h1>
					<div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
					<div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
					<div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
				</div>
				<p className="text-white text-lg mb-8">
					Mahid is working hard to show you something great. Stay tuned!
				</p>
			</div>
			{!isVisible && (
				<div
					className={`animate-[spin_5s_linear_infinite] transition-opacity duration-500 ${
						!isVisible ? 'opacity-100' : 'opacity-0'
					}`}>
					<PiSpinner size={'5rem'} />
				</div>
			)}
			<div
				className={`transition-opacity duration-1000 ${
					isVisible ? 'opacity-100' : 'opacity-0'
				}`}>
				<Countdown />
			</div>
		</div>
	);
};

export default ComingSoonPage;
