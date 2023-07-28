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
	pwa: {
		iconPaths: {
			faviconSVG: 'img/newIcons/epapan-icon_592x592px.png',
			favicon16: 'img/newIcons/epapan-icon_592x592px.png',
			favicon32: 'img/newIcons/epapan-icon_592x592px.png',
			appleTouchIcon: 'img/newIcons/_epapan-icon_592x592px.png',
			maskIcon: 'img/newIcons/epapan-icon_592x592px.png',
			msTileImage: 'img/newIcons/epapan-app-icon_512x512px.png'
		},
		manifestOptions: {
			"icons": [{
				"src": "img/newIcons/epapan-icon_592x592px.png",
				"sizes": "592x592"
			}],
			"scope": "/",
			"start_url": "/",
			"related_applications": [{
				"platform": "webapp",
				"url": "https://epapan.malaysia.coway.do/manifest.json",
			}],
		}
	}
};
