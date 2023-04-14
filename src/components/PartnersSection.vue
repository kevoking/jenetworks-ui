<template>
	<div class="mt-12 mb-12">
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t-2 orange-border"></div>
			</div>
			<div class="relative flex justify-center text-sm">
				<h2 class="py-4 px-8 text-2xl font-bold text-black orange-bg rounded-full">Our Partners</h2>
			</div>
		</div>

		<div class="card bg-white pt-8 pb-4 mt-4">

			<div class="md:hidden">
				<Carousel :value="partners" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions"
					class="custom-carousel" :circular="true" :autoplayInterval="2000">
					<template #item="slotProps">
						<div class="product-item">
							<div class="product-item-content">
								<div class="mb-3 px-2 flex flex-row justify-center items-center">
									<img :src="slotProps.data" class="h-20" />
								</div>
							</div>
						</div>
					</template>
				</Carousel>
			</div>
			<div class="hidden md:flex">
				<Carousel :value="partners" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions"
					class="custom-carousel" :circular="true" :autoplayInterval="2000">
					<template #item="slotProps">
						<div class="product-item">
							<div class="product-item-content">
								<div class="mb-3 px-2 flex flex-row justify-center items-center">
									<img :src="slotProps.data" class="h-20" />
								</div>
							</div>
						</div>
					</template>
				</Carousel>
			</div>
		</div>

	</div>
</template>
<script setup>
import { ref } from 'vue'
import 'vue3-carousel/dist/carousel.css';
import acronis from '../assets/partners/acronis.png'
import dell from '../assets/partners/dell.jpeg'
import extreme_networks from '../assets/partners/extreme-networks.png'
import fortinet from '../assets/partners/fortinet.png'
import hp from '../assets/partners/hp.jpeg'
import sophos from '../assets/partners/sophos.jpg'
import veeam from '../assets/partners/veeam.png'
import vmware from '../assets/partners/vmware.png'
import convene from '../assets/partners/convene.jpeg'

const partners = ref([
	acronis,
	convene,
	dell,
	extreme_networks,
	fortinet,
	hp,
	sophos,
	veeam,
	vmware
])
</script>
