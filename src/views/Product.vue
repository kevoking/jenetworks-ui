<template>
	<div class="">
		<div class="">
			<div class="">
				<img v-if="content" :src="content.banner" />
			</div>
		</div>

		<div class="py-12 px-12">
			<div class="flex flex-col justify-center items-center space-y-4">
				<h3 class="text-4xl font-medium orange-text">
					<span v-if="content">
						{{ content.title }}
					</span>
				</h3>
				<div v-if="content" class="text-gray-700 bg-gray-200 px-4 py-8 rounded-md overflow-hidden w-full divide-y divide-gray-400 space-y-4">
					<div class="py-4">{{ content.description }}</div>
					<div v-if="content.intro" class="py-4">{{ content.intro }}</div>
				</div>
			</div>
			<div class="mt-8" v-if="tableData.length > 0">
				<div class="mt-20 flex flex-col">
					<div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
							<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
								<table v-if="type === 'email-hosting'" class="min-w-full divide-y divide-gray-300">
									<thead class="orange-bg">
										<tr>
											<th scope="col"
												class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
												Plan</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
												IDs
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Space
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
												Webmail
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order
											</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-300 bg-gray-200">
										<tr v-for="(row, index) in tableData" :key="index">
											<td
												class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6">
												{{ row.emailPlan.name }}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{
													row.emailIds.ids
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
												{{ row.emailSpace.totalSpace }}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ row.webmail
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-black">
												<router-link v-if="content"
													:to="'/product-plans/' + row.id + '/' + content.type"
													class="orange-bg py-1 px-4 my-1 text-sm border border-transparent rounded-md sahdow-xl shadow-black text-center">
													Buy
												</router-link>
											</td>
										</tr>

										<!-- More people... -->
									</tbody>
								</table>
								<table v-else-if="type === 'shared-hosting'" class="min-w-full divide-y divide-gray-300">
									<thead class="orange-bg">
										<tr>
											<th scope="col"
												class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
												Cpanel</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
												Hosted Domain
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Disk Space
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
												BandWidth
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order
											</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-300 bg-gray-200">
										<tr v-for="(row, index) in tableData" :key="index">
											<td
												class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6">
												{{ row.controlPanel }}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{
													row.hostedDomain
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
												{{ row.diskSpace.size }}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ row.bandWidthSize.size
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-black">
												<router-link v-if="content"
													:to="'#/product-plans/' + row.id + '/' + content.type"
													class="orange-bg py-1 px-4 my-1 text-sm border border-transparent rounded-md sahdow-xl shadow-black text-center">
													Buy
												</router-link>
											</td>
										</tr>

										<!-- More people... -->
									</tbody>
								</table>
								<table v-else class="min-w-full divide-y divide-gray-300">
									<thead class="orange-bg">
										<tr>
											<th scope="col"
												class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
												Processor Type</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Cpu
												Type
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Ram
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rom
												Type
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Rom
											</th>
											<th scope="col"
												class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Order
											</th>
										</tr>
									</thead>
									<tbody class="divide-y divide-gray-300 bg-gray-200">
										<tr v-for="(row, index) in tableData" :key="index">
											<td
												class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-700 sm:pl-6">
												{{ row.processorType.type }}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{
													row.cpuType.name
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
												{{ row.ramSize.size }}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{ row.romType
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{{
													row.romSize.size
											}}</td>
											<td class="whitespace-nowrap px-3 py-4 text-sm text-black">
												<router-link v-if="content"
													:to="'/product-plans/' + row.id + '/' + content.type"
													class="orange-bg py-1 px-4 my-1 text-sm border border-transparent rounded-md sahdow-xl shadow-black text-center">
													Buy
												</router-link>
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

			<div v-if="type === 'domains'">
				<div class="mt-20 flex flex-col">
					<div
						class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg bg-gray-200 px-8 py-10 text-gray-700 space-y-10">

						<div>
							<h3 class="text-lg orange-text">Domain Name Generator</h3>
							<h4 class="font-bold text-gray-900">Website name suggestions for any project</h4>
							<p>Give your site the address it deserves. Whether launching an exciting start-up or changing an existing brand, our domain suggestion tool makes it easy to discover thousands of
								available website names fast.</p>
						</div>

						<div class="rounded-md overflow-hidden bg-gray-100 shadow-md shadow-gray-400">

							<div class="bg-black px-8 py-2 flex flex-row justify-between items-center space-x-4 orange-text">
								<div class="flex flex-row justify-start items-center space-x-4 divide-y">
									
								</div>
								<div class="flex flex-row justify-start items-center space-x-4 divide-y">
									<button class="hover:text-gray-50">Reset</button>
								</div>
							</div>

							<div class="bg-gray-100">
								<input-text placeholder="Enter upto 5000 keywords"
									class="w-full ring-0 focus:ring-0 bg-white rounded-none text-black border-b border-gray-200" />
							</div>
							<div
								class="grid grid-cols-1 md:grid-cols-2 gap-0 divide-x bg-gray-50 divide-gray-200 border-b border-gray-200">
								<div class="">

									<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div class="px-4 py-4 space-y-1">

											<h3>Transform</h3>

											<div class="w-full field-checkbox flex justify-start items-center space-x-2">
												<Checkbox inputId="useDomainHacks" v-model="useDomainHacks"
													:binary="true" />
												<label for="useDomainHacks">Use Domain Hacks</label>
											</div>
											<div class="w-full field-checkbox flex justify-start items-center space-x-2">
												<Checkbox inputId="dropLastVomels" v-model="dropLastVomels"
													:binary="true" />
												<label for="dropLastVomels">Drop Last Vowels</label>
											</div>
											<div class="w-full field-checkbox flex justify-start items-center space-x-2">
												<Checkbox inputId="prularizeNouns" v-model="prularizeNouns"
													:binary="true" />
												<label for="prularizeNouns">Prularize Nouns</label>
											</div>
										</div>
										<div class="px-4 py-4 space-y-1">

											<h3>Options</h3>

											<div class="w-full field-checkbox flex justify-start items-center space-x-2">
												<Checkbox inputId="showPremiums" v-model="showPremiums"
													:binary="true" />
												<label for="showPremiums">Outlook Support</label>
											</div>
											<div class="w-full field-checkbox flex justify-start items-center space-x-2">
												<Checkbox inputId="hideUnavailable" v-model="hideUnavailable"
													:binary="true" />
												<label for="hideUnavailable">Hide Unavailable</label>
											</div>
										</div>
									</div>

									<div>
										<div class="w-full field-checkbox flex justify-start items-center space-x-2 px-4 py-4">
											<label for="appendPrefixSuffix">Append Prefix/Suffix</label>
											<InputSwitch v-model="appendPrefixSuffix" />
										</div>
									</div>

								</div>

								<div class="">
									<h3
										class="flex px-4 py-4 flex-row justify-between items-center space-x-4 border-b border-gray-200">
										<span>Search TLDs</span>
										<button class="px-4 py-1 rounded-full orange-bg text-black">Select All</button>
									</h3>
								</div>

							</div>
							<div class="px-8 py-4 bg-black">
								<button class="w-full orange-bg text-black px-4 py-3.5 rounded-md">Generate</button>
							</div>
						</div>

					</div>
				</div>
			</div>

		</div>
		<div class="w-full">
			<div class="lg:max-w-7xl mx-auto py-12 space-y-10">
				<div v-if="content" class="space-y-12">
					
					<div v-if="content.features" class="rounded-md overflow-hidden space-y-4">
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t-2 orange-border"></div>
							</div>
							<div class="relative flex justify-center text-sm">
								<h2 class="py-4 px-8 text-2xl font-bold orange-bg text-black rounded-full">Features</h2>
							</div>
						</div>
						<div class="py-8 px-4 mx-12 text-gray-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
							<div v-for="(item, index) in content.features" :key="index"
								class="bg-gray-200 border border-gray-300 text-black px-4 py-6 rounded-md flex flex-row justify-start items-start space-x-8 shadow-md">
								<div>
									<CheckCircleIcon class="h-10 text-thin blue-text" />
								</div>
								<div>
									<h3
										class="font-semibold blue-text flex flex-row justify-start items-center flex-nowrap space-x-2">
										<span>{{ item.title }}</span>
									</h3>
									<p>{{ item.details }}</p>
								</div>
							</div>
						</div>
					</div>

					<div v-if="content.flowcharts" class="rounded-md overflow-hidden space-y-4">
						<!-- <div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t-2 orange-border"></div>
							</div>
							<div class="relative flex justify-center text-sm">
								<h2 class="py-4 px-8 text-2xl font-bold orange-bg text-black rounded-full">Features</h2>
							</div>
						</div> -->
						<div class="py-8 px-4 mx-12 text-gray-500 " :class="content.flowcharts.length > 1 ? 'grid grid-cols-1 gap-8 lg:grid-cols-2' : ''">
							<div v-for="(item, index) in content.flowcharts" :key="index"
								class="bg-gray-200 border border-gray-300 text-black rounded-md overflow-hidden w-full shadow-md">
								<img :src="item" class="w-full" />
							</div>
						</div>
					</div>

					<div v-if="content.solutions" class="rounded-md overflow-hidden space-y-4">
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t-2 orange-border"></div>
							</div>
							<div class="relative flex justify-center text-sm">
								<h2 class="py-4 px-8 text-2xl font-bold orange-bg text-black rounded-full">Solutions</h2>
							</div>
						</div>
						<div class="py-8 px-4 mx-12 text-gray-500" :class="content.solutions.length > 1 ? 'grid grid-cols-1 lg:grid-cols-3 gap-8' : ''">
							<div v-for="(item, index) in content.solutions" :key="index"
								class="bg-gray-200 border border-gray-300 text-black px-4 py-6 rounded-md flex flex-row justify-start items-start space-x-8 shadow-md">
								<div>
									<CheckCircleIcon class="h-10 text-thin blue-text" />
								</div>
								<div>
									<h3
										class="font-semibold blue-text flex flex-row justify-start items-center flex-nowrap space-x-2">
										<span>{{ item.title }}</span>
									</h3>
									<p>{{ item.details }}</p>
								</div>
							</div>
						</div>
					</div>

					<div v-if="content.why" class="rounded-md overflow-hidden space-y-4">
						<div class="relative">
							<div class="absolute inset-0 flex items-center">
								<div class="w-full border-t-2 orange-border"></div>
							</div>
							<div class="relative flex justify-center text-sm">
								<h2 class="py-4 px-8 text-2xl font-bold orange-bg text-black rounded-full">Why Choose Us?</h2>
							</div>
						</div>
						<div class="space-y-4 px-4 mx-12 py-8 bg-gray-200 text-gray-700 rounded-lg shadow-lg border border-gray-300">
							<div v-for="(item, index) in content.why" :key="index">
								<h3
									class="font-semibold blue-text flex flex-row justify-start items-center flex-nowrap space-x-2">
									<span>{{ item.title }}</span>
								</h3>
								<p>{{ item.details }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Faq :id="type" />

	</div>
</template>
<script setup>
import { useMainStore, useMeasurementStore } from '../store';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'
import Faq from '../components/FaqSection.vue'
import dedicatedServerBanner from '../assets/banners/dedicated-servers.png'
import vpsBanner from '../assets/banners/vps.png'
import colocationBanner from '../assets/banners/colocation.png'
import dataCenterBanner from '../assets/banners/data-center.png'
import domainRegBanner from '../assets/banners/domain_reg.png'
import emailBanner from '../assets/banners/email-hosting.png'
import hybridCloudBanner from '../assets/banners/hybrid-cloud.png'
import sharedHostingBanner from '../assets/banners/shared-hosting.png'
import acronisBanner from '../assets/banners/acronis.png'

import draasFlowChart1 from '../assets/flowcharts/draas1.png'
import draasFlowChart2 from '../assets/flowcharts/draas2.png'

import acronisFlowChart1 from '../assets/flowcharts/acronis1.png'

import {
	CloudUploadIcon,
	CogIcon,
	LockClosedIcon,
	MenuIcon,
	ShoppingCartIcon,
	PhoneIcon,
	ChipIcon,
	ServerIcon,
	CollectionIcon,
	ShieldCheckIcon,
	CheckCircleIcon,
} from '@heroicons/vue/outline'

const route = useRoute()

const mainStore = useMainStore()
const measurementStore = useMeasurementStore()

measurementStore.getDedicatedServers()
measurementStore.getVpsList()
measurementStore.getEmailHostingList()
measurementStore.getSharedHostingList()

const dedicatedServers = ref(computed(() => measurementStore.dedicatedServers))
const vps = ref(computed(() => measurementStore.vpsList))
const emailHostings = ref(computed(() => measurementStore.emailHostingList))
const sharedHostings = ref(computed(() => measurementStore.sharedHostingList))

const content = ref(computed(() => {
	if (type.value === 'vps') return content_collection.value.vps
	else if (type.value === 'dedicated-server') return content_collection.value.dedicatedServer
	else if (type.value === 'email-hosting') return content_collection.value.emailHosting
	else if (type.value === 'sddc') return content_collection.value.sddc
	else if (type.value === 'hybrid-cloud') return content_collection.value.hybridCloud
	else if (type.value === 'domains') return content_collection.value.domains
	else if (type.value === 'shared-hosting') return content_collection.value.sharedHosting
	else if (type.value === 'co-location') return content_collection.value.coLocation
	else if (type.value === 'draas') return content_collection.value.draas
	else if (type.value === 'acronis') return content_collection.value.acronis
	else return null
}));
const type = ref(route.params.type);
const params = ref(route.params)

const showPremiums = ref(false)
const hideUnavailable = ref(false)
const useDomainHacks = ref(false)
const dropLastVomels = ref(false)
const prularizeNouns = ref(false)
const appendPrefixSuffix = ref(false)

const content_collection = ref({
	vps: {
		type: 'vps',
		banner: vpsBanner,
		title: 'Virtual Private Server (VPS)',
		description: 'Virtual Private Server (VPS) is a Virtual Server that is divided into sub-servers or partitions where each virtualized server functions independently and has its own resources. Each VPS runs on its own operating system (OS) and applications independently through a hypervisor. ',
		intro: 'Jenetworks offers the best solutions as it has an exclusive line of cloud powered VPS hosting packages that give you full access and control of the environment. You can configure your server to meet your business needs as you please. No technical experience? Do not worry, the Jenetworks support team is readily available for any inquiries needed when operating your environment.',
		why: [{
			title: 'Instant Set up',
			details: 'As soon as we reach on an agreement, your account will be up and running with zero-delay guarantee. Our team will bring your site online with confidence.'
		},
		{
			title: 'High availability',
			details: 'We understand that downtime can be dangerous to your business, therefore we have the best VPN hosting plans that come with high resource availability speeds and promise steady performances even during fluctuations.'
		},
		{
			title: 'Security',
			details: 'We have a team that is up to date with all knowledge and skills required for monitoring, identification and uprooting of security attacks.'
		},
		{
			title: 'Simple and cheap',
			details: 'Each of our plans have gone through multiple tests to ensure extreme simplicity so that managing on your own cannot be a hassle. Each plan is pocket friendly and delivery of.'
		},
		{
			title: 'Easy Control panel',
			details: 'You can control and manage everything from your browser without any interference.'
		},
		{
			title: 'Support',
			details: 'We have a team that will be readily available for support and feedback when needed.'
		}],
		features: [
			{
				title: 'Completely Customizable.',
				details: 'No matter your level of tech-savviness, your VPS comes customized. Choose your Operating System (Ubuntu, CentOS or Debian), gain root access to your server, and decide if you want a control panel (cPanel) installed.'
			}, {
				title: 'Powerful VPS Security.',
				details: 'Thanks to our state-of-the-art hardware, software firewalls, and internal security package, your virtual hosting environment remains in safe hands.'
			}, {
				title: '24/7 Live Support.',
				details: 'If you’ve got questions, want to discuss your custom VPS options or upgrade your level of server VPS management, we’re here for you—round the clock.'
			}, {
				title: 'Incredibly Fast.',
				details: 'Pure Solid-State Drive (SSD) means you’re looking at 20X faster storage over traditional Hard Disk Drives (HDD), which are preferred by VPS competitors. This results in significant improvements to your website’s performance, speed and loading times.'
			},
		]
	},
	dedicatedServer: {
		type: 'dedicated_server',
		banner: dedicatedServerBanner,
		title: 'Dedicated Servers',
		description: '',
		intro: 'Our dedicated servers offer a powerful, foolproof security and robust management for businesses that have outgrown shared hosting. Get beneficial server plans from Jenetworks that are inclusive of all the essential tools for monitoring, managing, controlling and protecting your dedicated server.',
		why: [{
			title: '',
			details: 'Jenetworks will empower you to make the most of your servers. Zipping speed and excellent uptime guarantee you the smooth, hassle-free operations. We have a vast, reliable and qualified support team offering 24 hour support. Get prompt, precise and practical responses to all your problems. We assure you that your business will never suffer because of any technical problem!'
		}],
		features: [
			{
				title: 'Security by Fortinet firewall.',
				details: ''
			}, {
				title: '24x7 remote monitoring.',
				details: ''
			}, {
				title: 'Hardware replacement.',
				details: ''
			}, {
				title: '99.99% Uptime guarantee.',
				details: ''
			}, {
				title: 'IPv4 Addresses.',
				details: ''
			}, {
				title: 'No Setup cost.',
				details: ''
			}, {
				title: '24x7x365 Technical support.',
				details: ''
			}, {
				title: 'Free Quick Migration.',
				details: ''
			}, {
				title: 'Free Remote Reboot and Root Access.',
				details: ''
			}, {
				title: 'Fast connectivity.',
				details: ''
			},
		],
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
	sddc: {
		type: 'sddc',
		banner: dataCenterBanner,
		title: 'JE Networks SDDC (software-defined data center)',
		description: 'An SDDC (software-defined data center) is a data storage facility in which all infrastructure elements -- networking, storage, CPU and security -- are virtualized and delivered as a service. Deployment, operation, provisioning and configuration are abstracted from hardware.',
		intro: '',
	},
	draas: {
		type: 'draas',
		banner: dataCenterBanner,
		title: 'JE Networks DRaaS Service (Disaster Recovery as a Service)',
		description: 'Jenetworks has a DRAAS service spreading through the 2 datacenters – EADC and Konza Data Centers. Jenetworks DRaaS mirrors a complete infrastructure in fail-safe mode on virtual servers, including compute, storage and networking functions. Our clients can continue to run applications—it just runs them from our cloud or hybrid cloud environment instead of from the disaster-affected physical servers. This means recovery time after a disaster can be much faster, or even instantaneous. Once the physical servers are recovered or replaced, the processing and data is migrated back onto them.',
		intro: '',
		flowcharts: [
			draasFlowChart1,
			draasFlowChart2
		],
		features: [
			{
				title: 'File-level, disk-level, image and application backups.',
				details: ''
			}, {
				title: 'Back up popular workloads including Mac, Windows, Linux, Microsoft 365, Google Workspace, Hyper-V, VMware and much more.',
				details: ''
			}, {
				title: 'Hybrid storage options – Acronis Hosted Cloud Storage, public clouds such as Microsoft Azure, or MSP local storage.',
				details: ''
			}, {
				title: 'Flexible recovery options from full systems to granular files.',
				details: ''
			}, {
				title: 'Cloud-Local-Virtual migration.',
				details: ''
			}, {
				title: 'Machine-intelligence-based anti-malware and antivirus to counter ransomware and zero-day threats.',
				details: ''
			}, {
				title: 'Archive encryption.',
				details: ''
			}, {
				title: 'Incremental and differential backups.',
				details: ''
			}, {
				title: 'Immutable backups.',
				details: ''
			}, {
				title: 'Vulnerability assessments.',
				details: ''
			}, {
				title: 'Complete Google Workspace protection.',
				details: ''
			}, {
				title: 'Complete Microsoft 365 protection.',
				details: ''
			}, {
				title: 'Backup encryption.',
				details: ''
			}, {
				title: 'Deduplication.',
				details: ''
			},
		],
		solutions: [
			{
				title: 'Jenetworks Managed DRaaS.',
				details: 'In our managed DRaaS model, Jenetworks takes over all responsibility for disaster recovery. Choosing this option requires an organization to stay in close contact with their DRaaS provider to ensure that it stays up to date on all infrastructure, application and services changes. If you lack the expertise or time to manage your own disaster recovery, this may be the best option for you.'
			}, {
				title: 'Jenetworks Assisted DRaaS.',
				details: 'If you prefer to maintain responsibility for some aspects of your disaster recovery plan, or if you have unique or customized applications that might be challenging for a third party to take over, our assisted DRaaS might be a better option. In this model, we offer our expertise for optimizing disaster recovery procedures, but the customer is responsible for implementing some or all of the disaster recovery plan.'
			}, {
				title: 'Jenetworks Self-service DRaaS.',
				details: 'The least expensive option is our self-service DRaaS, where the customer is responsible for the planning, testing and management of disaster recovery, and the customer hosts its own infrastructure backup on virtual machines in a remote location. Careful planning and testing are required to make sure that processing can fail over to the virtual servers instantly in the event of a disaster. This option is best for those who have experienced disaster recovery experts on staff.'
			}]
	},
	acronis: {
		type: 'acronis',
		banner: acronisBanner,
		title: 'Jenetworks Acronis Cloud Data Back UP Solution',
		description: 'To protect clients\' business-critical data, backup is not enough – clients need an integrated approach to cyber protection. Paired with Acronis Cyber Protect Cloud, the Advanced Cloud Backup Pack enables you to extend the cloud backup capabilities your clients need to proactively protect their data.',
		intro: 'Jenetworks cloud data backup solution strengthens your data protection services by ensuring clients never lose data, even between scheduled backups. Extend backup capabilities to SAP HANA, Oracle DB and application clusters. Harness the power of one solution, one agent and one console to deliver the comprehensive cyber protection your clients seek. Discover what backup and data protection capabilities you gain by leveraging Acronis Cyber Protect Cloud with Advanced Backup.',
		flowcharts: [
			acronisFlowChart1
		],
		why: [
			{
				title: '',
				details: 'It’s an all-in-one data protection and cybersecurity platform that enables MSPs to offer more client services at less cost.'
			},
			{
				title: '',
				details: 'More than cyber protection and backup – Acronis enables Cloud and Hosting Service Providers to deliver modern, comprehensive cyber protection solutions that are profitable and ready to deploy.'
			}
		],
		solutions: [
			{
				title: 'ACRONIS’ FILE BACKUP AND RECOVERY SOLUTIONS.',
				details: 'Today’s businesses rely on data like never before, making its protection essential. From cyber attacks to hardware failure to user error, any threats to data integrity have the potential to devastate your organization. Acronis’ file backup and recovery solutions draw on the power of integration to deliver unparalleled data security, protecting your organization’s operational continuity, reputation, and bottom line. Acronis’ solutions integrate data protection with threat-agnostic cybersecurity, enabling unique interactions like the scanning of backups for malware and ensuring that you’ll always have clean and accessible copies of business-critical data. '
			},
		]
	},
	coLocation: {
		type: 'colocation',
		banner: colocationBanner,
		title: 'Co Location Data Center',
		description: 'A colocation data center is any large datacenter facility that rents out rack space to third parties for their servers or other network equipment. This is a very popular service that is used by businesses that may not have the resources needed to maintain their own data center, but still want to enjoy all the benefits. At Jenetworks we offer this solution to clients who require this service with unlimited advantages.',
		intro: '',
		why: [],
		features: [
			{
				title: 'Low costs.',
				details: ''
			}, {
				title: 'Fewer technical staff.',
				details: ''
			}, {
				title: 'Exceptional reliability.',
				details: ''
			}, {
				title: 'Predictable expenses.',
				details: ''
			}, {
				title: 'Easy scalability.',
				details: ''
			}, {
				title: 'Geographical location.',
				details: ''
			},
		]
	},
	hybridCloud: {
		type: 'hybrid_cloud',
		banner: hybridCloudBanner,
		title: 'JE Networks Hybrid Cloud',
		description: 'Our Hybrid cloud combines and unifies public cloud, private cloud and on-premises infrastructure to create a single, flexible, cost-optimal IT infrastructure. Hybrid cloud integrates public cloud services, private cloud services and on-premises infrastructure and provides orchestration, management and application portability across all three. The result is a single, unified and flexible distributed computing environment where an organization can run and scale its traditional or cloud-native workloads on the most appropriate computing model. Hybrid multicloud is hybrid cloud that includes public cloud services from more than one cloud service provider.  By enabling a company to combine best-of-breed cloud services and functionality from multiple cloud computing vendors choose the optimal cloud computing environment for each workload, and  move workloads freely between public and private cloud as circumstances change',
		intro: '',
		why: []
	},
	domains: {
		type: 'domains',
		banner: domainRegBanner,
		title: 'Domain Registration',
		description: 'Enter a domain name and create your online identity. Use our advanced domain name generator to get your ideal choice.',
		intro: '',
		why: [
			{
				title: 'Privacy and Security.',
				details: 'Your website security and privacy, always comes first, and we will always support the rights of individuals and consumers online. It’s our mission to keep the Internet open, free, and safe for everyone.'
			}, {
				title: 'Customer Service.',
				details: 'You’re covered by our Support Team that’s renowned for being one of the most knowledgeable, friendly, and professional in the business. Our team is always ready to assist you with any issue, any time, 24/7.'
			}, {
				title: 'Your Business Online.',
				details: 'Boost your business with industry-premium products and services, at prices that won’t break your budget. If it doesn’t provide you with a better Internet experience, we simply don’t offer it.'
			},
		]
	},
	sharedHosting: {
		type: 'shared_hosting',
		banner: sharedHostingBanner,
		title: 'Shared Hosting',
		description: 'Fast, secure, and affordable hosting plans for any budget.',
		intro: '',
		why: [
			{
				title: 'Privacy and Security.',
				details: 'Your website security and privacy, always comes first, and we will always support the rights of individuals and consumers online. It’s our mission to keep the Internet open, free, and safe for everyone.'
			}, {
				title: 'Customer Service.',
				details: 'You’re covered by our Support Team that’s renowned for being one of the most knowledgeable, friendly, and professional in the business. Our team is always ready to assist you with any issue, any time, 24/7.'
			}, {
				title: 'Your Business Online.',
				details: 'Boost your business with industry-premium products and services, at prices that won’t break your budget. If it doesn’t provide you with a better Internet experience, we simply don’t offer it.'
			},
		],
		features: [
			{
				title: '24/7 Live Support.',
				details: 'Our dedicated team of hosting experts is always ready to help. Whether you’re just starting out or there’s an issue that needs fixing, we’re here for all your Shared Hosting needs.'
			}, {
				title: 'Personalized Email Service.',
				details: 'Enjoy a domain-based email address of your choice to represent your business and help manage communication.'
			},
		]
	}
});

watch(() => route.params, () => {
	type.value = route.params.type;
})

const tableData = ref(computed(() => {
	if (type.value === 'vps') return vps.value
	else if (type.value === 'dedicated-server') return dedicatedServers.value
	else if (type.value === 'email-hosting') return emailHostings.value
	else if (type.value === 'shared-hosting') return sharedHostings.value
	else if (type.value === 'sddc') return []
	else return []
}))

function addCartItem(item) {
	return mainStore.addCartItem(item)
}
</script>