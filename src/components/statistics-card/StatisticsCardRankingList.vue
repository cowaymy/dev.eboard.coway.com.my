<template>
	<v-card elevation="1">
		<v-card-title class="align-start">
			<span>{{ statTitle }}</span>

			<v-spacer></v-spacer>

			<v-btn icon small class="me-n3 mt-n2">
				<v-icon>
					{{ icon }}
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
						v-for="(data, index) in series"
						:key="data.name"
						:class="`d-flex align-center px-0 ${index > 0 ? 'mt-4' : ''}`"
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
//import { mdiDotsVertical, mdiChevronUp, mdiChevronDown } from '@mdi/js';
import { computed } from '@vue/composition-api';

export default {
	props: {
		statTitle: { type: String, default: '' },
		icon: { type: String, default: '' },
		color: { type: String, default: '' },
		subtitle: { type: String, default: '' },
		statistics: { type: String, default: '' },
		change: { type: String, default: '' },
		selectedItem: { type: String, default: '' },
		series: {
			type: Array,
			default: () => [],
		},
	},
	setup(props) {
		const selectedIdxComputed = computed(() => {
			return props.selectedItem;
		});

		return {
			selectedIdxComputed,
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
