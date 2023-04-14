<template>
    <div>
        <div class="py-6">
            <div class="max-w-9xl mx-auto">
                <h1 class="text-lg font-semibold text-gray-900">Payment Matrix</h1>
            </div>
            <div class="max-w-9xl mx-auto">
                <!-- Replace with your content -->
                <div class="mx-auto max-w-9xl my-4 flex justify-end items-center">
                    <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal('paymentmatrix')">
                        Add Payment Matrix
                    </button>
                </div>
                <div class="bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
                    <DataTable :value="paymentMatrices" :paginator="true" :rows="10" class="p-datatable-sm"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                        <Column field="id" header="Item">
                            <template #body="slotProps">
                                <span v-if="slotProps.data.vps">
                                    {{slotProps.data.vps.processorType.type}}/{{slotProps.data.vps.ramSize.size}} RAM/{{slotProps.data.vps.romSize.size}}/{{slotProps.data.vps.bandWidthSize.size}} Bandwidth
                                </span>
                                <span>
                                    {{slotProps.data.dedicatedServer?.processorType?.type}}/{{slotProps.data.dedicatedServer?.ramSize.size}} RAM/{{slotProps.data.dedicatedServer?.romSize.size}}/{{slotProps.data.dedicatedServer?.bandWidthSize.size}} Bandwidth
                                </span>
                            </template>
                        </Column>
                        <Column field="os.name" header="Operating System"></Column>
                        <Column field="amount" header="Amount">
                            <template #body="slotProps">
                                <span>
                                    Ksh {{ slotProps.data.amount?.toLocaleString() }}
                                </span>
                            </template>
                        </Column>
                        <Column field="status" header="Action">
                            <template #body="{ data }">
                                <button class="px-2 py-1" >
                                    <PencilIcon class="h-4 w-4 blue-text" />
                                </button>
                                <button class="px-2 py-1" >
                                    <TrashIcon class="h-4 w-4 text-red-400" />
                                </button>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <!-- /End replace -->
            </div>
        </div>
        <PaymentMatrixForm />
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMeasurementStore } from '../../store';
import PaymentMatrixForm from '../../components/admin/dialogs/PaymentMatrixForm.vue'

import {
    PencilIcon,
    TrashIcon
} from '@heroicons/vue/outline'

const measurementStore = useMeasurementStore();

measurementStore.getPaymentMatrices()

const paymentMatrices = computed(() => measurementStore.paymentMatrices)

function toggleModal(target) {
    measurementStore.modal = target
}
</script>