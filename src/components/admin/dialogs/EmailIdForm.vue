<template>
    <div>
        <Dialog header="Email Id" v-model:visible="displayModal" @hide="closeModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="size" class="block text-sm font-medium text-gray-700">Ids</label>
                        <InputText type="text" v-model="ids" id="size"
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
                <Button label="Add Item" icon="pi pi-check" @click="submitEmailId" class="blue-bg text-white"
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

const ids = ref(null)
const description = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

const id = ref(0)
const editItem = ref(computed(() => measurementStore.editEmailId))
const editItemData = ref(computed(() => measurementStore.editEmailIdData))
watch(modal, value => {

    if (editItem.value === true) {
        id.value = editItemData.value.id
        ids.value = editItemData.value.ids
        description.value = editItemData.value.description
    }
    if (modal.value == 'emailid') displayModal.value = true;
})

const openModal = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
    measurementStore.modal = null;
}

async function submitEmailId() {
    const payload = {
        id: 0,
        ids: ids.value,
        description: description.value ?? "",
    }

    if (editItem === true) {
        return measurementStore.updateEmailId(payload)
    } else {
        return measurementStore.saveEmailId(payload)
    }
}

</script>