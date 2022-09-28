<template>
	<div class="flex justify-center items-center py-12">
		<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-md">
			<div class="bg-white py-8 px-4 shadow-none sm:rounded-lg sm:px-10">

				<h3 class="mb-4 text-xl font-bold orange-text">Verify</h3>

				<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
					<div class="space-y-6">
						<Message severity="error" v-if="errorMessage !== ''">{{ errorMessage }}</Message>
						<div v-if="errors.apiError">
							<div class="text-red-600 bg-red-50 px-4 py-2 border-l-4 border-red-600">{{ errors.apiError }}</div>
						</div>
						<p>Registered Successfully. Kindly Check your email for verification code.</p>
						<div>
							<label for="code" class="block text-sm font-medium text-gray-700"> Verification Code </label>
							<div class="mt-1">
								<Field id="code" name="code" type="text"
									required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.code }}</div>
							</div>
						</div>

						<div>
							<button type="submit"
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign
								in</button>
						</div>
						<!-- <div class="flex items-center justify-center">

							<div class="text-sm">
								<router-link to="/register" class="font-medium blue-text hover:blue-text"> Didn't receive verification email? Resend. </router-link>
							</div>
						</div> -->
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
const errorMessage = ref(computed(() => authStore.errorMessage))
const password = ref(computed(() => authStore.password))

const schema = Yup.object().shape({
	code: Yup.string().required('Verification code is required')
});

function onSubmit(values, { setErrors }) {
	const { code } = values;

	const payload = {
		code: code,
		password: password.value
	}

	return authStore.verifyEmail(payload)
		.catch(error => setErrors({ apiError: error }));
}
</script>