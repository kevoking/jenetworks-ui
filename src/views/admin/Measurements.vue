<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs" class="block w-full focus:blue-border border-gray-300 rounded-md">
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.name == currentTab">{{ tab.title }}</option>
      </select>
    </div>
    <div class="hidden sm:block max-w-7xl mx-auto">
      <div class="rounded-lg overflow-hidden border border-gray-200 mt-4 bg-gray-100 shadow-lg">
        <nav class="-mb-px flex divide-x divide-gray-300" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" :href="'/measurements/' + tab.name"
            :class="[tab.name == currentTab ? 'blue-border blue-text' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-1.5 px-1 text-center border-b-4 font-medium text-sm']"
            :aria-current="tab.current ? 'page' : undefined">
            {{ tab.title }}
          </a>
        </nav>
      </div>
    </div>
    <div>
      <div v-if="currentTab == 'bandwidth'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'bandwidth')">Add
            Bandwidth</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="bandwidths" :paginator="true" :rows="10" v-model:filters="filterBandWidths"
            filterDisplay="row" :globalFilterFields="['size']" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <template #header>
              <div class="flex justify-content-between justify-between items-center space-x-4 w-full">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
                  @click="clearFilter()" />
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filterBandWidths['global'].value" placeholder="Keyword Search" />
                </span>
              </div>
            </template>
            <Column field="size" header="Size" :sortable="true" :show-filter-menu="true"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'bandwidth')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('bandwidth', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'cpuclockspeed'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'cpuclockspeed')">Add Cpu
            Clock
            Speed</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="cpuClockSpeeds" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="speed" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'cpuclockspeed')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('cpuclockspeed', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <!-- <div v-if="currentTab == 'cputype'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'cputype')">Add Cpu
            Type</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="cpuTypes" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="name" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'cputype')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('cputype', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div> -->
      <div v-if="currentTab == 'os'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'os')">Add Operating
            System</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="operatingSystems" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="name" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'os')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('os', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'processortype'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'processortype')">Add
            Processor
            Type</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="processerTypes" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="type" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'processortype')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('processortype', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'ram'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'ram')">Add Ram</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="rams" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="size" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="selectItem(data, 'ram');toggleModal(true, data, 'ram')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('ram', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'rom'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, null, 'rom')">Add Rom</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="roms" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="size" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'rom')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('rom', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

    </div>
    <ConfirmDialog></ConfirmDialog>
    <BandWidthForm :edit="editRecord" :item="editRecordData" />
    <CpuClockSpeedForm :edit="editRecord" :item="editRecordData" />
    <CpuTypeForm :edit="editRecord" :item="editRecordData" />
    <OperatingSysytemForm :edit="editRecord" :item="editRecordData" />
    <RamForm :edit="editRecord" :item="editRecordData" />
    <RomForm :edit="editRecord" :item="editRecordData" />
    <ProcessortypeForm :edit="editRecord" :item="editRecordData" />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
import BandWidthForm from '../../components/admin/dialogs/BandWidthForm.vue';
import CpuClockSpeedForm from '../../components/admin/dialogs/CpuClockSpeedForm.vue';
import CpuTypeForm from '../../components/admin/dialogs/CpuTypeForm.vue';
import OperatingSysytemForm from '../../components/admin/dialogs/OperatingSysytemForm.vue';
import RamForm from '../../components/admin/dialogs/RamForm.vue';
import RomForm from '../../components/admin/dialogs/RomForm.vue';
import ProcessortypeForm from '../../components/admin/dialogs/ProcessortypeForm.vue';
import { useMeasurementStore } from '../../store';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import {
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/outline'

const route = useRoute()
const confirm = useConfirm();
const toast = useToast();
const measurementStore = useMeasurementStore();
const toReload = ref(computed(() => measurementStore.toReload))

measurementStore.getBandwidths()
measurementStore.getCpuClockSpeeds()
// measurementStore.getCpuTypes()
measurementStore.getOperatingSystems()
measurementStore.getProcessorTypes()
measurementStore.getRams()
measurementStore.getRoms()

const bandwidths = ref(computed(() => measurementStore.bandwidths.filter(e => e.status === 'Active')))
const cpuClockSpeeds = ref(computed(() => measurementStore.cpuClockSpeeds.filter(e => e.status === 'Active')))
// const cpuTypes = ref(computed(() => measurementStore.cpuTypes.filter(e => e.status === 'Active')))
const operatingSystems = ref(computed(() => measurementStore.operatingSystems.filter(e => e.status === 'Active')))
const processerTypes = ref(computed(() => measurementStore.processerTypes.filter(e => e.status === 'Active')))
const rams = ref(computed(() => measurementStore.rams.filter(e => e.status === 'Active')))
const roms = ref(computed(() => measurementStore.roms.filter(e => e.status === 'Active')))

const filterBandWidths = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'size': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

watch(toReload, value => {
  if (toReload.value == 'bandwidth') {
    measurementStore.getBandwidths()
  };
})

function clearFilter() {

}

const deleteRecord = ref();
const deleteRecordId = ref();
function confirmDelete(record, id) {

  deleteRecord.value = record;
  deleteRecordId.value = id;
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    acceptClass: 'p-button-danger',
    accept: () => {
      measurementStore.deleteRecord(record, id)
      // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    },
    onHide: () => {
      this.$toast.add({ severity: 'error', summary: 'Hide', detail: 'You have hidden', life: 3000 });
    }
  });
}
const tabs = [
  { title: 'BandWidth', name: 'bandwidth' },
  // { title: 'CpuType', name: 'cputype' },
  { title: 'ProcessorType', name: 'processortype' },
  { title: 'CpuClockSpeed', name: 'cpuclockspeed' },
  { title: 'RamSize', name: 'ram' },
  { title: 'RomSize', name: 'rom' },
  { title: 'OperatingSystem', name: 'os' },
]
// const currentTab = ref('bandwidth')
const currentTab = ref(route.params.item);
const editRecord = ref(false)
const editRecordData = ref({})

function selectItem(item, target) {
  if (target === 'ram') {
    measurementStore.editRamData = item
  }
}

function toggleModal(edit, data, target) {
  if (target === 'ram') {
    measurementStore.editRam = edit
  }
  measurementStore.modal = target
}

</script>