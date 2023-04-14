<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Ram" v-model:visible="displayModal" @hide="closeModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
                        <InputText type="text" v-model="size" id="size"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea v-model="description" id="description"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  focus:blue-border sm:text-sm" ></Textarea>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitRam" class="blue-bg text-white"
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
const edit = ref(computed(() => measurementStore.editRam))
const editData = ref(computed(() => measurementStore.editRamData))

const id = ref(0)
const size = ref(null)
const description = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    if (edit.value === true) {
        id.value = editData.value.id
        size.value = editData.value.size
        description.value = editData.value.description
    }
    if (modal.value == 'ram') displayModal.value = true
    else displayModal.value = false
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

async function submitRam() {
    const payload = {
        id: id.value,
        size: size.value,
        description: description.value ?? "",
        status: "Active"
    }
    if (edit.value === true) {
        return measurementStore.updateRam(payload)
    } else {
    return measurementStore.saveRamSize(payload)
    }
}

</script>