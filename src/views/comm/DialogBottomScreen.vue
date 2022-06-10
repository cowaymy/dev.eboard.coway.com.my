<template>
	<v-row justify="space-around">
		<v-col cols="auto">
			<v-dialog transition="dialog-bottom-transition" max-width="600">
				<template v-slot:activator="{ on, attrs }">
					<v-btn color="primary" v-bind="attrs" v-on="on">{{
						buttonTitle
					}}</v-btn>
				</template>
				<template v-slot:default="dialog">
					<v-card>
						<v-toolbar color="primary" dark>{{ statTitle }}</v-toolbar>

						<v-card-text>
							<div>
								<v-card-text>
									<v-row>
										<v-card elevation="13">
											<v-card-title>
												<v-spacer></v-spacer>
												<v-text-field
													v-model="search"
													append-icon="mdi-magnify"
													label="Search"
													single-line
													hide-details
													dense
													outlined
												></v-text-field>
											</v-card-title>
											<v-data-table
												:headers="headers"
												:items="desserts"
												:search="search"
												class="table-kitchen-sink"
											></v-data-table>
										</v-card>
									</v-row>
								</v-card-text>
							</div>
						</v-card-text>
						<v-card-actions>
							<v-btn text @click="dialog.value = false" color="primary"
								>Close</v-btn
							>
						</v-card-actions>
					</v-card>
				</template>
			</v-dialog>
		</v-col>
	</v-row>
</template>
<script>
import baseApi from '../../api/index.js';
import { mdiMagnify } from '@mdi/js';

export default {
	props: {
		statTitle: { type: String, default: '' },
		buttonTitle: { type: String, default: '' },
	},

	methods: {
		async callApiBestRecordList() {
			try {
				const userInfo = this.$store.state.userInfo;
				return await baseApi.getBestRecordList(userInfo);
			} catch (error) {
				console.log(error);
			}
		},
	},

	created() {
		this.callApiBestRecordList().then(request => {
			this.desserts = request.data.dataList;
		});
	},

	data() {
		return {
			page: 1,
			pageCount: 5,
			mdiMagnify,
			search: '',
			headers: [
				{
					text: 'No',
					align: 'start',
					sortable: true,
					value: 'No',
				},
				{ text: 'Year', value: 'YEAR' },
				{ text: 'Month', value: 'MONTH' },
				{ text: 'Net Sales', value: 'BEST_RECORD' },
			],
			desserts: [],
		};
	},
};
</script>

<style lang="scss" scoped>
.table-kitchen-sink ::v-deep {
	.v-data-table-header {
		white-space: nowrap;
	}
}
</style>
