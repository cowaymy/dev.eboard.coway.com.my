<template>
	<v-card elevation="1" style="width: auto; height: 350px">
		<v-card-title class="align-start">
			<v-avatar :color="color" size="38" elevation="5">
				<v-icon size="24" color="white" class="rounded-0">
					{{ icon }}
				</v-icon>
			</v-avatar>

			<p class="v-card__title text-no-wrap pt-1 ps-2">
				{{ statTitle }}
			</p>
			<v-spacer></v-spacer>
		</v-card-title>

		<v-card-text>
			<v-carousel
				cycle
				height="400"
				hide-delimiter-background
				show-arrows-on-hover
			>
				<v-carousel-item v-for="(item, i) in items" :key="i">
					<img :src="item.src" style="width: 95%; height: 230px" />
				</v-carousel-item>
			</v-carousel>

			<!-- <div>
				<v-carousel
					:cycle="true"
					:interval="5000"
					show-arrows-on-hover
					hide-delimiter-background
					delimiter-icon="mdi-minus"
					height="200"
				>
					<v-carousel-item v-for="(slide, i) in series" :key="i">
						<v-sheet color="white" height="100%" tile>
							<v-timeline align-top dense :class="slide.type">
								<v-timeline-item small color="error">
									<div
										class="d-flex justify-space-between align-center flex-wrap"
									>
										<h4 class="font-weight-semibold me-1">{{ slide.curm }}</h4>
									</div>
									<p class="mb-0">
										You are
										<span class="text-xs error--text">
											Top {{ slide.curmvalue }}
										</span>
										{{ slide.curmsg }}
									</p>
								</v-timeline-item>
								<v-timeline-item small color="blue-grey">
									<div style="text-align: left">
										<h4 class="font-weight-semibold me-1">{{ slide.pevm }}</h4>
									</div>
									<p class="mb-0">
										You are
										<span class="text-xs error--text">
											Top {{ slide.pevmvalue }}</span
										>
										{{ slide.pevmsg }}
									</p>
								</v-timeline-item>
							</v-timeline>
						</v-sheet>
					</v-carousel-item>
				</v-carousel> 
			</div>-->
		</v-card-text>
	</v-card>
</template>

<script>
import { mdiDotsVertical } from '@mdi/js';

export default {
	props: {
		statTitle: { type: String, default: '' },
		icon: { type: String, default: '' },
		color: { type: String, default: '' },
		subtitle: { type: String, default: '' },
		statistics: { type: String, default: '' },
		change: { type: String, default: '' },
		series: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			mdiDotsVertical,
			items: [
				{
					src: 'https://www.coway.com.my/files/campaign/brand_renewal2023/coway-malaysia-change-your-life-mira-2023.jpg',
				},
				{
					src: 'https://www.coway.com.my/files/Products/cooling/air-conditioner/coway-malaysia-air-conditioner-cool-comfort-meets-pure-protection.jpg',
				},
				{
					src: 'https://www.coway.com.my/files/Products/massage-chair/massage-chair/coway-quiet-and-silence-massage-chair-for-a-blissful-rest.jpg',
				},

				{
					src: 'https://www.coway.com.my/img/banner/coway-run-2023-early-bird-sales.jpg',
				},
			],
		};
	},
};
</script>

<style lang="scss" scoped>
.percentage {
	top: -8px;
	position: relative;
}
.font-weight-semibold {
	font-weight: 600 !important;
}
.text-5xl {
	font-size: 3rem !important;
	line-height: 1 !important;
}

.text-3xl {
	font-size: 2.25rem !important;
	line-height: 2rem !important;
	align-items: center;
}

.text-2xl {
	font-size: 1.25rem !important;
	line-height: 2rem !important;
}
.text-base {
	font-size: 1rem !important;
	line-height: 1.5rem !important;
}

.sales {
	border: 2px outset rgb(238, 122, 27);
	background-color: rgb(255, 255, 255);
	text-align: center;
}
.join {
	border: 2px outset rgba(16, 202, 9, 0.774);
	background-color: rgb(255, 255, 255);
	text-align: center;
}

.age {
	border: 2px outset rgb(218, 241, 82);
	background-color: rgb(255, 255, 255);
	text-align: center;
}
.among {
	border: 2px outset rgb(90, 117, 241);
	background-color: rgb(255, 255, 255);
	text-align: center;
}
</style>
