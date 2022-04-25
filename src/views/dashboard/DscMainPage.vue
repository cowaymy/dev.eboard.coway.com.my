<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-alert border="left" color="black" dark elevation="1">
					<div class="nocard">Customer Service (DSC) e-TrustBoard</div>
					<div align="right">
						<digitalClock></digitalClock>
					</div>
				</v-alert>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="6">
				<v-card class="pa-2" outlined tile> aaa </v-card>
			</v-col>

			<v-col cols="6">
				<v-card class="pa-2" outlined tile> aba </v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DigitalClock from '../comm/DigitalClock.vue';

export default {
	components: {
		DigitalClock,
		//PieChar ,SideBar ,Barchart , LineChar , RaderChar, AreaChart ,PlanetChart
	},

	computed: {},

	// ...mapState({
	//     api01List:  state => state.api01,
	//     api02List:  state => state.api02,
	// })

	created() {},
};
</script>

<style scoped lang="sass">
.v-card.on-hover.them--dark
 barkground-color: rgba(#FFF,0.8)
 >.v-card__text
 color: #000
</style>

<style scoped>
.boarder {
	border-right: 1px solid grey;
}
</style>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
