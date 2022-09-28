<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Shared Hosting" v-model:visible="displayModal"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
            <div class="w-full">
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label for="size" class="block text-sm font-medium text-gray-700">Control Panel</label>
                        <InputText type="text" v-model="controlPanel" id="size"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="size" class="block text-sm font-medium text-gray-700">Hosted Domain</label>
                        <InputText type="number" v-model="hostedDomain" id="size"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="plan" class="block text-sm font-medium text-gray-700">Rom Size</label>
                        <Dropdown v-model="romSizeId" :showClear="true" :filter="true" :options="romSizeList"
                            optionValue="id" optionLabel="size" placeholder="Select a plan"
                            class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="ids" class="block text-sm font-medium text-gray-700">Bandwidth</label>
                        <Dropdown v-model="bandwidthId" :showClear="true" :filter="true" :options="bandwidths"
                            optionValue="id" optionLabel="size" placeholder="Select email Ids"
                            class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="plan" class="block text-sm font-medium text-gray-700">Email IDs</label>
                        <Dropdown v-model="emailId" :showClear="true" :filter="true" :options="emailIds"
                            optionValue="id" optionLabel="ids" placeholder="Select email space"
                            class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="size" class="block text-sm font-medium text-gray-700">No Of Files</label>
                        <InputText type="number" v-model="noOfFiles" id="size"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full field-checkbox">
                        <Checkbox inputId="isPop3" v-model="isMultiDomain" :binary="true" />
                        <label for="isPop3">Multi Domain</label>
                    </div>
                    <div class="w-full">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <InputText type="text" v-model="description" id="description"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitSharedHosting" class="blue-bg text-white"
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
    edit: Boolean,
    item: Object
})

const toast = useToast();
const measurementStore = useMeasurementStore();

const emailIds = ref(computed(() => measurementStore.emailIds))
const romSizeList = computed(() => measurementStore.roms)
const bandwidths = computed(() => measurementStore.bandwidths)

const controlPanel = ref(null)
const hostedDomain = ref(null)
const romSizeId = ref(null)
const bandwidthId = ref(null)
const emailId = ref(null)
const isMultiDomain = ref(null)
const noOfFiles = ref(null)
const description = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    if (modal.value == 'sharedhosting') displayModal.value = true;
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

async function submitSharedHosting() {
    const payload = {
        id: 0,
        controlPanel: controlPanel.value,
        hostedDomain: hostedDomain.value,
        romSizeId: romSizeId.value,
        bandWidthSizeId: bandwidthId.value,
        emailIdsId: emailId.value,
        noOfFiles: noOfFiles.value,
        isMultiDomain: isMultiDomain.value ?? false,
        description: description.value
    }

    return measurementStore.saveSharedHosting(payload)
}

</script>