<template>
	<v-card elevation="1">
		<v-card-title class="align-start">
			<span>Sales Ranking by HM</span>

			<v-spacer></v-spacer>

			<v-btn icon small class="me-n3 mt-n2">
				<v-icon>
					{{ icons.mdiDotsVertical }}
				</v-icon>
			</v-btn>
		</v-card-title>

		<v-card-text>
			<v-list>
				<v-list-item-group
					v-model="selectedItem"
					active-class="border"
					color="indigo"
				>
					<v-list-item
						v-for="(data, index) in salesByCountries"
						:key="data.name"
						:class="`d-flex  px-0 ${index > 0 ? 'mt-4' : ''}`"
					>
						<v-avatar
							:color="selectedItem === index ? 'error' : ''"
							size="30"
							:class="`${data.color} white--text font-weight-medium me-3`"
						>
							<span class="text-base">{{ data.abbr }}</span>
						</v-avatar>

						<div class="d-flex align-center flex-grow-1 flex-wrap">
							<div class="me-2">
								<div class="font-weight-semibold">
									<span class="text--primary text-base me-1">{{
										data.sales
									}}</span>
									<!-- 
								<v-icon
									size="20"
									:color="data.change.charAt(0) === '+' ? 'success' : 'error'"
								>
									{{
										data.change.charAt(0) === '+'
											? icons.mdiChevronUp
											: icons.mdiChevronDown
									}}
								</v-icon>

								<span
									:class="`text-xs ${
										data.change.charAt(0) === '+'
											? 'success--text'
											: 'error--text'
									}`"
									>{{ data.change.slice(1) }}</span
								> -->
								</div>

								<v-list-item-subtitle class="text-xs">
									{{ data.name }}
								</v-list-item-subtitle>
							</div>

							<v-spacer></v-spacer>

							<div>
								<h4 class="font-weight-semibold"></h4>
								<span class="text-xs">{{ data.change }} %</span>
								<v-progress-linear
									height="6"
									rounded
									class="project-progress mt-1"
									:color="resolveUserProgressVariant(data.change)"
									:value="data.change"
								></v-progress-linear>
							</div>
						</div>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-card-text>
	</v-card>
</template>

<script>
import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from '@mdi/js';

export default {
	data() {
		const selectedItem = 5;
		const salesByCountries = [
			{
				abbr: '1',
				name: '(506089)MOEY WENG HONG',
				change: '98.8',
				sales: '18,00',
				color: 'warning',
			},
			{
				abbr: '2',
				name: '(524903) MUHAMMAD ARIF BIN ROSDAN',
				change: '80',
				sales: '1,060',
				color: 'secondary',
			},
			{
				abbr: '3',
				name: '(512558)KHAIRULLNIZAM BIN SABTU',
				change: '70',
				sales: '1,000',
				color: 'secondary',
			},
			{
				abbr: '4',
				name: '(616508)LIEW LAY YEE',
				change: '68',
				sales: '980',
				color: 'secondary',
			},
			{
				abbr: '5',
				name: '(653856)NORHISHAM BIN MOHD YAACOB',
				change: '67',
				sales: '970',
				color: 'secondary',
			},
			{
				abbr: '25',
				name: '(653856)Leo Hamhyungoo',
				change: '50',
				sales: '870',
				color: 'secondary',
			},
		];

		return {
			salesByCountries,
			selectedItem,
			icons: {
				mdiDotsVertical,
				mdiChevronUp,
				mdiChevronDown,
			},
		};
	},

	methods: {
		resolveUserProgressVariant(progrss) {
			if (progrss <= 25) return 'error';
			if (progrss > 25 && progrss <= 50) return 'warning';
			if (progrss > 50 && progrss <= 75) return 'primary';
			if (progrss > 75 && progrss <= 100) return 'success';

			return 'secondary';
		},
	},
};
</script>
<style lang="scss" scoped>
.project-progress {
	min-width: 4rem;
}

.border {
	border: 2px dashed orange;
}
</style>
