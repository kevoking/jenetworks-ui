<template>
    <div>
        <div class="py-6">
            <div class="max-w-9xl mx-auto">
                <h1 class="text-lg font-semibold text-gray-900">Orders</h1>
                <!-- <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
                    <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal('paymentmatrix')">
                        Add Payment Matrix
                    </button>
                </div> -->
                <div class="bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
                    <DataTable :value="orders" :paginator="true" :rows="10" class="p-datatable-sm"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                        <Column field="id" header="User">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.user.firstName }}</span>
                            </template>
                        </Column>
                        <Column field="items" header="Items">
                            <template #body="slotProps">
                                <div v-for="(item, index) in slotProps.data.items" :key="index">
                                    <span v-if="item.vps">
                                        Cloud VPS
                                    </span>
                                    <span v-if="item.dedicatedServer">
                                        Dedicated Server
                                    </span>
                                    {{ getItemProduct(item).processorType.type ?? '' }}
                                </div>
                            </template>
                        </Column>
                        <Column field="amount" header="Amount">
                            <template #body="slotProps">
                                <span>Ksh {{ orderAmount(slotProps.data.items)?.toLocaleString() }}</span>
                            </template>
                        </Column>
                        <Column field="status" header="Status">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.status }}</span>
                            </template>
                        </Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <div class="grid grid-cols-3">
                                    <span>
                                        <router-link :to="'/order-details/' + slotProps.data.id">
                                            <EyeIcon class="h-4 w-4 blue-text" />
                                        </router-link>
                                    </span>
                                    <button class="px-2 py-1">
                                        <PencilIcon class="h-4 w-4 blue-text" />
                                    </button>
                                    <button class="px-2 py-1">
                                        <TrashIcon class="h-4 w-4 text-red-400" />
                                    </button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMainStore } from '../../store';

import {
    PencilIcon,
    TrashIcon,
    EyeIcon
} from '@heroicons/vue/outline'

const mainStore = useMainStore();

mainStore.getOrders()

const orders = computed(() => mainStore.orders)

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