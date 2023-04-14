<template>
	<div class="flex justify-center items-center py-12">
		<div class="mt-12 sm:mx-auto sm:w-full sm:max-w-lg">
			<div class="bg-white py-8 px-4 shadow-none sm:rounded-lg sm:px-10">

				<h3 class="text-xl font-bold orange-text mb-8">Register</h3>
				<Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
					<div class="space-y-6">
						<Message severity="error" v-if="errorMessage !== ''">{{ errorMessage }}</Message>
						<div v-if="errors.apiError">
							<div class="text-red-600 bg-red-50 px-4 py-2 border-l-4 border-red-600">{{ errors.apiError
							}}</div>
						</div>

						<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label for="first-name" class="block text-sm font-medium text-gray-700"> First name
								</label>
								<div class="mt-1">
									<Field id="first-name" name="firstName" type="text" autocomplete="email" required=""
										class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
									<div class="text-sm text-red-400">{{ errors.firstName }}</div>
								</div>
							</div>
							<div>
								<label for="last-name" class="block text-sm font-medium text-gray-700"> Last name
								</label>
								<div class="mt-1">
									<Field id="last-name" name="lastName" type="text" autocomplete="email" required=""
										class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
									<div class="text-sm text-red-400">{{ errors.firstName }}</div>
								</div>
							</div>
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
							<label for="phone" class="block text-sm font-medium text-gray-700"> Phone </label>
							<div class="mt-1">
								<Field id="phone" name="phone" type="tel" autocomplete="email" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.phone }}</div>
							</div>
						</div>

						<!-- Company Details -->
						<div>
							<label for="companyName" class="block text-sm font-medium text-gray-700"> Company name
							</label>
							<div class="mt-1">
								<Field id="companyName" name="companyName" type="text" autocomplete="companyName" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.companyName }}</div>
							</div>
						</div>
						<div>
							<label for="companyEmail" class="block text-sm font-medium text-gray-700"> Company Email </label>
							<div class="mt-1">
								<Field id="companyEmail" name="companyEmail" type="email" autocomplete="companyEmail" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.companyEmail }}</div>
							</div>
						</div>
						<div>
							<label for="companyTel" class="block text-sm font-medium text-gray-700"> Company Phone </label>
							<div class="mt-1">
								<Field id="companyTel" name="companyTel" type="tel" autocomplete="companyTel" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.companyTel }}</div>
							</div>
						</div>
						<div>
							<label for="postalAddress" class="block text-sm font-medium text-gray-700"> Postal Address
							</label>
							<div class="mt-1">
								<Field id="postalAddress" name="postalAddress" type="text" autocomplete="postalAddress" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.postalAddress }}</div>
							</div>
						</div>
						<div>
							<label for="physicalAddress" class="block text-sm font-medium text-gray-700"> Physical Address
							</label>
							<div class="mt-1">
								<Field id="physicalAddress" name="physicalAddress" type="text" autocomplete="physicalAddress" required=""
									class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
								<div class="text-sm text-red-400">{{ errors.physicalAddress }}</div>
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

						<div>
							<button type="submit"
								class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black orange-bg  hover:text-white focus:outline-none focus:ring-0 focus:ring-offset-2">
								Register
							</button>
						</div>

						<div class="flex items-center justify-center">

							<div class="text-sm">
								<router-link to="/login" class="font-medium blue-text hover:blue-text"> Already
									registered? Login Here</router-link>
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
	firstName: Yup.string().required('First name is required'),
	lastName: Yup.string().required('Last name is required'),
	email: Yup.string().required('Email is required'),
	phone: Yup.string().required('Phone is required'),
	companyName: Yup.string().required('Company name is required'),
	companyEmail: Yup.string().required('Company email is required'),
	companyTel: Yup.string().required('Company phone is required'),
	postalAddress: Yup.string().required('Postal address is required'),
	physicalAddress: Yup.string().required('Physical address is required'),
	password: Yup.string().required('Password is required')
});

function onSubmit(values, { setErrors }) {
	const { firstName, lastName, email, password } = values;

	const payload = {
		firstName: firstName,
		lastName: lastName,
		email: email,
		phone: phone,
		companyName: companyName,
		companyEmail: companyEmail,
		companyTel: companyTel,
		postalAddress: postalAddress,
		physicalAddress: physicalAddress,
		password: password
	}

	return authStore.signup(payload)
		.catch(error => setErrors({ apiError: error }));
}
</script>
