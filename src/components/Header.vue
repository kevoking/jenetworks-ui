<template>
  <div class="pt-10 bg-blue-400 pb-10 lg:overflow-hidden max-w-7xl mx-auto px-10">

    <carousel :items-to-show="1" :autoplay="3000" :wrap-around="true">
      <slide v-for="(slide, index) in slides" :key="index">
        <div class="mx-auto w-full lg:px-8">
          <div class="flex lg:flex-row items-center justify-between w-full lg:space-x-24 mx-auto">
            <div class="sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div class="lg:py-2">
                <!-- <a href="#" class="inline-flex items-center text-white bg-black rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200">
                  <span class="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full">We're hiring</span>
                  <span class="ml-4 text-sm">Visit our careers page</span>
                  <ChevronRightIcon class="ml-2 w-5 h-5 text-gray-500" aria-hidden="true" />
                </a> -->
                <h1 class="mt-2 text-4xl tracking-tight font-extrabold text-white sm:text-6xl lg:mt-4 xl:text-6xl">
                  <span class="pb-2 block bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-orange-400">{{slide.title}}</span>
                </h1>
                <p class="text-base text-gray-700 sm:text-xl lg:text-lg xl:text-xl">{{slide.description}}</p>
                <div class="mt-2 sm:mt-4">
                  <form action="#" class="sm:max-w-xl sm:mx-auto lg:mx-0">
                    <div class="sm:flex">
                      <div class="mt-2 sm:mt-0 sm:ml-3">
                        <button type="submit" class="block w-full py-3 px-4 rounded-md shadow bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 focus:ring-offset-gray-900">Start free trial</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="lg:m-0 hidden lg:flex justify-end items-center">
              <div class="mx-auto px-4 sm:px-6 lg:px-0">
                <!-- Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ -->
                <img class="max-h-80 lg:w-auto" src="https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg" alt="" />
              </div>
            </div>
          </div>
        </div>

      </slide>

      <!-- <template #addons>
        <navigation />
        <pagination />
      </template> -->
    </carousel>
  </div>
</template>
<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/vue/solid'
const slides = [
  {
    title: 'Cyber Security',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: '',
    linkLabel: 'Start free trial',
    footer: ''
  },
  {
    title: 'Network Security',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: '',
    linkLabel: 'Start free trial',
    footer: ''
  },
  {
    title: 'VPS Hosting',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: '',
    linkLabel: 'Start free trial',
    footer: ''
  },
  {
    title: 'Biometric Solutions',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: '',
    linkLabel: 'Start free trial',
    footer: ''
  },
  {
    title: 'CCTV Solutions',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: '',
    linkLabel: 'Start free trial',
    footer: ''
  }
]
</script>
