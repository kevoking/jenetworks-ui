<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog :header="edit ? 'Edit Product Category' : 'Create Product Category'" v-model:visible="displayModal"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <InputText type="text" v-model="name" id="name"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                        <Textarea v-model="description" id="description"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  focus:blue-border sm:text-sm"></Textarea>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitProductCategory" class="blue-bg text-white"
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

const idd = ref(0)
const name = ref(null)
const description = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    if (modal.value == 'productcategory') displayModal.value = true
    else displayModal.value = false
})

watch(() => props.item, (currentValue, oldValue) => {
    if (currentValue) {
        idd.value = currentValue.id
        name.value = currentValue.name
        description.value = currentValue.description
    } else {
        idd.value = 0
        name.value = null
        description.value = null
    }
})

const openModal = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
    measurementStore.modal = null;
}

async function submitProductCategory() {
    const payload = {
        id: props.edit ? idd.value : 0,
        name: name.value,
        description: description.value ?? "",
        status: "Active"
    }

    if (props.edit === true) {
        return await measurementStore.updateProductCategory(payload)
    } else {
        return await measurementStore.saveProductCategory(payload)
    }
}

</script>