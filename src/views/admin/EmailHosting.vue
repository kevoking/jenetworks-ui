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
          <a v-for="tab in tabs" :key="tab.name" @click="currentTab = tab.name" :href="tab.href"
            :class="[tab.name == currentTab ? 'blue-border blue-text' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'w-1/4 py-1.5 px-1 text-center border-b-4 font-medium text-sm']"
            :aria-current="tab.current ? 'page' : undefined">
            {{ tab.title }}
          </a>
        </nav>
      </div>
    </div>
    <div>
      <div v-if="currentTab == 'email_hosting'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, {}, 'emailhosting')">Add Hosting</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="emailHostings" :paginator="true" :rows="10" v-model:filters="filterBandWidths"
            filterDisplay="row" :globalFilterFields="['size']" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <template #header>
              <div class="flex justify-content-between w-full space-x-4 justify-between items-center">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" class="p-button-outlined"
                  @click="clearFilter()" />
                <span class="p-input-icon-left">
                  <i class="pi pi-search" />
                  <InputText v-model="filterBandWidths['global'].value" placeholder="Keyword Search" />
                </span>
              </div>
            </template>
            <Column field="emailPlan.name" header="Plan" :sortable="true" :show-filter-menu="true"></Column>
            <Column field="emailIds.ids" header="Email IDs"></Column>
            <Column field="emailSpace.totalSpace" header="Space"></Column>
            <Column field="webmail" header="Webmail"></Column>
            <Column field="isPop3" header="PoP3">
              <template #body="slotProps">
                <CheckCircleIcon class="h-6 w-6 text-green-600" v-if="slotProps.data.isPop3 === true"></CheckCircleIcon>
                <XCircleIcon class="h-6 w-6 text-red-600" v-else></XCircleIcon>
              </template>
            </Column>
            <Column field="isImap" header="IMaP">
              <template #body="slotProps">
                <CheckCircleIcon class="h-6 w-6 text-green-600" v-if="slotProps.data.isImap === true"></CheckCircleIcon>
                <XCircleIcon class="h-6 w-6 text-red-600" v-else></XCircleIcon>
              </template>
            </Column>
            <Column field="isSmtp" header="SMTP">
              <template #body="slotProps">
                <CheckCircleIcon class="h-6 w-6 text-green-600" v-if="slotProps.data.isSmtp === true"></CheckCircleIcon>
                <XCircleIcon class="h-6 w-6 text-red-600" v-else></XCircleIcon>
              </template>
            </Column>
            <Column field="isMobileSupport" header="Mobile Support">
              <template #body="slotProps">
                <CheckCircleIcon class="h-6 w-6 text-green-600" v-if="slotProps.data.isMobileSupport === true"></CheckCircleIcon>
                <XCircleIcon class="h-6 w-6 text-red-600" v-else></XCircleIcon>
              </template>
            </Column>
            <Column field="isOutlookSupport" header="Outlook Support">
              <template #body="slotProps">
                <CheckCircleIcon class="h-6 w-6 text-green-600" v-if="slotProps.data.isOutlookSupport === true"></CheckCircleIcon>
                <XCircleIcon class="h-6 w-6 text-red-600" v-else></XCircleIcon>
              </template>
            </Column>
            <!-- <Column field="amount" header="Amount"></Column>
                        <Column field="status" header="Action">
                            <template #body="{ data }">
                                <button class="px-2 py-1" >
                                    <PencilIcon class="h-4 w-4 blue-text" />
                                </button>
                                <button class="px-2 py-1" >
                                    <TrashIcon class="h-4 w-4 text-red-400" />
                                </button>
                            </template>
                        </Column> -->
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'emailhosting')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('emailhosting', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'email_plan'">{{ emailPlans }}
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, {}, 'emailplan')">Add Email Plan</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="emailPlans" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'emailplan')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('emailhosting', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'email_space'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, {}, 'emailspace')">Add Email Space</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="emailSpaces" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="totalSpace" header="Total Space"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'emailspace')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('emailhosting', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div v-if="currentTab == 'email_id'">
        <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
          <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false, {}, 'emailid')">Add Email Id</button>
        </div>
        <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
          <DataTable :value="emailIds" :paginator="true" :rows="10" class="p-datatable-sm"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="ids" header="IDS"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Action">
              <template #body="{ data }">
                <button class="px-2 py-1" @click="toggleModal(true, data, 'emailid')">
                  <PencilIcon class="h-4 w-4 blue-text" />
                </button>
                <button class="px-2 py-1" @click="confirmDelete('emailhosting', data.id)">
                  <TrashIcon class="h-4 w-4 text-red-400" />
                </button>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>

    </div>
    <ConfirmDialog></ConfirmDialog>
    <EmailPlanForm />
    <EmailIdForm />
    <EmailSpaceForm />
    <EmailHostingForm />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { FilterMatchMode, FilterOperator } from 'primevue/api';

import EmailPlanForm from '../../components/admin/dialogs/EmailPlanForm.vue';
import EmailIdForm from '../../components/admin/dialogs/EmailIdForm.vue';
import EmailSpaceForm from '../../components/admin/dialogs/EmailSpaceForm.vue';
import EmailHostingForm from '../../components/admin/dialogs/EmailHostingForm.vue';

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import {
    PencilIcon,
    TrashIcon,
    EyeIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/vue/outline'

import { useMeasurementStore } from '../../store';

const confirm = useConfirm();
const toast = useToast();
const measurementStore = useMeasurementStore();

measurementStore.getEmailIds()
measurementStore.getEmailSpaces()
measurementStore.getEmailPlans()
measurementStore.getEmailHostingList()

const modal = computed(() => measurementStore.modal)

watch(modal, value => {
  measurementStore.getEmailIds()
  measurementStore.getEmailSpaces()
  measurementStore.getEmailPlans()
  measurementStore.getEmailHostingList()
})
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
const emailHostings = computed(() => measurementStore.emailHostingList)
const emailPlans = ref(computed(() => measurementStore.emailPlans))
const emailSpaces = computed(() => measurementStore.emailSpaces)
const emailIds = computed(() => measurementStore.emailIds)

const filterBandWidths = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'size': { value: null, matchMode: FilterMatchMode.CONTAINS },
});

function clearFilter() {

}

const tabs = [
  { title: 'Email Hosting', name: 'email_hosting' },
  { title: 'Email Plan', name: 'email_plan' },
  { title: 'Email Space', name: 'email_space' },
  { title: 'Email Id', name: 'email_id' },
]
const currentTab = ref('email_hosting')

function toggleModal(edit, data, target) {
  if (target === 'emailhosting') {
    measurementStore.editEmailHosting = edit
    measurementStore.editEmailHostingData = data
  } else if (target === 'emailplan') {
    measurementStore.editEmailPlan = edit
    measurementStore.editEmailPlanData = data
  } else if (target === 'emailspace') {
    measurementStore.editEmailSpace = edit
    measurementStore.editEmailSpaceData = data
  } else if (target === 'emailid') {
    measurementStore.editEmailId = edit
    measurementStore.editEmailIdData = data
  }
  measurementStore.modal = target
}
</script>