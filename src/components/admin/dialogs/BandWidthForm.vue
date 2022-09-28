<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Bandwidth" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="">
                        <label for="size" class="block text-sm font-medium text-gray-700">Size</label>
                        <InputText type="text" v-model="size" id="size"
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
                <Button label="Add Item" icon="pi pi-check" @click="submitBandwidth" class="blue-bg text-white"
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

const id = ref(props.item?.id)
const size = ref(props.item?.size)
const description = ref(props.item?.description)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    console.log(props.item)
    if (modal.value == 'bandwidth') displayModal.value = true;
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
// if (props.edit) {
// console.log('>>>>>' + props.item?.id)
//     id.value = props.item?.id
//     size.value = props.item?.size
//     description.value = props.item?.description
// }

async function submitBandwidth() {
    const payload = {
        id: id.value,
        size: size.value,
        description: description.value ?? "",
        status: "Active"
    }

    return await measurementStore.saveBandwidth(payload)
}

</script>