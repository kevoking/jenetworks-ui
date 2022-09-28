<template>
    <div>
        <div class="py-6">
            <div class="max-w-7xl mx-auto">
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
                        <Column field="amount" header="Amount">
                            <template #body="slotProps">
                                <span>{{ orderAmount(slotProps.data.items) }}</span>
                            </template>
                        </Column>
                        <Column field="status" header="Status">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.status }}</span>
                            </template>
                        </Column>
                        <Column field="id" header="Actions">
                            <template #body="slotProps">
                                <div class="flex flex-row flex-shrink justify-start space-x-2 items-center w-24">
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