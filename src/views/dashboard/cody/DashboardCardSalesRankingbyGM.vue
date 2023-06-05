<template>
	<v-card elevation="1">
		<v-card-title class="align-start">
			<span style="word-break: break-word">
				{{
					this.j == 'HS_RATE'? 'Com HS Rate'
						: this.j == 'MAT_SAL' ? 'HC Net Sales'
						: this.j == 'HA_NET' ? 'HA Net Sales'
						: this.j == 'TOTAL_KEYIN' ? 'Sales Keyin'
						: this.j == 'RC_RATE' ? 'RC Rate'
						: this.j == 'NET_SAL' ? 'Net Sales'
						: this.j
				}}
				Ranking by {{ this.i.Position }}
			</span>
			<v-spacer></v-spacer>
		</v-card-title>

		<v-card-text>
			<v-list>
				<v-list-item-group color="indigo">
					<v-list-item
					    v-for="(data, index) in this.i.Mem_data"
						:class="`d-flex align-center px-0 ${index > 0 ? 'mt-4' : ''} ${data.selected == 0 ? 'border' : ''}`"
						:style="`background-color: ${
								data.selected == 0 ? '#f2f1f3' : 'white'} !important;`"
						:key="data.name"
						color="#fff"
						@click="$event =>fetchCurrentMemberInfo(data, index)"
					>


						<v-avatar
							:color="data.selected == 0 ? 'error' : ''"
							size="30"
							:class="`white text font-weight-medium me-3`"
							:style="`background-color: ${
								index == 0 ? '#ffb400' : index == 5 ? '#ff5d5d' : 'gray'
							} !important; color: #fff;`"
						>
							<span class="text-base">{{ data.Rank_number }}</span>
						</v-avatar>

						<div class="d-flex align-center flex-grow-1 flex-wrap">
							<div class="me-2">
								<div class="font-weight-semibold">
									<span class="text--primary text-xl me-1">{{
										number_format(data.Total_figure)
									}}</span>
								</div>
								<v-list-item-subtitle
									class="font-weight-semibold text-xs"
									style="white-space: break-spaces"
									v-if="data.Ranking_level != '1'"
								>
									({{ data.Org_code }}) {{ data.Ranking_membername }} |
									{{ data.Branch }}
								</v-list-item-subtitle>
								<v-list-item-subtitle
									class="font-weight-semibold text-xs"
									style="white-space: break-spaces"
									v-if="data.Ranking_level == '1'"
								>
									({{ data.Org_code }}) {{ data.Ranking_membername }}
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
import number_format from '../../../utils/number_format.js';
import codyApi from '../../../api/codyApi';
import bus from '../../../utils/bus.js';
export default {
	props: ['i','j','getFilterCurRankingData','getCategoryIndex'],
	created() {
		var cData = [];
		this.salesByCountries = cData;
	},
	data() {
		const salesByCountries = [];
		return {
			salesByCountries,
			icons: {
				mdiDotsVertical,
				mdiChevronUp,
				mdiChevronDown,
			},
		};
	},

	methods: {
		number_format,
		fetchCurrentMemberInfo(data, index) {
			let ranking_lvl = data.Ranking_level;
			let mem_id = data.mem_id;
			let category = this.j;
			try {
				bus.$emit('start:spinner');
				if(Number(data.Ranking_level) !=4){
					const param = {ranking_lvl,mem_id,category};
					codyApi.getFilterCurRankingData(param)
					.then(r => {
						this.getFilterCurRankingData(r);
						this.getCategoryIndex(category, ranking_lvl, index)
					});
				}
			} catch (error) {
				console.log(error);
				this.sheet = true;
				this.logMaessage = error.message;
			} finally {
				bus.$emit('end:spinner');
			}
		}
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
