<template>
	<div>
		<form @submit.prevent="submitForm">
			<div>
				<label for="userName"> id : </label>
				<input id="userName" type="text" v-model="username" />
			</div>

			<div>
				<label for="password">pw: </label>
				<input id="password" type="text" v-model="password" />
			</div>

			<button :disabled="!isFormValid" type="submit">Login</button>
			<p>{{ logMaessage }}</p>
		</form>
	</div>
</template>

<script>
import userApi from '../../api/index';
import { validEmail } from '@/utils/validation';
import bus from '../../utils/bus.js';

export default {
	data() {
		return {
			username: '',
			password: '',
			logMaessage: '',
		};
	},
	computed: {
		isFormValid() {
			var isValid = validEmail(this.username);
			if (this.password == '') isValid = false;

			return isValid;
		},
	},
	methods: {
		async submitForm() {
			try {
				const userdata = {
					username: this.username,
					password: this.password,
				};

				//start spinner
				bus.$emit('start:spinner');

				const { data } = await userApi.userLogin(userdata);

				this.logMaessage = `Welcome to ${data.user.username}`;

				this.$store.commit('setUserInfo', data.user);

				//go to main page
				this.$router.push('/smain');
			} catch (error) {
				console.log(error);
				this.logMaessage = error.response.data;
			} finally {
				this.initForm();
				bus.$emit('end:spinner');
			}
		},

		initForm() {
			this.username = '';
			this.password = '';
		},
	},
};
</script>

<style></style>
