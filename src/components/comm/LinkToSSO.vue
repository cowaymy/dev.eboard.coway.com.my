<template>
	<v-menu
		top
		offset-y
		content-class="elevation-9"
		open-on-hover
		close-delay="750"
		:close-on-content-click="false"
		eager
		transition="slide-y-reverse-transition"
		left
		nudge-top="15"
	>
		<template #activator="{ on, attrs }">
			<v-btn
				color="info"
				class="product-upgrade-to-pro"
				target="_blank"
				rel="nofollow"
				v-bind="attrs"
				v-on="on"
			>
				Links
			</v-btn>
		</template>

		<v-card class="elevation-0" max-width="400">
			<v-img max-width="400" eager alt="materio-pro-banner"></v-img>
			<v-card-title class="font-weight-semibold"> Links </v-card-title>
			<v-card-actions>
				<v-btn
					class="ma-2"
					:loading="loading"
					:disabled="loading"
					color="info"
					@click="loader = 'loading'"
				>
					e-Trust
					<v-icon right dark> mdi-cloud-upload </v-icon>
				</v-btn>

				<v-btn
					class="ma-2"
					:loading="loading"
					:disabled="loading"
					color="error"
					@click="loader = 'loading'"
				>
					Trust-Desk
				</v-btn>
				<v-btn
					class="ma-2"
					:loading="loading"
					:disabled="loading"
					color="primary"
					@click="loader = 'loading'"
				>
					GL-Potal
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-menu>
</template>

<script>
export default {
	data() {
		return {
			loader: null,
			loading: false,
			loading2: false,
			loading3: false,
			loading4: false,
			loading5: false,
		};
	},
	watch: {
		loader() {
			const l = this.loader;
			this[l] = !this[l];

			setTimeout(() => (this[l] = false), 3000);

			this.loader = null;
		},
	},
};
</script>

<style lang="scss" scoped>
.product-upgrade-to-pro {
	z-index: 4;
	bottom: 5%;
	right: 48px;
	position: fixed;
	.v-application &.v-btn.v-btn--is-elevated {
		box-shadow: 0 1px 20px 1px #80d5f7 !important;
		&:hover {
			box-shadow: none !important;
		}
	}
}

.custom-loader {
	animation: loader 1s infinite;
	display: flex;
}
@-moz-keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
@-webkit-keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
@-o-keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
@keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>
