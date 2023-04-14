<template>
	<div>
		<div class="">
			
			<div class="">
				<img v-if="content" :src="content.banner" />
				<!-- <img v-if="type === 'dedicated_server'" :src="dedicatedServerBanner" /> -->
			</div>
		</div>

		<div class="py-12 px-8">
			<div class="flex justify-center items-center px-4 orange-text">
				<h3 class="text-4xl font-medium">
					<span v-if="content">{{ content.title }} - Plans & Pricing</span>
				</h3>
			</div>
				<div v-if="content" class="text-gray-700 bg-gray-200 px-4 py-8 rounded-md overflow-hidden w-full divide-y divide-gray-400 space-y-4">
					<div class="py-4">{{ content.description }}</div>
					<div v-if="content.intro" class="py-4">{{ content.intro }}</div>
				</div>
			<div class="mt-8">
				<div class="mt-8">
					<div class="mt-20 flex flex-col">
						<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
							<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
								<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
									<table class="min-w-full divide-y divide-gray-300">
										<thead class="orange-bg">
											<tr>
												<th scope="col"
													class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
													OS</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Processor Type
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Cpu Type
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Cpu Clock Speed
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Ram
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Storage
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													BandWidth
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													IPs
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Amount
												</th>
												<th scope="col"
													class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
													Order
												</th>
											</tr>
										</thead>
										<tbody class="divide-y divide-gray-700 bg-gray-900">
											<tr v-for="(row, index) in paymentMatrices" :key="index">
												<td
													class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
													<span>{{ row.os.name }}</span>
												</td>
												<td
													class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
													<span>{{ row.vps?.processorType.type }}</span>
													<span>{{ row.dedicatedServer?.processorType.type }}</span>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<span>{{ row.vps?.cpuType.name }}</span>
													<span>{{ row.dedicatedServer?.cpuType.name }}</span>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<span>{{ row.vps?.cpuClockSpeed.speed }}</span>
													<span>{{ row.dedicatedServer?.cpuClockSpeed.speed }}</span>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<span>{{ row.vps?.ramSize.size }}</span>
													<span>{{ row.dedicatedServer?.ramSize.size }}</span>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<div class="px-2">
														<span>{{ row.vps?.romType }}</span>
														<span>{{ row.dedicatedServer?.romType }}</span>
													</div>
													<div>
														<span>{{ row.vps?.romSize.size }}</span>
														<span>{{ row.dedicatedServer?.romSize.size }}</span>
													</div>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<span>{{ row.vps?.bandWidthSize.size }}</span>
													<span>{{ row.dedicatedServer?.bandWidthSize.size }}</span>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
													<span>{{ row.vps?.ips }}</span>
													<span>{{ row.dedicatedServer?.ips }}</span>
												</td>
												<td
													class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
													<span>{{ row.amount }}</span>
												</td>
												<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
													<button @click="addCartItem(row)"
														class="bg-orange-400 hover:bg-orange-500 block py-2 px-4 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
														<p class="flex items-baseline text-gray-900">
															<span
																class="ml-1 capitalize text-sm flex flex-nowrap">Order</span>
														</p>
													</button>
												</td>
											</tr>

											<!-- More people... -->
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

				</div>

			</div>

		</div>
		<div class="w-full px-8">
			<div class="py-12 space-y-10">
				<div v-if="content" class="space-y-12">

				</div>
			</div>
		</div>

	</div>
</template>
<script setup>
import { useMainStore, useMeasurementStore } from '../store';
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
import dedicatedServerBanner from '../assets/banners/dedicated-servers.png'
import vpsBanner from '../assets/banners/vps.png'
import emailBanner from '../assets/banners/email-hosting.png'

const route = useRoute()

const mainStore = useMainStore()

onMounted(() => {
	// mainStore.getPaymentPlans(route.params.type, route.params.id)
})

const type = ref(route.params.type);

const paymentMatrices = ref(computed(() => mainStore.paymentMatrices))

const content_collection = ref({
	vps: {
		type: 'vps',
		banner: vpsBanner,
		title: 'Virtual Private Server (VPS)',
		intro: 'Our dedicated servers offer a powerful, foolproof security and robust management for businesses that have outgrown shared hosting. Get beneficial server plans from Jenetworks that are inclusive of all the essential tools for monitoring, managing, controlling and protecting your dedicated server.'
	},
	dedicatedServer: {
		type: 'dedicated_server',
		banner: dedicatedServerBanner,
		title: 'Dedicated Servers',
		intro: 'Our dedicated servers offer a powerful, foolproof security and robust management for businesses that have outgrown shared hosting. Get beneficial server plans from Jenetworks that are inclusive of all the essential tools for monitoring, managing, controlling and protecting your dedicated server.',
		why: [
			{
				title: '',
				details: 'Jenetworks will empower you to make the most of your servers. Zipping speed and excellent uptime guarantee you the smooth, hassle-free operations. We have a vast, reliable and qualified support team offering 24 hour support. Get prompt, precise and practical responses to all your problems. We assure you that your business will never suffer because of any technical problem!'
			}
		]
	},
	emailHosting: {
		type: 'email_hosting',
		banner: emailBanner,
		title: 'Email Hosting',
		description: 'Host your business or personal email with Jenetworks on our secure and reliable network. Our clients can create their own brand image and email ID to best suit their preference. Choose a hosting plan that best suits your business and budget.',
		intro: '',
		features: [
			{
				title: 'Spam Filtering.',
				details: ''
			}, {
				title: 'Anti-Virus.',
				details: ''
			}, {
				title: 'SSL Security Certificate.',
				details: ''
			}, {
				title: 'Free Migration.',
				details: ''
			},
		],
		why: [{
			title: 'Protection against spam and virus.',
			details: 'Our email filtering system aid in detecting viruses and spam; and in turn securing your email.\nSpam blocking success rate stands at 99% with robust multi-language filtering of spam.'
		},
		{
			title: '24/7 support.',
			details: ''
		},
		{
			title: 'Up to 5TB of storage.',
			details: ''
		},
		{
			title: 'Flexible pricing.',
			details: ''
		}
		]
	},
});

const content = ref(computed(() => {
	if (type.value === 'vps') return content_collection.value.vps
	else if (type.value === 'dedicated_server') return content_collection.value.dedicatedServer
	else if (type.value === 'email_hosting') return content_collection.value.emailHosting
	else return null
}));

function addCartItem(item) {
	return mainStore.addCartItem(item)
}
</script>