<template>
  <!-- CTA Section -->
  <div class="py-12 space-y-8 min-h-full">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 px-4 py-6 space-y-8">

        <h2 class="text-2xl font-bold text-gray-600">Shopping Cart</h2>
        <div class="divide-y bg-gray-100">
          <div v-for="(item, index) in mainStore.shoppingCart" :key="index">

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

              <div class="px-4 py-2">
                <button class="p-1" @click="removeCartItem(item)">
                  <XIcon class="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="px-4 py-6 space-y-8">

        <h2 class="text-2xl font-bold text-gray-600">Order Summary</h2>
        <div class="divide-y bg-gray-100 px-4 py-6 space-y-4">
          <div class="flex flex-row justify-between items-center py-2">
            <span>Order Amount</span>
            <span>{{ mainStore.cartTotal }}</span>
          </div>
          
          <div>
            <button @click="placeOrder"
              class="orange-bg text-white hover:orange-bg mt-8 block w-full py-3 px-6 border border-transparent uppercase rounded-md text-center font-medium">
              Complete Order & Pay  
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script setup>
import {
  ShoppingCartIcon,
  ServerIcon,
  XIcon,
} from '@heroicons/vue/outline'
import { useMainStore, useAuthStore } from '../store'

const mainStore = useMainStore()
const authStore = useAuthStore()

function getItemProduct(item) {
  if (item.vps) return item.vps
  else if (item.dedicatedServer) return item.dedicatedServer
  else return null
}
function removeCartItem(index) {
  mainStore.removeCartItem(index)
}

async function placeOrder () {
  const payload = {
    id: 0,
    // userId: authStore.user?.id ?? 1,
    itemIds: mainStore.cartItemIds,
    status: 'PENDING',
  }
  return await mainStore.saveOrder(payload)
}
</script>