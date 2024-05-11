/** @type {import('next').NextConfig} */
const nextConfig = {
	async headers() {
		return [
			{
				source: '/:path*',
				headers: [{ key: 'referrer-policy', value: 'no-referrer' }],
			},
		];
	},
	compiler: {
		styledComponents: true,
	},

	//Used with Coming Soon Page
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/',
	// 			destination: '/coming-soon',
	// 			permanent: false,
	// 		},
	// 	];
	// },
};

module.exports = nextConfig;
