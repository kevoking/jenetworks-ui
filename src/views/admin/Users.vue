<template>
    <div>
        <div class="py-6">
            <div class="max-w-9xl mx-auto">
                <h1 class="text-lg font-semibold text-gray-900">Users</h1>
            </div>
            <div class="max-w-9xl mx-auto">
                <!-- Replace with your content -->
                <div class="mx-auto max-w-9xl my-4 flex justify-end items-center">
                    <button class="orange-bg px-4 py-2 rounded-md" @click="toggleModal(false,'user')">
                        Add User
                    </button>
                </div>
                <div class="bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
                    <DataTable :value="users" :paginator="true" :rows="10" class="p-datatable-sm"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                        <!-- <Column field="id" header="Item">
                            <template #body="slotProps">
                                <span>{{ slotProps.data.vps?.cpuType.name }}</span>
                                <span>{{ slotProps.data.dedicatedServer?.cpuType.name }}</span>
                            </template>
                        </Column> -->
                        <Column field="firstName" header="Name">
                            <template #body="{ data }">
                                {{data.firstName }} {{ data.lastName}}
                            </template>
                        </Column>
                        <Column field="phone" header="Phone"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column field="staffNo" header="Staff No"></Column>
                        <Column field="status" header="Action">
                            <template #body="slotProps">
                                <div class="grid grid-cols-2">
                                    <button class="px-2 py-1" @click="selectItem(slotProps.data);toggleModal(true,'user')">
                                        <PencilIcon class="h-4 w-4 blue-text" />
                                    </button>
                                    <button class="px-2 py-1" @click="confirmDelete(slotProps.data.id)">
                                        <TrashIcon class="h-4 w-4 text-red-400" />
                                    </button>
                                </div>
                            </template>
                        </Column>
                    </DataTable>
                </div>
                <!-- /End replace -->
            </div>
        </div>
        <UserForm />
    <ConfirmDialog></ConfirmDialog>
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useMeasurementStore, useAuthStore } from '../../store';
import UserForm from '../../components/admin/dialogs/UserForm.vue'

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import {
    PencilIcon,
    TrashIcon
} from '@heroicons/vue/outline'

const confirm = useConfirm();
const toast = useToast();
const measurementStore = useMeasurementStore();
const authStore = useAuthStore()

authStore.getUsers()

const users = ref(computed(() => authStore.users))
function confirmDelete(id) {

    confirm.require({
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
            authStore.deleteUser(id)
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

function selectItem(item) {
    measurementStore.editUserData = item
    console.log(item)
}
function toggleModal(edit, target) {
    measurementStore.editUser = edit
    measurementStore.modal = target
}
</script>