<template>
	<transition name="fab-transition" mode="out-in" appear>
		<Layout></Layout>
	</transition>
</template>

<script>
import Layout from './layout/index.vue';
// import UpgradeToPro from './components/comm/UpgradeToPro.vue';

export default {
	name: 'App',
	components: { Layout },
	created() {
		window.onbeforeunload = function () {
			navigator.mediaDevices.getUserMedia({ video: true }).then(md => {
				console.log(md);
				md.getTracks().forEach(t => {
					console.log(t);
					t.stop();
				});
			});
		};
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

@media all and (display-mode: standalone) {
	.pwa {
		display: block;
	}
	.browser {
		display: none;
	}
}

@media all and (display-mode: browser) {
	.pwa {
		display: none;
	}
	.browser {
		display: block;
	}
}
</style>
