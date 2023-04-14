<template>
  <div class="mt-12 mb-12">
    <!-- Pricing Section -->
    <section class="relative" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" class="sr-only">Pricing</h2>

      <!-- Tiers -->
      <div class="px-12 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">

        <div v-if="vps"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Cloud VPS</h3>

            <p class="mt-2 text-gray-700 text-sm">
              <!-- {{ tier.description }} -->
            </p>

            <!-- Feature list -->
            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.processorType?.type }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.ramSize?.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.romSize?.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.bandWidthSize?.size }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <router-link :to="'/product/vps'" @click="selectProduct(vps.vps, 'vps')"
              class="block orange-bg rounded-l-md px-6 py-1">View All Plans</router-link>
            <button @click="addCartItem(vps)"
              class="bg-black orange-text block py-2 px-4 -ml-2 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline orange-text">
                <span class="font-semibold tracking-tight">Ksh {{ vps.amount?.toLocaleString() }}</span>
                <span class="ml-1 capitalize">Order Now</span>
              </p>
            </button>
          </div>
        </div>

        <div v-if="dedicatedServer"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Dedicated Servers</h3>

            <p class="mt-2 text-gray-700 text-sm">
              <!-- {{ tier.description }} -->
            </p>

            <!-- Feature list -->
            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.processorType.type }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.ramSize.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.romSize.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.bandWidthSize.size
                  }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <router-link :to="'/product/dedicated-server'"
              @click="selectProduct(dedicatedServer.dedicatedServer, 'dedicated_server')"
              class="block orange-bg rounded-l-md px-6 py-1">View All Plans</router-link>
            <button @click="addCartItem(dedicatedServer)"
              class="bg-black orange-text block py-2 px-4 -ml-2 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline">
                <span class="font-semibold tracking-tight">Ksh {{ dedicatedServer.amount?.toLocaleString() }}</span>
                <span class="ml-1 capitalize">Order Now</span>
              </p>
            </button>
          </div>
        </div>

        <!-- <div v-if="dedicatedServer"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Linux Reseller Hosting</h3>

            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.processorType.type }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.ramSize.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.romSize.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.bandWidthSize.size
                  }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <router-link :to="'/product/dedicated-server'"
              @click="selectProduct(dedicatedServer.dedicatedServer, 'dedicated_server')"
              class="block orange-bg rounded-l-md px-6 py-1">View All Plans</router-link>
            <button @click="addCartItem(dedicatedServer)"
              class="bg-black orange-text block py-2 px-4 -ml-2 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline">
                <span class="font-semibold tracking-tight">Ksh {{ dedicatedServer.amount?.toLocaleString() }}</span>
                <span class="ml-1 capitalize">Order Now</span>
              </p>
            </button>
          </div>
        </div> -->

        <!-- <div v-if="vps"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Linux Shared Hosting</h3>

            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.processorType?.type }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.ramSize?.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.romSize?.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.bandWidthSize?.size }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <router-link :to="'/product/vps'" @click="selectProduct(vps.vps, 'vps')"
              class="block orange-bg rounded-md px-6 py-1">View All Plans</router-link>
            <button @click="addCartItem(vps)"
              class="bg-black orange-text block py-2 px-4 -ml-2 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline">
                <span class="font-semibold tracking-tight">Ksh {{ vps.amount?.toLocaleString() }}</span>
                <span class="ml-1 capitalize">Order Now</span>
              </p>
            </button>
          </div>
        </div> -->

        <!-- <div v-if="vps"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Email Hosting</h3>

            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.processorType?.type }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.ramSize?.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.romSize?.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full orange-bg"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.bandWidthSize?.size }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <router-link :to="'/product/vps'" @click="selectProduct(vps.vps, 'vps')"
              class="block orange-bg rounded-l-md px-6 py-1">View All Plans</router-link>
            <button @click="addCartItem(vps)"
              class="bg-black orange-text block py-2 px-4 -ml-2 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline">
                <span class="font-semibold tracking-tight">Ksh {{ vps.amount?.toLocaleString() }}</span>
                <span class="ml-1 capitalize">Order Now</span>
              </p>
            </button>
          </div>
        </div> -->

      </div>
    </section>
		<Toast />
  </div>
</template>

<script setup>
import { useMainStore, useMeasurementStore } from '../store'
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const mainStore = useMainStore()
const measurementStore = useMeasurementStore()

measurementStore.getDedicatedServers()
measurementStore.getPaymentMatrices()

const vps = computed(() => measurementStore.featuredVpsPlan)
const dedicatedServer = computed(() => measurementStore.featuredDedicatedServerPlan)

function addCartItem(item) {
  toast.add({severity:'success', summary: 'Item added to cart.', life: 3000});
  return mainStore.addCartItem(item)
}

function selectProduct(item, itemType) {
  if (itemType == 'vps') measurementStore.selectVps(item)
  else if (itemType == 'dedicated_server') measurementStore.selectDedicatedServer(item)
}
</script>