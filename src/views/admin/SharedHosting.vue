<template>
    <div>
        <div class="py-6">
            <div class="max-w-7xl mx-auto">
                <h1 class="text-lg font-semibold text-gray-900">Shared Hosting</h1>
            </div>
            <div class="max-w-7xl mx-auto">
                <!-- Replace with your content -->
                <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
                    <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null)">Add
                        Plan
                    </button>
                </div>
                <div class="bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
                    <DataTable :value="hostingList" :paginator="true" :rows="10" v-model:filters="filter"
                        filterDisplay="row" :globalFilterFields="['size']" class="p-datatable-sm"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                        <template #header>
                            <div class="flex justify-content-between w-full">
                                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
                                    @click="clearFilter()" />
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filter['global'].value"
                                        placeholder="Keyword Search" />
                                </span>
                            </div>
                        </template>
                        <Column field="controlPanel" header="Control Panel" :sortable="true"></Column>
                        <Column field="hostedDomain" header="Hosted Domain" :sortable="true"></Column>
                        <Column field="diskSpace.size" header="Disk Space" :sortable="true"></Column>
                        <Column field="bandWidthSize.size" header="BandWidth" :sortable="true"></Column>
                        <Column field="emailAccounts.size" header="Email Accounts" :sortable="true"></Column>
                        <Column field="noOfFiles" header="No Of Files"></Column>
                        <Column field="isMultiDomain" header="Status"></Column>
                        <!-- <Column field="description" header="Description"></Column> -->
                        <Column field="status" header="Action">
                            <template #body="{ data }">
                                <button class="px-2 py-1" @click="toggleModal(true, data)">
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
        <SharedHostingForm :edit="edit" :item="editItem" />
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import { useMeasurementStore } from '../../store';
import SharedHostingForm from '../../components/admin/dialogs/SharedHostingForm.vue'

import {
    PencilIcon,
    TrashIcon
} from '@heroicons/vue/outline'

const measurementStore = useMeasurementStore();

measurementStore.getSharedHostingList()
measurementStore.getRoms()
measurementStore.getBandwidths()
measurementStore.getEmailIds()

const hostingList = ref(computed(() => measurementStore.sharedHostingList))

const edit = ref(false)
const editItem = ref(null)

const filter = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'name': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

function clearFilter() {

}

function toggleModal(isEdit, item = null) {
    edit.value = isEdit
    editItem.value = item
    measurementStore.modal = 'sharedhosting'
}

</script>