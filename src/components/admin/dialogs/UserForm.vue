<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="User" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true" @hide="closeModal()">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="first-name" class="block text-sm font-medium text-gray-700">First Name</label>
                        <InputText type="text" v-model="firstName" id="first-name"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm"
                            required />
                    </div>
                    <div class="">
                        <label for="last-mame" class="block text-sm font-medium text-gray-700">Last Name</label>
                        <InputText type="text" v-model="lastName" id="last-name"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm"
                            required />
                    </div>
                </div>
                <div class="space-y-4">
                    <div class="">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                        <InputText type="tel" v-model="phone" id="phone"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm"
                            required />
                    </div>
                    <div class="">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <InputText type="email" v-model="email" id="email"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm"
                            required />
                    </div>
                    <div class="">
                        <label for="staff-no" class="block text-sm font-medium text-gray-700">Staff No</label>
                        <InputText type="number" v-model="staffNo" id="staff-no"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm"
                            required />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitUser" class="blue-bg text-white" autofocus />
            </template>
        </Dialog>
        <!-- <Toast /> -->
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useAuthStore, useMeasurementStore } from '../../../store';
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
const props = defineProps({
    edit: Boolean,
    item: Object
})

const toast = useToast();
const authStore = useAuthStore();
const measurementStore = useMeasurementStore()
const editUser = ref(computed(() => measurementStore.editUser))
const editUserData = ref(computed(() => measurementStore.editUserData))

const id = ref()
const firstName = ref()
const lastName = ref()
const phone = ref()
const email = ref()
const staffNo = ref()

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    console.log(editUserData.value)

    if (editUser.value === true) {
        id.value = editUserData.value.id
        firstName.value = editUserData.value.firstName
        lastName.value = editUserData.value.lastName
        phone.value = editUserData.value.phone
        email.value = editUserData.value.email
        staffNo.value = editUserData.value.staffNo
    }
    if (modal.value == 'user') displayModal.value = true;
    else displayModal.value = false;
})

// watch(payment, value => {
//   toast.add({severity:'success', summary: 'Payment Successful', life: 3000});
// })

const openModal = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
    measurementStore.modal = null;
}

async function submitUser() {
    const payload = {
        id: id.value,
        firstName: firstName.value,
        lastName: lastName.value ?? "",
        phone: phone.value ?? "",
        email: email.value ?? "",
        staffNo: staffNo.value ?? ""
        // status: "Active"
    }

    if (editUser.value === true) {
        return authStore.updateStaff({
        id: id.value,
        firstName: firstName.value,
        lastName: lastName.value ?? "",
        phone: phone.value ?? "",
        // email: email.value ?? "",
        staffNo: staffNo.value ?? "",
        // status: "Active"
    })
    } else {
        return await authStore.saveStaff(payload)
    }
}

</script>