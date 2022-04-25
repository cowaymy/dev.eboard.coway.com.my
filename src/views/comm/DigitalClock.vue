<template>
	<div id="clock">
		<span class="date"> {{ clock.date }}</span>
		<span class="time"> {{ clock.time }} </span>
	</div>
</template>

<script>
var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

export default {
	data: () => ({
		clock: {
			date: null,
			time: null,
		},
	}),

	created() {
		setInterval(this.updateTime, 1000);
		this.updateTime();
	},

	methods: {
		updateTime() {
			var cd = new Date();

			this.clock.time =
				this.zeroPadding(cd.getHours(), 2) +
				':' +
				this.zeroPadding(cd.getMinutes(), 2) +
				':' +
				this.zeroPadding(cd.getSeconds(), 2);
			this.clock.date =
				this.zeroPadding(cd.getDate(), 2) +
				'-' +
				this.zeroPadding(cd.getMonth() + 1, 2) +
				'-' +
				this.zeroPadding(cd.getFullYear(), 4) +
				' ' +
				week[cd.getDay()];
		},

		zeroPadding(num, digit) {
			var zero = '';
			for (var i = 0; i < digit; i++) {
				zero += '0';
			}
			return (zero + num).slice(-digit);
		},
	},
};
</script>

<style>
p {
	margin: 0;
	padding: 0;
}

#clock {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #fdfdfbe5;
	text-align: center;
	position: absolute;
	left: 76%;
	top: 50%;
	transform: translate(-50%, -50%);
	color: #fdfdfbe5;
	text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(248, 248, 248, 0);
}
.time {
	letter-spacing: 0.05em;
	font-size: 26px;
	padding: 5px 0;
}
.date {
	letter-spacing: 0.1em;
	font-size: 16px;
	font-weight: bold;
}
</style>
