<template>
	<div class="flex justify-center items-center py-12">
		<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow-none sm:rounded-lg sm:px-10">

				<h3 class="mb-4 text-xl font-bold orange-text">Login</h3>

				<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
					<div class="space-y-6">
						<Message severity="error" v-if="errorMessage !== ''">{{ errorMessage }}</Message>
						<div v-if="errors.apiError">
							<div class="text-red-600 bg-red-50 px-4 py-2 border-l-4 border-red-600">{{ errors.apiError }}</div>
						</div>
						<div>
							<label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
							<div class="mt-1">
								<Field id="email" name="email" type="email" autocomplete="email" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.email }}</div>
							</div>
						</div>

						<div>
							<label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
							<div class="mt-1">
								<Field id="password" name="password" type="password" autocomplete="current-password"
									required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.password }}</div>
							</div>
						</div>

						<!-- <div class="flex items-center justify-between">
							<div class="flex items-center">
								<input id="remember-me" name="remember-me" type="checkbox"
									class="h-4 w-4 blue-text focus:ring-blue-500 border-gray-300 rounded" />
								<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
							</div>

							<div class="text-sm">
								<a href="#" class="font-medium blue-text hover:blue-text"> Forgot your
									password? </a>
							</div>
						</div> -->

						<div>
							<button type="submit"
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign
								in</button>
						</div>
						<div class="flex items-center justify-center">

							<div class="text-sm">
								<router-link to="/register" class="font-medium blue-text hover:blue-text"> Don't have an account? Register Here </router-link>
							</div>
						</div>
					</div>
				</Form>

				<div class="mt-6">

				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useAuthStore } from '../store'
import { Form, Field } from 'vee-validate'
import * as Yup from 'yup'
import { watch, computed, ref } from 'vue'

const authStore = useAuthStore();
const errorMessage = computed(() => authStore.errorMessage)
const isLoggedIn = computed(() => authStore.isLoggedIn)

const schema = Yup.object().shape({
	email: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
	const { email, password } = values;

	const payload = {
		email: email,
		password: password
	}

	return authStore.login(payload)
		.catch(error => setErrors({ apiError: error }));
}
</script>