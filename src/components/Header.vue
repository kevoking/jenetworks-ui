<template>
  <div class="">
    <div class="lg:overflow-hidden max-w-7xl mx-auto">

      <carousel :items-to-show="1" :autoplay="5000" :wrap-around="true">
        <slide v-for="(banner, index) in banners" :key="index">
          <div class="mx-auto w-full">
            <img class="w-full" :src="banner" alt="" />
            <!-- <div class="flex lg:flex-row items-center justify-between w-full lg:space-x-24 mx-auto">
              <div class="sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                <div class="lg:py-2">
                  <div class="">
                    <h1 class="mt-2 text-4xl tracking-tight font-medium">
                      <span class="pb-2 block">{{ slide.title }}</span>
                    </h1>
                    <h3 class="mt-2 text-2xl tracking-tight orange-text">
                      <span class="pb-2 block">{{ slide.subtitle }}</span>
                    </h3>
                  </div>

                  <div class=" border-b border-t border-black py-2">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                      <div class="flex flex-row justify-start items-center space-x-2 flex-nowrap">
                        <CheckCircleIcon class="flex-shrink-0 w-6 h-6" />
                        <span>99.95% Network Uptime Guarantee</span>
                      </div>
                      <div class="flex flex-row justify-start items-center space-x-2 flex-nowrap">
                        <CheckCircleIcon class="flex-shrink-0 w-6 h-6" />
                        <span>Lowest Price Guaranteed</span>
                      </div>
                      <div class="flex flex-row justify-start items-center space-x-2 flex-nowrap">
                        <CheckCircleIcon class="flex-shrink-0 w-6 h-6" />
                        <span>Branded Hardware</span>
                      </div>
                      <div class="flex flex-row justify-start items-center space-x-2 flex-nowrap">
                        <CheckCircleIcon class="flex-shrink-0 w-6 h-6" />
                        <span>24*7 Support System</span>
                      </div>
                    </div>
                  </div>

                  <div class="mt-2 sm:mt-4 flex flex-row justify-start items-center">
                    <div class="sm:flex px-2">
                      <div class="mt-2 sm:mt-0 sm:ml-3">
                        <span class="font-bold text-2xl">7,980.00/month</span>
                      </div>
                    </div>
                    <div class="px-8"></div>
                    <div class="sm:flex px-2 border-l border-black">
                      <div class="mt-2 sm:mt-0 sm:ml-3">
                        <button type="button"
                          class="block w-full py-3 px-4 uppercase rounded-md shadow bg-black text-white font-medium ">
                          More Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="lg:m-0 hidden lg:flex justify-end items-center">
                <div class="mx-auto px-4 sm:px-6 lg:px-0">
                  <img class="max-h-80 lg:w-auto" :src="slide.image" alt="" />
                </div>
              </div>
            </div> -->
          </div>

        </slide>

        <!-- <template #addons>
        <navigation />
        <pagination />
      </template> -->
      </carousel>
    </div>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import serverImg from '../assets/server.png'
import emailImg from '../assets/email.png'

import dedicatedServerBanner from '../assets/banners/dedicated-servers.png'
import vpsBanner from '../assets/banners/vps.png'
import colocationBanner from '../assets/banners/colocation.png'
import dataCenterBanner from '../assets/banners/data-center.png'
import domainRegBanner from '../assets/banners/domain_reg.png'
import emailBanner from '../assets/banners/email-hosting.png'
import hybridCloudBanner from '../assets/banners/hybrid-cloud.png'
import sharedHostingBanner from '../assets/banners/shared-hosting.png'

import { CheckCircleIcon } from '@heroicons/vue/solid'

const banners = ref([
  dedicatedServerBanner,
  vpsBanner,
  colocationBanner,
  dataCenterBanner,
  domainRegBanner,
  emailBanner,
  hybridCloudBanner,
  sharedHostingBanner,
])

const slides = [
  {
    title: 'SSD Cloud VPS',
    subtitle: 'IN HIGH AVAILABLE CLOUD',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: serverImg,
    linkLabel: 'Start free trial',
    footer: ''
  },
  {
    title: 'Enterprise Grade',
    subtitle: 'Dedicated servers Kenya',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: serverImg,
    linkLabel: 'Start free trial',
    footer: ''
  },
  {
    title: 'Email Hosting',
    subtitle: 'Addressing Email Needs',
    description: 'Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui Lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat',
    link: '#',
    image: emailImg,
    linkLabel: 'Start free trial',
    footer: ''
  },
]
</script>
