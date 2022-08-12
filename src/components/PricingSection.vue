<template>
  <div class="mt-12 mb-12">
    <!-- Pricing Section -->
    <section class="relative" aria-labelledby="pricing-heading">
      <h2 id="pricing-heading" class="sr-only">Pricing</h2>

      <!-- Tiers -->
      <div
        class="max-w-2xl mx-auto px-4 space-y-12 lg:max-w-7xl lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">

        <div v-if="vps"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Cloud VPS</h3>
            
            <p class="mt-2 text-gray-700 text-sm"><!-- {{ tier.description }} --></p>

            <!-- Feature list -->
            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.processorType?.type }}</span><span>{{ vps.vps.cpuType?.name }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.ramSize?.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.romSize?.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.ips }}</span><span>IP's</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ vps.vps.bandWidthSize?.size }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <a href="#" class="block bg-orange-400 rounded-l-md px-2 py-1">View All Plans</a>
            <button @click="addCartItem(vps)"
              class="bg-white text-orange-700 hover:bg-orange-50 block py-2 px-4 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline text-gray-900">
                <span class="font-semibold tracking-tight">Ksh {{ vps.amount }}</span>
                <!-- <span class="ml-1 capitalize">{{ tier.frequency }}</span> -->
              </p>
            </button>
          </div>
        </div>

        <div v-if="dedicatedServer"
          class="relative p-4 border-2 border-white bg-gray-200 rounded-md shadow-md hover:shadow-2xl flex flex-col">
          <div class="flex-1">
            <h3 class="text font-semibold text-gray-900">Dedicated Servers</h3>
            
            <p class="mt-2 text-gray-700 text-sm"><!-- {{ tier.description }} --></p>

            <!-- Feature list -->
            <ul role="list" class="mt-1 divide-y divide-gray-400 text-sm">
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.processorType.type }}</span><span>{{ dedicatedServer.dedicatedServer.cpuType.name }}</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.ramSize.size }}</span><span>Ram</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.romSize.size }}</span><span>Storage</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.ips }}</span><span>IP's</span>
                </span>
              </li>
              <li class="flex py-1 items-center">
                <span class="h-2 w-2 rounded-full bg-orange-400"></span>
                <span class="ml-3 text-gray-500 flex flex-row justify-start items-center space-x-2">
                  <span class="font-bold">{{ dedicatedServer.dedicatedServer.bandWidthSize.size }}</span><span>Bandwidth</span>
                </span>
              </li>
            </ul>
          </div>

          <div class="flex flex-row flex-nowrap justify-center items-center mt-4">
            <a href="#" class="block bg-orange-400 rounded-l-md px-2 py-1">View All Plans</a>
            <button @click="addCartItem(dedicatedServer)"
              class="bg-white text-orange-700 hover:bg-orange-50 block py-2 px-4 border border-transparent rounded-xl sahdow-xl shadow-black text-center">
              <p class="flex items-baseline text-gray-900">
                <span class="font-semibold tracking-tight">${{ dedicatedServer.amount }}</span>
                <!-- <span class="ml-1 capitalize">{{ tier.frequency }}</span> -->
              </p>
            </button>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
import { useMainStore, useMeasurementStore } from '../store'
import { computed, ref } from 'vue'

const mainStore = useMainStore()
const measurementStore = useMeasurementStore()

measurementStore.getDedicatedServers()
measurementStore.getPaymentMatrices()

const vps = computed(() => measurementStore.featuredVpsPlan)
const dedicatedServer = computed(() => measurementStore.featuredDedicatedServerPlan)

function addCartItem(item) {
  return mainStore.addCartItem(item)
}
</script>