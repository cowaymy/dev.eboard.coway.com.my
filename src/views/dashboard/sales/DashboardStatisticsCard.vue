<template>
	<v-card>
		<v-card-title class="align-start">
			<span class="font-weight-semibold">Statistics Card</span>
			<v-spacer></v-spacer>
			<v-btn icon small class="me-n3 mt-n2">
				<v-icon> mdi-dots-vertical </v-icon>
			</v-btn>
		</v-card-title>

		<v-card-subtitle class="mb-8 mt-n5">
			<span class="font-weight-semibold text--primary me-1"
				>Total 48.5% Growth</span
			>
			<span>😎 this month</span>
		</v-card-subtitle>

		<v-card-text>
			<v-row>
				<v-col
					v-for="data in items"
					:key="data.title"
					cols="6"
					md="2"
					class="d-flex align-center"
				>
					<v-avatar size="44" color="success" rounded class="elevation-1">
						<v-icon dark color="white" size="30"> mdi-arrow-top-right </v-icon>
					</v-avatar>
					<div class="ms-3">
						<p class="text-xl mb-0">
							{{ data.title }}
						</p>
						<h3 class="text-xl font-weight-semibold">
							{{ data.total }}
						</h3>
					</div>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	data: () => ({
		items: [
			{ icon: 'fas fa-people-carry', title: 'Net Sales', total: '22,441' },
			{ icon: 'fas fa-people-carry', title: 'Key-In', total: '33,550' },
			{ icon: 'fas fa-people-carry', title: 'Recruitment', total: '1,612' },
			{ icon: 'fas fa-people-carry', title: 'SHI', total: '80%' },
			{ icon: 'fas fa-people-carry', title: 'Active HP', total: '3,700' },
		],
	}),
};
</script>
