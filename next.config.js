const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');
const nextRuntimeDotenv = require('next-runtime-dotenv');

const withConfig = nextRuntimeDotenv({
	// path: '.env',
	public: [ 'TEST','STATIC_DIR' ],
	server: [ 'TEST_SERVER' ]
});

module.exports = withConfig(
	withImages(
		withCss(
			withSass({
				webpack: (config, { isServer }) => {
					config.module.rules.push({
						test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
						use: {
							loader: 'url-loader',
							options: {
								limit: 100000
							}
						}
					});

					if (isServer) {
						const antStyles = /antd\/.*?\/style\/css.*?/;
						const origExternals = [ ...config.externals ];
						config.externals = [
							(context, request, callback) => {
								if (request.match(antStyles)) return callback();
								if (typeof origExternals[0] === 'function') {
									origExternals[0](context, request, callback);
								} else {
									callback();
								}
							},
							...(typeof origExternals[0] === 'function' ? [] : origExternals)
						];

						config.module.rules.unshift({
							test: antStyles,
							use: 'null-loader'
						});
					}

					return config;
				}
			})
		)
	)
);

