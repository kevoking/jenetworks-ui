<template>
    <div>
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-semibold text-gray-900">Payment Matrix</h1>
            </div>
            <div class="max-w-7xl mx-auto">
                <!-- Replace with your content -->
                <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
                    <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('paymentmatrix')">
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
                                <span>{{ slotProps.data.vps?.cpuType.name }}</span>
                                <span>{{ slotProps.data.dedicatedServer?.cpuType.name }}</span>
                            </template>
                        </Column>
                        <Column field="os.name" header="Operating System"></Column>
                        <Column field="amount" header="Amount"></Column>
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

const measurementStore = useMeasurementStore();

measurementStore.getPaymentMatrices()

const paymentMatrices = computed(() => measurementStore.paymentMatrices)

function toggleModal(target) {
    measurementStore.modal = target
}
</script>