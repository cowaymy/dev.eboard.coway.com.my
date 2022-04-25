import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './style/styles.scss';
import ChartPlugins from './plugins/ChartPlugins.js';
import router from '@/routes/index';
import store from '@/store/index';

Vue.config.productionTip = false;

new Vue({
	vuetify,
	router,
	store,
	ChartPlugins,
	//preset,
	render: h => h(App),
}).$mount('#app');
