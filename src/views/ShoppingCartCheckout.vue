<template>
	<div class="max-w-7xl mx-auto py-12 space-y-8 min-h-full">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 px-4 py-6 space-y-8">

        <h2 class="text-2xl font-bold text-gray-600">Shopping Cart</h2>
        <div class="divide-y bg-gray-100">
          <div v-for="(item, index) in order.items" :key="index">

            <div class="flex flex-row justify-between">

              <div class="px-4 py-6 space-y-4 w-full">
                <h3 class="text ftext-gray-900">
                  <span v-if="item.vps">Cloud VPS</span>
                  <span v-if="item.dedicatedServer">Dedicated Server</span>
                </h3>
                <div class="flex flex-row justify-between items-end w-full space-x-8">
                  <div class="mt-2 text-gray-900" v-if="getItemProduct(item)">
                    <p class="flex items-baseline space-x-2">
                      <span class="text-lg tracking-tight">{{ getItemProduct(item).cpuType.name }}</span>
                      <span class="text-lg tracking-tight">{{ getItemProduct(item).processorType.type }}</span>
                      <span class="text-lg tracking-tight">{{ getItemProduct(item).cpuClockSpeed.speed }}</span>
                    </p>
                    <p>
                      <span class="ml-1 text-lg">RAM {{ getItemProduct(item).ramSize.size }}</span>
                    </p>
                    <p>
                      <span class="ml-1 text-lg">Storage {{ getItemProduct(item).romSize.size }} {{
                          getItemProduct(item).romType
                      }}</span>
                    </p>
                    <p>
                      <span class="ml-1 text-lg">Operaing System {{ item.os.name }}</span>
                    </p>
                    <p>
                      <span class="ml-1 text-lg">BandWidth {{ getItemProduct(item).bandWidthSize.size }}</span>
                    </p>
                    <p>
                      <span class="ml-1 text-lg">{{ getItemProduct(item).ips }} IP's</span>
                    </p>
                  </div>
                  <div class="flex justify-end">
                    <h3 class="flex space-x-2">
                      <span>Ksh</span> <span>{{ item.amount }}</span>
                    </h3>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div class="px-4 py-6 space-y-8">

        <h2 class="text-2xl font-bold text-gray-600">Order Summary</h2>
        <div class="divide-y bg-indigo-100 px-4 py-6 space-y-4">
          <div class="flex flex-row justify-between items-center py-2">
            <span>Order Amount</span>
            <span>{{ mainStore.cartTotal }}</span>
          </div>
          <div>
            <h3 class="text-gray-600 text-lg font-bold">Pay Via Mpesa</h3>
            <div class="flex flex-col py-2">
              <label class="text-sm text-gray-500">Phone Numner</label>
              <input type="number" placeholder="MPESA Number"
                class="px-4 py-2 border border-gray-300 bg-white sahdow-md w-full" />
            </div>
            <p class="text-sm text-gray-500">We will send an STK push to your phone</p>
          </div>

          <div>
            <button
              class="bg-green-400 text-white hover:bg-green-600 mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium">Pay
              Now</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { useMainStore } from '../store'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity';

const route = useRoute()
const mainStore = useMainStore()

mainStore.getOrder(route.params.id)

const order = computed(() => mainStore.order)

function getItemProduct(item) {
  if (item.vps) return item.vps
  else if (item.dedicatedServer) return item.dedicatedServer
  else return null
}
</script>