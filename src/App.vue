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
</style>
