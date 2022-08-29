const withTM = require('next-transpile-modules')([
	'@stripe/firestore-stripe-payments',
]);

module.exports = withTM({
	reactStrictMode: true,
	images: {
		domains: ['rb.gy', 'image.tmdb.org'],
	},
});
