<template>
	<div style="position: relative">
		<v-row>

			<v-col cols="12" sm="6" md="3" v-for="i in Personal_Data.Personal_Data_Display">
				<StatisticsCardVertical v-bind="i" /> </StatisticsCardVertical>
			</v-col>
			<template v-if="true">
				<v-dialog
					v-model="isDialogVisible"
					fullscreen
					hide-overlay
					transition="dialog-bottom-transition"
				>
					<template #activator="{ on, attrs }">
						<v-fab-transition>
							<v-btn
								color="error"
								v-bind="attrs"
								v-on="on"
								dark
								absolute
								bottom
								right
								fab
							>
								<v-icon>mdi-plus</v-icon>
							</v-btn>
						</v-fab-transition>
					</template>
					<v-card tile>
						<v-toolbar dark color="primary">
							<v-btn icon dark @click="isDialogVisible = false">
								<v-icon>{{ icons.mdiClose }}</v-icon>
							</v-btn>
							<v-toolbar-title>Find out More</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-toolbar-items>
								<v-btn
									dark
									text
									class="my-auto"
									@click="isDialogVisible = false"
								>
									Close
								</v-btn>
							</v-toolbar-items>
						</v-toolbar>

						<v-row>
							<v-col cols="12"><p></p></v-col>
							<v-col cols="12" sm="6" md="3" v-for="i in Personal_Data.Personal_Data_Option">
								<StatisticsCardVertical v-bind="i" /> </StatisticsCardVertical>
							</v-col>
						</v-row>
					</v-card>
				</v-dialog>
			</template>

			<template v-else> </template>
		</v-row>
	</div>
</template>

<script>
import StatisticsCardVertical from '../../../components/statistics-card/StatisticsCardVerticalForCody.vue';
import {
	mdiClipboardEditOutline,
	mdiCheckboxMultipleMarkedOutline,
	mdiAccountCheckOutline,
	mdiClose,
} from '@mdi/js';

export default {
	components: {
		StatisticsCardVertical
	},
	props: {
		eKeyInData: { type: Object },
		NetSalesData: { type: Object },
		ActiveHpData: { type: Object },
		SHIData: { type: Object },
		KeyInOptions: { type: Object },
		NetSalesOptions: { type: Object },
		ActiveHpOptions: { type: Object },
		RejoinOptions: { type: Object },
		Personal_Data: {Personal_Data_Display: [],Personal_Data_Option: []},
	},
	data() {
		const isDialogVisible = false;

		return {
			isDialogVisible,
			icons: {
				mdiClose,
			},
		};
	},
};
</script>
