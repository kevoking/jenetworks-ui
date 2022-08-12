<template>
	<div class="max-w-7xl mx-auto flex justify-center items-center py-12">
		<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">

				<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
					<div class="space-y-6">
						<div severity="error" v-if="isLoggedIn === false">{{ loginMessage }}</div>
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

						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<!-- <input id="remember-me" name="remember-me" type="checkbox"
									class="h-4 w-4 text-blue-400 focus:ring-blue-500 border-gray-300 rounded" />
								<label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label> -->
							</div>

							<div class="text-sm">
								<a href="#" class="font-medium text-blue-400 hover:text-blue-500"> Forgot your
									password? </a>
							</div>
						</div>

						<div>
							<button type="submit"
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign
								in</button>
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
const loginMessage = computed(() => authStore.errorMessage)
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