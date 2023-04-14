<template>
    <div>
        <div class="py-6">
            
            <div class="max-w-7xl mx-auto">
              <div class="divide-y divide-gray-300 bg-gray-100 border border-dashed border-gray-400 shadow-lg shadow-gray-200" v-if="order">

                <div class="max-w-7xl mx-auto px-4 py-6 space-y-4">
                    <h1 class="text-xl font-semibold text-gray-500">Order #{{ order.id }}</h1>

                    <div>
                      <h1 class="text-lg text-gray-900 mb-2">Invoiced To:</h1>
                      <h1 class="text-lg text-gray-700">{{ order.user.firstName + ' ' + order.user.lastName }}</h1>
                      <h1 class="text-lg text-gray-700">{{ order.user.phone }}</h1>
                      <h1 class="text-lg text-gray-700">{{ order.user.email }}</h1>
                    </div>
                </div>

                <div class="max-w-7xl mx-auto px-4 py-6 ">
                    <h1 class="text-lg font-semibold text-gray-900">Order Details</h1>
                </div>

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
                            <span class="text-lg tracking-tight">{{ getItemProduct(item).processorType.type }}</span>
                            <!-- <span class="text-lg tracking-tight">{{ getItemProduct(item).cpuClockSpeed.speed }}</span> -->
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
                          <!-- <p>
                            <span class="ml-1 text-lg">{{ getItemProduct(item).ips }} IP's</span>
                          </p> -->
                        </div>
                        <div class="flex justify-end">
                          <h3 class="flex space-x-2 text-lg font-semibold">
                            <span>Ksh</span> <span>{{ item.amount?.toLocaleString() }}</span>
                          </h3>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

                <div class="max-w-7xl mx-auto px-4 py-6 ">
                    <div class="grid grid-cols-3 gap-4">
                      <div class="col-span-2 text-right">
                        <h1 class="text-lg font-semibold text-gray-900">Order Total</h1>
                      </div>
                      <div class="text-right">
                        <h1 class="text-lg font-semibold text-gray-900">
                          <span>Ksh</span> <span>{{ orderAmount(order.items)?.toLocaleString() }}</span>
                        </h1>
                      </div>
                    </div>
                </div>

              </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMainStore } from '../../store';
import { useRoute } from 'vue-router'

const mainStore = useMainStore();

const route = useRoute()
mainStore.getOrder(route.params.id)

const order = computed(() => mainStore.order)

function getItemProduct(item) {
  if (item.vps) return item.vps
  else if (item.dedicatedServer) return item.dedicatedServer
  else return null
}
function orderAmount(items) {
    let amount = 0
    items.forEach(element => {
        amount += element.amount
    });
    return amount
}
// function toggleModal(target) {
//     measurementStore.modal = target
// }
</script>