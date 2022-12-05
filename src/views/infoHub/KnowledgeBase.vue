<template>
	<section id="knowledge-base">
		<!-- seach banner  -->
		<v-card
			flat
			class="knowledge-base-bg d-flex align-center justify-center text-center mb-7"
		>
			<v-card-text>
				<p class="kb-title text-2xl font-weight-semibold primary--text mb-2">
					Hello, how can we help?
				</p>
				<p class="mb-7">
					or choose a category to quickly find the help you need
				</p>

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
//import { computed, ref } from '@vue/composition-api';
//import { computed, ref } from '@vue/composition-api';

//import LinkToBottomButtonVue from '../comm/LinkToBottomButton.vue';
import StatisticsCardHQMain from '../../components/statistics-card/StatisticsCardHQMain_Salse.vue';
import StatisticsCardHQMain_Cody from '../../components/statistics-card/StatisticsCardHQMain_Cody.vue';
import LinkToSSO from '../../components/comm/LinkToSSO';
export default {
	components: {
		//LinkToBottomButtonVue,
		StatisticsCardHQMain,
		StatisticsCardHQMain_Cody,
		LinkToSSO,
	},
	data() {
		const knowledgeBaseSearchQuery = '';
		return {
			knowledgeBaseSearchQuery,
			filteredKB: [],
			icons: { mdiMagnify },
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
</style>
