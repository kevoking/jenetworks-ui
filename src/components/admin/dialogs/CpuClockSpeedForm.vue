<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Cpu Clock Speed" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="speed" class="block text-sm font-medium text-gray-700">Speed</label>
                        <InputText type="text" v-model="speed" id="speed"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea v-model="description" id="description"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" ></Textarea>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitCpuClockSpeed" class="bg-indigo-600 text-white"
                    autofocus />
            </template>
        </Dialog>
        <!-- <Toast /> -->
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useMeasurementStore } from '../../../store';
import { useToast } from 'primevue/usetoast';

import Button from 'primevue/button';
const props = defineProps({
    invoiceId: String,
    expenseId: String
})

const toast = useToast();
const measurementStore = useMeasurementStore();

const speed = ref(null)
const description = ref(null)

const displayModal = ref(false)
const bandwidthModal = computed(() => measurementStore.modal)

watch(bandwidthModal, value => {
    if (bandwidthModal.value == 'cpuclockspeed') displayModal.value = true;
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

async function submitCpuClockSpeed() {
    const payload = {
        id: 0,
        speed: speed.value,
        description: description.value ?? "",
        status: "Active"
    }

    return await measurementStore.saveClockSpeed(payload)
}

</script>