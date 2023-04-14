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
                        <Column field="cpuClockSpeed.speed" header="Cpu Clock Speed"></Column>
                        <Column field="ramSize.size" header="Ram"></Column>
                        <Column field="bandWidthSize.size" header="BandWidth"></Column>
                        <Column field="romSize.size" header="Storage"></Column>
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

    <ConfirmDialog></ConfirmDialog>
        <VpsForm />
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useMeasurementStore } from '../../store';
import VpsForm from '../../components/admin/dialogs/VpsForm.vue'

import {
    PencilIcon,
    TrashIcon
} from '@heroicons/vue/outline'

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();
const measurementStore = useMeasurementStore();

measurementStore.getVpsList()

measurementStore.getProcessorTypes()
measurementStore.getCpuTypes()
measurementStore.getRams()
measurementStore.getRoms()
measurementStore.getOperatingSystems()
measurementStore.getBandwidths()
measurementStore.getCpuClockSpeeds()

const servers = ref(computed(() => measurementStore.vpsList.filter(e => e.status === 'Active')))
function confirmDelete(id) {

confirm.require({
  message: 'Do you want to delete this record?',
  header: 'Delete Confirmation',
  icon: 'pi pi-info-circle',
  acceptClass: 'p-button-danger',
  accept: () => {
    measurementStore.deleteVps(id)
    // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
  },
  reject: () => {
    //toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
  },
  onHide: () => {
    //this.$toast.add({ severity: 'error', summary: 'Hide', detail: 'You have hidden', life: 3000 });
  }
});
}
function toggleModal(target) {
    measurementStore.modal = target
}
</script>