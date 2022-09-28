<template>
  <!-- Testimonial section -->
  <div class="mt-12 mb-12">

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t orange-border"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <h2 class="py-4 px-8 text-2xl font-bold orange-text bg-black">What Our Clients Are Saying</h2>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div v-for="slide in 3" :key="slide" class="rounded-md shadow-xl overflow-hidden ">
        <div class="w-full">
          <img class="object-cover lg:h-full lg:w-full"
            src="https://images.unsplash.com/photo-1520333789090-1afc82db536a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2102&q=80"
            alt="" />
        </div>
        <div class="px-4 bg-gray-900">
          <p class="text-base font-medium text-white">Judith Black</p>
          <p class="text-sm orange-text">CEO at PureInsights</p>
        </div>
        <a href="#" class="px-4 blue-text">www.website.domain</a>
        <p class="mt-4 mb-4 px-4 text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed urna nulla vitae laoreet augue...<a href="#" class="blue-text">Read More</a>.</p>
      </div>
    </div>
    <div class="flex justify-end items-center py-4">
      <a href="#" class="px-4 blue-text">View All Testimonials</a>
    </div>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
</script>