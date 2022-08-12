<template>
  <div>
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs"
        class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.name == currentTab">{{ tab.title }}</option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex" aria-label="Tabs">
          <a v-for="tab in tabs" :key="tab.name" @click="currentTab = tab.name" :href="tab.href"
            :class="[tab.name == currentTab ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm']"
            :aria-current="tab.current ? 'page' : undefined">
            {{ tab.title }}
          </a>
        </nav>
      </div>
    </div>
    <div>
      <div v-if="currentTab == 'bandwidth'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('bandwidth')">Add Bandwidth</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="bandwidths" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="size" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'cpuclockspeed'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('cpuclockspeed')">Add Cpu Clock
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
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'cputype'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('cputype')">Add Cpu Type</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="cpuTypes" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="name" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'os'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('os')">Add Operating System</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="operatingSystems" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="name" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'processortype'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('processortype')">Add Processor Type</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="processerTypes" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="type" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'ram'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('ram')">Add Ram</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="rams" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="size" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'rom'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('rom')">Add Rom</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="roms" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="size" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
          </DataTable>
        </div>
      </div>

    </div>
    <BandWidthForm />
    <CpuClockSpeedForm />
    <CpuTypeForm />
    <OperatingSysytemForm />
    <RamForm />
    <RomForm />
    <ProcessortypeForm />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import BandWidthForm from '../../components/admin/dialogs/BandWidthForm.vue';
import CpuClockSpeedForm from '../../components/admin/dialogs/CpuClockSpeedForm.vue';
import CpuTypeForm from '../../components/admin/dialogs/CpuTypeForm.vue';
import OperatingSysytemForm from '../../components/admin/dialogs/OperatingSysytemForm.vue';
import RamForm from '../../components/admin/dialogs/RamForm.vue';
import RomForm from '../../components/admin/dialogs/RomForm.vue';
import ProcessortypeForm from '../../components/admin/dialogs/ProcessortypeForm.vue';
import { useMeasurementStore } from '../../store';

const measurementStore = useMeasurementStore();

measurementStore.getBandwidths()
measurementStore.getCpuClockSpeeds()
measurementStore.getCpuTypes()
measurementStore.getOperatingSystems()
measurementStore.getProcessorTypes()
measurementStore.getRams()
measurementStore.getRoms()

const bandwidths = computed(() => measurementStore.bandwidths)
const cpuClockSpeeds = computed(() => measurementStore.cpuClockSpeeds)
const cpuTypes = computed(() => measurementStore.cpuTypes)
const operatingSystems = computed(() => measurementStore.operatingSystems)
const processerTypes = computed(() => measurementStore.processerTypes)
const rams = computed(() => measurementStore.rams)
const roms = computed(() => measurementStore.roms)

const tabs = [
  { title: 'BandWidth', name: 'bandwidth' },
  { title: 'CpuClockSpeed', name: 'cpuclockspeed' },
  { title: 'CpuType', name: 'cputype' },
  { title: 'OperatingSystem', name: 'os' },
  { title: 'ProcessorType', name: 'processortype' },
  { title: 'RamSize', name: 'ram' },
  { title: 'RomSize', name: 'rom' },
]
const currentTab = ref('bandwidth')

function toggleModal(target) {
  measurementStore.modal = target
}
</script>