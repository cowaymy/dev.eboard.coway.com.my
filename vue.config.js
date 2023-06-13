const path = require('path');
const { mergeSassVariables } = require('@vuetify/cli-plugin-utils');

module.exports = {
	transpileDependencies: ['vuetify'],
	configureWebpack: {
		resolve: {
			alias: {
				'@themeConfig': path.resolve(__dirname, 'themeConfig.js'),
				'@core': path.resolve(__dirname, 'src/@core'),
				'@user-variables': path.resolve(__dirname, 'src/style/variables.scss'),
				// apexcharts: path.resolve(
				// 	__dirname,
				// 	'node_modules/apexcharts-clevision',
				// ),
			},
		},
	},
	chainWebpack: config => {
		const modules = ['vue-modules', 'vue', 'normal-modules', 'normal'];
		modules.forEach(match => {
			config.module
				.rule('sass')
				.oneOf(match)
				.use('sass-loader')
				.tap(opt => mergeSassVariables(opt, "'@/style/variables.scss'"));
			config.module
				.rule('scss')
				.oneOf(match)
				.use('sass-loader')
				.tap(opt => mergeSassVariables(opt, "'@/style/variables.scss';"));
		});
	},
	devServer: {
		overlay: false,
		disableHostCheck: true,
	},
};
