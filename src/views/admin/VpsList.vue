<template>
    <div>
        <div class="py-6">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-lg font-semibold text-gray-900">VPS</h1>
            </div>
            <div class="max-w-7xl mx-auto">
                <!-- Replace with your content -->
                <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
                    <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal('vps')">
                        Add Server
                    </button>
                </div>
                <div class="bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
                    <DataTable :value="servers" :paginator="true" :rows="10" class="p-datatable-sm"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                        <Column field="processorType.type" header="Processor Type"></Column>
                        <Column field="cpuType.name" header="Cpu Type"></Column>
                        <Column field="cpuClockSpeed.speed" header="Cpu Clock Speed"></Column>
                        <Column field="ramSize.size" header="Ram"></Column>
                        <Column field="romType" header="Rom Type"></Column>
                        <Column field="romSize.size" header="Rom"></Column>
                        <Column field="bandWidthSize.size" header="BandWidth"></Column>
                        <Column field="ips" header="IPS"></Column>
                        <Column field="status" header="Status"></Column>
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
        <VpsForm />
    </div>
</template>
<script setup>
import { computed } from 'vue'
import { useMeasurementStore } from '../../store';
import VpsForm from '../../components/admin/dialogs/VpsForm.vue'

import {
    PencilIcon,
    TrashIcon
} from '@heroicons/vue/outline'

const measurementStore = useMeasurementStore();

measurementStore.getVpsList()

measurementStore.getProcessorTypes()
measurementStore.getCpuTypes()
measurementStore.getRams()
measurementStore.getRoms()
measurementStore.getOperatingSystems()
measurementStore.getBandwidths()
measurementStore.getCpuClockSpeeds()

const servers = computed(() => measurementStore.vpsList)

function toggleModal(target) {
    measurementStore.modal = target
}
</script>