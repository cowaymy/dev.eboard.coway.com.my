<template>
	<v-carousel
		:cycle="true"
		:show-arrows="false"
		hide-delimiter-background
		height="30px"
	>
		<v-carousel-item v-for="(slide, i) in slides" :key="i">
			<v-sheet height="100%" tile>
				<v-row class="fill-height" align="center" justify="center">
					<div class="text-h2">{{ slide }} Slide</div>
				</v-row>
			</v-sheet>
		</v-carousel-item>
	</v-carousel>
</template>
<script>
export default {
	data() {
		return {
			cycle: false,
			slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
		};
	},
};
</script>
