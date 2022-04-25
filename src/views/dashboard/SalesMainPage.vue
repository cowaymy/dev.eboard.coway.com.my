<template>
	<v-container>
		<v-row>
			<v-col cols="12">
				<v-alert border="left" color="black" dark elevation="1">
					<div class="nocard">Sales e-TrustBoard</div>
					<div align="right">
						<digitalClock></digitalClock>
					</div>
				</v-alert>
			</v-col>
		</v-row>

		<v-row>
			<v-col cols="6">
				<v-card class="mx-auto" height="250">
					<v-carousel
						:cycle="true"
						:interval="3000"
						show-arrows-on-hover
						hide-delimiter-background
						delimiter-icon="mdi-minus"
						height="200"
					>
						<v-carousel-item v-for="(slide, i) in slides" :key="i">
							<v-sheet :color="colors[i]" height="100%" tile>
								<v-row class="fill-height" align="center" justify="center">
									<div class="text-h2">{{ slide }} Slide</div>
								</v-row>
							</v-sheet>
						</v-carousel-item>
					</v-carousel>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="block " text> Find more </v-btn>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="3">
				<v-card class="mx-auto" height="250">
					<v-list-item three-line>
						<v-list-item-content>
							<div class="text-overline mb-4">OVERLINE</div>
							<v-list-item-title class="text-h5 mb-1">
								Headline 5
							</v-list-item-title>
							<v-list-item-subtitle>
								Greyhound divisely hello coldly fonwderfully
							</v-list-item-subtitle>
							<v-list-item-action>
								<div class="illustrator-img">
									<div
										class="v-image v-responsive theme--light"
										style="width: 110px"
									>
										<div
											class="v-responsive__sizer"
											style="padding-bottom: 160%"
										></div>
										<div
											class="v-image__image v-image__image--cover"
											style="
												background-image: url('https://themeselection.com/demo/materio-vuetify-vuejs-laravel-admin-template/demo-1/images/avatar-9.png?99c2c0591499dad9b6a88add07e37d9b');
												background-position: center center;
											"
										></div>
									</div>
								</div>
							</v-list-item-action>
						</v-list-item-content>
					</v-list-item>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="block " text> Find more </v-btn>
					</v-card-actions>
				</v-card>
				<!-- <v-card class="mx-auto">
					<v-card-title class="d-flex justify-space-between align-center">
						<div>Congratulations Leo! 🥳</div>
					</v-card-title>

					<v-card-subtitle>
						<div>
							<span> You have done </span
							><span
								data-v-d196feac=""
								class="text--primary font-weight-semibold"
								>72%</span
							><span
								data-v-d196feac=""
								class="text--primary font-weight-semibold"
							>
								🤩 more sales today.</span
							><span data-v-d196feac="">
								Check your new raising badge in your profile.</span
							>
						</div>
					</v-card-subtitle>
					<div data-v-8648a022="" class="illustrator-img">
						<div class="v-image v-responsive theme--light" style="width: 86px">
							<div
								class="v-responsive__sizer"
								style="padding-bottom: 204.651%"
							></div>
							<div
								class="v-image__image v-image__image--cover"
								style="
									background-image: url('https://themeselection.com/demo/materio-vuetify-vuejs-admin-template/demo-1/img/10.c8088c90.png');
									background-position: center center;
								"
							></div>
						</div>
					</div>
				</v-card> -->
				<!-- <template>
						<canvas
							id="saleschart1"
							width="400"
							height="350"
							ref="saleschart1"
						></canvas>
					</template> -->
			</v-col>
			<v-col cols="3">
				<template>
					<v-card class="mx-auto" m>
						<button @click="shuffle">shuffle</button>

						<v-list tag="ul" name="fade" class="container">
							<v-list-item v-for="item in listItems" :key="item.title">
								<v-list-item-icon>
									<v-icon v-if="item.name" color="pink"> mdi-star </v-icon>
								</v-list-item-icon>

								<v-list-item-content>
									<v-list-item-title v-text="item.id"></v-list-item-title>
								</v-list-item-content>

								<v-list-item-avatar>
									<v-img :src="item.avatar"></v-img>
								</v-list-item-avatar>
							</v-list-item>
						</v-list>
					</v-card>
				</template>
			</v-col>
		</v-row>

		<v-row>
			<v-col v-for="(item, i) in api02List" :key="i">
				<v-alert border="left" color="black" dark elevation="1">
					{{ item.title }}
				</v-alert>
				<v-card color="snow lighten-3" elevation="17">
					<v-toolbar flat color="rgba(0,0,0,0)" dense class="mt-n5">
						<small>Target : </small>
						<v-spacer></v-spacer>
						<v-toolbar-title> {{ item.Target }}</v-toolbar-title>
					</v-toolbar>
					<v-divider class="mx-4"></v-divider>
					<v-card-text class="d-flex justify-space-between align-center">
						<div class="">
							<small>updated 4 minutes ago</small>
						</div>
						<v-btn :color="item.color" elevation="12" x-large>
							<div class="nocard">{{ item.Result }}</div>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>

		<v-row>
			<v-col v-for="(item, i) in api03List" :key="i">
				<v-alert border="left" color="black" dark elevation="1">
					{{ item.title }}
				</v-alert>
				<v-card color="snow lighten-3" elevation="17">
					<v-toolbar flat color="rgba(0,0,0,0)" dense class="mt-n5">
						<small>Target : </small>
						<v-spacer></v-spacer>
						<v-toolbar-title> {{ item.Target }}</v-toolbar-title>
					</v-toolbar>
					<v-divider class="mx-4"></v-divider>
					<v-card-text class="d-flex justify-space-between align-center">
						<div class="">
							<small>updated 4 minutes ago</small>
						</div>
						<v-btn :color="item.color" elevation="12" x-large>
							<div class="nocard">{{ item.Result }}</div>
						</v-btn>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import DigitalClock from '../comm/DigitalClock.vue';
import Chart from 'chart.js';
import { shuffle } from 'lodash-es';

export default {
	data() {
		return {
			api02List: [
				{
					title: 'Key In',
					color: 'error',
					Target: '9,000',
					Result: '18,000',
				},
				{
					title: 'Net Sales',
					color: 'primary',
					Target: '3,700',
					Result: '400',
				},
				{
					title: 'Active HP',
					color: 'primary',
					Target: '1,612',
					Result: '400',
				},
				{
					title: 'Recruitment',
					color: 'primary',
					Target: '1,612',
					Result: '400',
				},
				{ title: 'SHI', color: 'primary', Target: '80%', Result: '65%' },
			],

			api03List: [
				{
					title: 'Key In',
					color: 'error',
					Target: '9,000',
					Result: '18,000',
				},
				{
					title: 'Net Sales',
					color: 'primary',
					Target: '3,700',
					Result: '400',
				},
				{
					title: 'Active HP',
					color: 'primary',
					Target: '1,612',
					Result: '400',
				},
				{
					title: 'Recruitment',
					color: 'primary',
					Target: '1,612',
					Result: '400',
				},
				{ title: 'SHI', color: 'primary', Target: '80%', Result: '65%' },
			],

			colors: [
				'green',
				'secondary',
				'yellow darken-4',
				'red lighten-2',
				'orange darken-1',
			],
			images: [
				'https://cdn.vuetifyjs.com/images/john.png',
				'https://i.pravatar.cc/64',
				'yellow darken-4',
				'red lighten-2',
				'orange darken-1',
			],
			cycle: true,
			slides: [
				'https://cdn.vuetifyjs.com/images/john.png',
				'https://i.pravatar.cc/64',
				'Third',
				'Fourth',
				'Fifth',
			],

			listItems: getListItems(),
		};
	},

	created() {},

	mounted() {
		const ctx = document.getElementById('saleschart1');
		const myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
				datasets: [
					{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3],
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(255, 206, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(255, 159, 64, 0.2)',
						],
						borderColor: [
							'rgba(255, 99, 132, 1)',
							'rgba(54, 162, 235, 1)',
							'rgba(255, 206, 86, 1)',
							'rgba(75, 192, 192, 1)',
							'rgba(153, 102, 255, 1)',
							'rgba(255, 159, 64, 1)',
						],
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	},

	components: {
		DigitalClock,
		//PieChar ,SideBar ,Barchart , LineChar , RaderChar, AreaChart ,PlanetChart
	},

	methods: {
		shuffle() {
			//this.itemArray = shuffle(this.itemArray);
			//this.listItems = getListItems();

			//this.listItems = shuffle(this.listItems);

			console.log(sortObjects(this.listItems));
			this.listItems = sortObjects(this.listItems);
		},
	},
	computed: {},

	// ...mapState({
	//     api01List:  state => state.api01,
	//     api02List:  state => state.api02,
	// })
};

const getListItems = () => [
	{ id: 1, name: 'Leo', avatar: 'https://cdn.vuetifyjs.com/images/john.png' },
	{
		id: 3,
		name: 'kenny3',
		avatar: 'https://cdn.vuetifyjs.com/images/john.png',
	},
	{ id: 2, name: 'jack', avatar: 'https://cdn.vuetifyjs.com/images/jack.png' },
	{
		id: 4,
		name: 'kenny4',
		avatar: 'https://cdn.vuetifyjs.com/images/john.png',
	},
	{
		id: 6,
		name: 'kenny6',
		avatar: 'https://cdn.vuetifyjs.com/images/john.png',
	},
];

function compareIds(a, b) {
	if (a.id < b.id) return -1;
	if (a.id > b.id) return 1;
	return 0;
}

function sortObjects(obj) {
	//Default sort
	obj.sort();
	//Sort using the compareIds function
	return obj.sort(compareIds);
}
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

.container {
	position: relative;
	padding: 0;
}

.item {
	width: 100%;
	height: 10px;
	background-color: #ac2020;
	border: 1px solid #666666;
	box-sizing: border-box;
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
	position: absolute;
}

element.style {
	background-image: url(https://themeselection.com/demo/materio-vuetify-vuejs-admin-template/demo-1/img/10.c8088c90.png);
	background-position: center center;
}

.illustrator-img {
	bottom: 0;
	position: absolute;
	right: 5%;
}
.v-image__image--cover {
	background-size: cover;
}

.v-image__image {
	background-repeat: no-repeat;
}

.v-image__image,
.v-image__placeholder {
	z-index: -1;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.spacer {
	flex-grow: 1 !important;
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
