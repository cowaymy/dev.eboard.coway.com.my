<template>
	<section id="knowledge-base">
		<v-alert border="left" color="black" dark elevation="1">
			<div class="nocard">admin e-TrustBoard</div>

			<div align="right">
				<DigitalClock />
			</div>
		</v-alert>

		<!-- seach banner  -->
		<v-card
			flat
			class="knowledge-base-bg d-flex align-center justify-center text-center mb-7"
		>
			<v-card-text>
				<!-- <p class="kb-title text-2xl font-weight-semibold primary--text mb-2"></p>
					Hello, how can we help?
				</p>
				<p class="mb-7">
					or choose a category to quickly find the help you need

				</p> -->

				<v-form class="kb-search-input mx-auto">
					<v-text-field
						v-model="knowledgeBaseSearchQuery"
						id="knowledgeBaseSearchQuery"
						outlined
						placeholder="Ask a question...."
						hide-details
						class="kb-search-input"
					>
						<template #prepend-inner>
							<v-icon size="23" class="mx-1">
								{{ icons.mdiMagnify }}
							</v-icon>
						</template>
					</v-text-field>
				</v-form>
			</v-card-text>
		</v-card>

		<!-- kb search content -->
		<div id="knowledge-base-content">
			<v-row>
				<v-col
					v-for="item in filteredNames"
					:key="item.character"
					md="4"
					sm="6"
					cols="12"
				>
					<v-card
						class="reset-vcard"
						@click.native="$router.push(item.category)"
					>
						<!-- <div class="kb-character-wrapper">
						
						</div> -->

						<template v-if="item.category == '/salesMainSGM'">
							<StatisticsCardHQMain></StatisticsCardHQMain>
						</template>
						<template v-if="item.category == '/codyMain'">
							<StatisticsCardHQMain_Cody></StatisticsCardHQMain_Cody>
						</template>

						<v-card-title
							class="justify-center text-2xl font-weight-semibold text--primary"
						>
							{{ item.title }}
						</v-card-title>
						<v-card-title>{{ item.desc }}</v-card-title>
					</v-card>
				</v-col>

				<!-- no result found -->
				<v-col v-show="!filteredKB.length" cols="12" class="text-center">
					<h4 class="mt-4">Search result not found!!</h4>
				</v-col>
			</v-row>
		</div>

		<div><LinkToSSO></LinkToSSO></div>
	</section>
</template>

<script>
/* eslint-disable implicit-arrow-linebreak */
import { mdiMagnify } from '@mdi/js';

//import LinkToBottomButtonVue from '../comm/LinkToBottomButton.vue';
import StatisticsCardHQMain from '../../components/statistics-card/StatisticsCardHQMain_Salse.vue';
import StatisticsCardHQMain_Cody from '../../components/statistics-card/StatisticsCardHQMain_Cody.vue';
import LinkToSSO from '../../components/comm/LinkToSSO';

import DigitalClock from '../../views/comm/DigitalClock.vue';

//import VueQrcode from 'vue-qrcode';

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default {
	name: 'MyIframe',
	components: {
		//LinkToBottomButtonVue,
		StatisticsCardHQMain,
		StatisticsCardHQMain_Cody,
		LinkToSSO,
		DigitalClock,
	},
	data() {
		const knowledgeBaseSearchQuery = '';

		return {
			knowledgeBaseSearchQuery,

			myIframe: null,
			src: 'https://jennifer.my.coway.com/login/sso?id=sales&password=sales&redirect=/userdefine/dashboard?key=658cf2bf-d5f4-4abe-99f8-d95be4cc6f8b',
			//src: 'https://jennifer.my.coway.com/login/redirect?token=zoFjTOiM3HZ',
			//src: 'http://10.101.1.138:8900/login/sso?id=sales&password=sales&redirect?token=ZGn6xuRsC31',
			filteredKB: [],
			icons: { mdiMagnify },
			attend: {
				date: null,
				time: null,
				branchName: this.$store.state.userInfo.branchName,
				mainDeptName: this.$store.state.userInfo.mainDeptName,
				qrsize: 300,
				qrdata: null,
				userName: this.userName,
			},
		};
	},

	created() {
		this.filteredKB = this.fun_kbContentData();
	},
	computed: {
		filteredNames() {
			return this.filteredKB.filter(
				item =>
					// eslint-disable-next-line operator-linebreak
					item.title
						.toLowerCase()
						.includes(this.knowledgeBaseSearchQuery.toLowerCase()) ||
					item.desc
						.toLowerCase()
						.includes(this.knowledgeBaseSearchQuery.toLowerCase()),
			);
		},
	},

	mounted() {},
	methods: {
		fun_filteredKB() {
			const knowledgeBaseSearchQueryLower =
				this.knowledgeBaseSearchQuery.toLowerCase();

			return this.fun_kbContentData().filter(
				item =>
					// eslint-disable-next-line operator-linebreak
					item.title.toLowerCase().includes(knowledgeBaseSearchQueryLower) ||
					item.desc.toLowerCase().includes(knowledgeBaseSearchQueryLower),
			);
		},

		fun_kbContentData() {
			return [
				{
					//character: '',
					category: '/salesMainSGM',
					//characterSize: '139',
					title: 'Sales Dashboard',
					desc: '',
				},

				{
					//character: '',
					category: '/codyMain',
					//characterSize: '139',
					title: 'Cody Dashboard',
					desc: '',
				},
			];
		},
	},
};
</script>

<style lang="scss">
//@import '@core/preset/preset/pages/knowledge-base.scss';

#knowledge-base {
	// .knowledge-base-bg {
	// 	padding: 5.5rem;
	// 	background-image: url('../../../../assets/images/misc/knowledge-base-bg-light.png');
	// 	background-size: cover;
	// }

	// search input
	.kb-search-input {
		max-width: 28.125rem;
		background-color: map-get($shades, 'white');
		border-radius: 5px;
	}

	// kb-character-wrapper bg
	.kb-character-wrapper {
		position: relative;
		height: 12.5rem;
		background: #fafafa;
		padding-top: 1.438rem;

		.v-image {
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}
	}

	// category
	.kbc-title {
		background-color: rgba(94, 86, 105, 0.08);
	}

	// knowledge base category link color changed
	.kb-questions {
		.kb-question {
			&:hover,
			&:focus {
				span {
					color: var(--v-primary-base) !important;
				}
			}
		}
	}

	//
	.reset-vcard {
		background-color: transparent;
		box-shadow: 0 0 0 0 rgb(239 235 243 / 10%);
		cursor: pointer;
	}
}

#camera {
	text-align: center;
	color: #2c3e50;
}
#video {
	background-color: #000000;
}
#canvas {
	display: none;
}
li {
	display: inline;
	padding: 5px;
}
.validation-success,
.validation-failure,
.validation-pending {
	position: absolute;
	width: 100%;
	height: 100%;

	background-color: rgba(255, 255, 255, 0.8);
	text-align: center;
	font-weight: bold;
	font-size: 1.4rem;
	padding: 10px;

	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
}
.validation-success {
	color: green;
}
.validation-failure {
	color: red;
}
</style>
