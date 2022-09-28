<template>
	<div>
		<Header />
		<Pricing />
		<!-- <Testimonial /> -->
		<Clients />
		<Faq />
		<Partners />
	</div>
</template>
<script setup>
	import Header from '../components/Header.vue'
	import Pricing from '../components/PricingSection.vue'
	import Testimonial from '../components/TestimonialCompactSection.vue'
	import Clients from '../components/ClientsSection.vue'
	import Partners from '../components/PartnersSection.vue'
	import Faq from '../components/FaqSection.vue'
</script>