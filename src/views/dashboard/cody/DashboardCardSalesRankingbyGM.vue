<template>
	<v-card elevation="1">
		<v-card-title class="align-start">
			<span style="word-break: break-word;"> 
			{{this.i.Type == 'COM_HS' ? 'Complete HS Rate' :this.i.Type == 'MAT_SAL' ? 'Home Care Net Sales' : this.i.Type == 'HA_NET' ? 'Home Appliance Net Sales' 
			: this.i.Type == 'TOTAL_KEYIN' ? 'Total Sales Keyin' : this.i.Type == 'RC_RATE' ? 'RC Rate' : this.i.Type == 'NET_SAL' ? 'Net Sales'
			: this.i.Type}} Ranking by {{ this.i.Position }}
			</span>
			<v-spacer></v-spacer>
		</v-card-title>

		<v-card-text>
			<v-list>
				<v-list-item-group
					v-model="selectedItem"
					active-class="border"
					color="indigo"
				>
					<v-list-item
						v-for="(data, index) in this.i.Mem_data"
						:key="data.name"
						:class="`d-flex align-center px-0 ${index > 0 ? 'mt-4' : ''}`"

					>

						<v-avatar
							:color="selectedItem === index ? 'error' : ''"
							size="30"
							:class="`white text font-weight-medium me-3`"
							:style="`background-color: ${index == 0 ? '#ffb400' : index == 5 ? '#ff5d5d' : 'gray'} !important; color: #fff;`"
						>
							<span class="text-base">{{ data.Rank_number }}</span>
						</v-avatar> 

						<div class="d-flex align-center flex-grow-1 flex-wrap">
							<div class="me-2">
								<div class="font-weight-semibold">
									<span class="text--primary text-xl me-1">{{
										data.Total_Figure
									}}</span>
								</div>

								 <v-list-item-subtitle class="font-weight-semibold text-xs" style="white-space: break-spaces;">
									({{ data.Ranking_member }})  {{ data.Ranking_Membername }}
								</v-list-item-subtitle> 
							</div>

							<v-spacer></v-spacer>
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
	props: ['i'],
	created() {
		console.log(this.i)
		var cData = [];
		this.salesByCountries = cData;
	},

	data() {
		const selectedItem = -1;
		const salesByCountries = [];

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
	border: 6px dashed orange;
}
</style>
