'use client';
import Countdown from './Countdown';

const ComingSoonPage = () => {
	return (
		<div className="w-full h-screen bg-gradient-to-bl from-teal-400 to-blue-500 flex flex-col justify-center items-center text-white">
			<div className="flex space-x-2 justify-center items-center">
				<h1 className="text-5xl text-white font-bold mb-8">Coming Soon </h1>
				<div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
				<div className="h-4 w-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
				<div className="h-4 w-4 bg-white rounded-full animate-bounce"></div>
			</div>

			<p className="text-white text-lg mb-8">
				Working hard to bring you something great. Stay tuned!
			</p>
			<Countdown />
		</div>
	);
};

export default ComingSoonPage;
