<template>
	<div class="mt-12 mb-12 space-y-8">
		<div class="relative">
			<div class="absolute inset-0 flex items-center">
				<div class="w-full border-t-2 orange-border"></div>
			</div>
			<div class="relative flex justify-center text-sm">
				<h2 class="py-4 px-8 text-2xl font-bold text-black orange-bg rounded-full">Our Clients</h2>
			</div>
		</div>

		<div class="p-2"></div>
		<div class="card bg-white pt-8 pb-4">
			<div class="md:hidden">
				<Carousel :value="clients" :numVisible="2" :numScroll="1" :responsiveOptions="responsiveOptions"
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
				<Carousel :value="clients" :numVisible="4" :numScroll="1" :responsiveOptions="responsiveOptions"
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
import cak from '../assets/clients/cak.svg'
import afa from '../assets/clients/afa.jpg'
import kebs from '../assets/clients/kebs.jpeg'
import trademark from '../assets/clients/trademark.jpg'
import ngao from '../assets/clients/ngao.png'
import verona from '../assets/clients/verona.jpg'

const clients = ref([
	cak,
	afa,
	kebs,
	trademark,
	ngao,
	verona
])
</script>
