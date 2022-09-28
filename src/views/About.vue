<template>
	<div>
		<div class="space-y-10">
			<div class="mb-12 w-full">
				<img class="w-full" :src="servicesBanner" />
			</div>
			<div class="px-12">
				<h3 class="text-lg font-bold orange-text">About Us</h3>
				<div class="text-gray-900 bg-gray-200 px-4 py-8 rounded-md overflow-hidden">
					<p>
						Jenetworks is a 100% Kenyan owned company, a leading Information Communication Technologies (ICT) service provider and network security provider.
					</p>
					<p>
						Jenetworks has partnered with the world market leaders in network security to help you secure your business with our world class solutions tailor-made for your business. We also have a highly trained and competent team of network security engineers who work hand in hand with our clients to provide the best solutions. Our partners include Fortinet, Checkpoint, Sophos, RSA, VEEAM, VMWARE, ACRONICS, EXTREME NETWORKS, DELL and HP.
					</p>
					<p>
						We also offer physical security solutions to secure your business, these include; CCTV and Access Control systems.
					</p>
				</div>
			</div>
			<div class="px-12">
				<h3 class="text-lg font-bold orange-text">Our Values</h3>
				<div class="text-gray-900 bg-gray-200 px-4 py-8 rounded-md overflow-hidden">
					
					<div>
						<h3 class="text-lg font-semibold text-black">User First</h3>
						<div class="text-gray-900 bg-gray-200 px-4 py-2 rounded-md overflow-hidden">
							<p>
								Consider the user experience in everything we do Clear and Simple Communication Committed to using accessible language and being transparent.
							</p>
						</div>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-black">Stay Secure</h3>
						<div class="text-gray-900 bg-gray-200 px-4 py-2 rounded-md overflow-hidden">
							<p>
								Be champions of good practice, proactively managing risks related to information technology .
							</p>
						</div>
					</div>

					<div>
						<h3 class="text-lg font-semibold text-black">Develop Our People</h3>
						<div class="text-gray-900 bg-gray-200 px-4 py-2 rounded-md overflow-hidden">
							<p>
								Contribute to staff development, continuing to build capabilities and talents to delivery excellent service.
							</p>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import servicesBanner from '../assets/banners/services.png'
</script>