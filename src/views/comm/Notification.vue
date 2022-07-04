<template>
	<div class="TextAnime1">
		<transition-group tag="div" class="title">
			<span v-for="el in text" :key="el.id" class="item" v-text="el.text" />
		</transition-group>
	</div>
</template>

<script>
import baseApi from '../../api/index.js';

export default {
	props: {
		autoplay: Boolean,
	},
	data() {
		return {
			timer: null,
			index: 0,
			// 원본 메시지
			// 분해한 메시지
			original: [],
			messages: [],
			text: '',
		};
	},
	computed: {
		editor: {
			get() {
				return this.text.map(e => e.text).join('');
			},
			set(text) {
				this.text = this.convText(text);
			},
		},
	},
	watch: {
		autoplay(val) {
			clearTimeout(this.timer);
			if (val) {
				//this.ticker();
			}
		},
	},
	methods: {
		async callApiNootificationData() {
			try {
				const userInfo = this.$store.state.userInfo;
				userInfo.type = 'SAL';

				var dataList = [];
				this.original.pop();
				await baseApi.getNotification(userInfo).then(request =>
					request.data.dataList.forEach(function (v) {
						dataList.push(v.CONTENTS);
					}),
				);

				this.original = dataList;

				//console.log(this.original);

				this.messages = this.original.map(el => this.convText(el));
				this.text = this.messages[0];
				this.ticker();

				// var obj = [
				// 	'The ETRUST system performance is currently normal.',
				// 	'The ekeyin closing day is in 23rd this month.',
				// ];
				//return obj;
			} catch (error) {
				console.log(error);
			}
		},

		// 데모 전용 타이머
		ticker() {
			this.timer = setTimeout(() => {
				if (this.autoplay) {
					this.index =
						this.index < this.messages.length - 1 ? this.index + 1 : 0;
					this.text = this.messages[this.index];
					this.ticker();
				}
			}, 10000);
		},
		// 텍스트를 분리해서 객체로 리턴하기
		convText(text) {
			console.log(text);
			const alms = {};
			const result = text.split('').map(el => {
				alms[el] = alms[el] ? ++alms[el] : 1;
				return { id: `${el}_${alms[el]}`, text: el };
			});
			return Object.freeze(result); // 감시하지 않음
		},
	},
	created() {
		this.callApiNootificationData();

		setInterval(() => {
			this.callApiNootificationData();
		}, 30000);
	},
};
</script>

<style scoped>
.title {
	font-size: 3rem;
}
.item {
	display: inline-block;
	min-width: 0.3em;
	font-weight: bold;
	color: #ff8c00;
}
/* 트랜지션 전용 스타일 */
.v-enter-active,
.v-leave-active,
.v-move {
	transition: all 2s;
}
.v-leave-active {
	/* position: absolute; */
	transition: all 0.5s ease;
}
.v-enter,
.v-leave-to {
	opacity: 0;
	transform: translateX(30px);
}
</style>
