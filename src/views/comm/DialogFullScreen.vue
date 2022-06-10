<template>
	<v-dialog
		v-model="isDialogVisible"
		fullscreen
		hide-overlay
		transition="dialog-bottom-transition"
	>
		<v-card tile>
			<v-toolbar dark color="primary">
				<v-btn icon dark @click="isDialogVisible = false">
					<v-icon>{{ icons.mdiClose }}</v-icon>
				</v-btn>
				<v-toolbar-title>Find out More</v-toolbar-title>
				<v-spacer></v-spacer>
				<v-toolbar-items>
					<v-btn dark text class="my-auto" @click="isDialogVisible = false">
						Close
					</v-btn>
				</v-toolbar-items>
			</v-toolbar>

			<v-row> </v-row>
		</v-card>
	</v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js';

export default {
	components: {},
	data() {
		const isDialogVisible = false;
		const notifications = false;
		const sound = true;
		const widgets = false;

		return {
			isDialogVisible,
			notifications,
			sound,
			widgets,

			// icon
			icons: {
				mdiClose,
			},
		};
	},
};
</script>
