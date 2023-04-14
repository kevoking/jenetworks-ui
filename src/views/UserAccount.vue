<template>
	<div class="py-12">
		<div class="flex justify-start items-center px-4">
			<h3 class="blue-text">
				{{ authStore.fullName }}
			</h3>
		</div>
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-8">
			<div class="px-4">
				<div class="bg-white">
					<div v-for="(item, index) in tabs" :key="index" class="block my-2">
						<button class="px-4 py-1 bg-gray-200 flex w-full justify-start rounded-l-md rounded-r-full" :class="currentTab == item ? 'orange-bg py-2 ' : ''" @click="currentTab = item">
							<span>{{item.title}}</span>
						</button>
					</div>
				</div>
			</div>
			<div class="lg:col-span-3">
				<div v-if="currentTab.name == 'account'">
					<h3 class="uppercase py-2">Profile Information</h3>

					<div>{{ authStore.userInfo["email"] }}</div>
				</div>
				<div v-if="currentTab.name == 'billing'">
					<h3 class="uppercase py-2">Billing Information</h3>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { useAuthStore } from '../store/auth.store.js';
import { ref } from 'vue';
 const authStore = useAuthStore()

 const tabs = ref([
	{
		name: 'account',
		title: 'My Account'
	},
	{
		name: 'billing',
		title: 'Billing'
	}
 ])
 const currentTab = ref(tabs.value[0])
</script>