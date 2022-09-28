<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Email Plan" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="code" class="block text-sm font-medium text-gray-700">Code</label>
                        <InputText type="text" v-model="code" id="code"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <InputText type="text" v-model="name" id="name"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea v-model="description" id="description"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" ></Textarea>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitEmailPlan" class="blue-bg text-white"
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
    data: Object
})

const toast = useToast();
const measurementStore = useMeasurementStore();

const code = ref(null)
const name = ref(null)
const description = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    if (modal.value == 'emailplan') displayModal.value = true;
})

const openModal = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
    measurementStore.modal = null;
}

async function submitEmailPlan() {
    const payload = {
        id: 0,
        code: code.value,
        name: name.value,
        description: description.value ?? ""
    }

    return await measurementStore.saveEmailPlan(payload)
}

</script>