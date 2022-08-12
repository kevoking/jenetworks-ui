<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="VPS" v-model:visible="displayModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Processor Type</label>
                            <Dropdown :showClear="true" :filter="true" v-model="selectedProcesserType" :options="processerTypes" optionValue="id" optionLabel="type" placeholder="Select a Processor Type" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">CPU Type</label>
                            <Dropdown :showClear="true" :filter="true" v-model="selectedCpuType" :options="cpuTypes" optionValue="id" optionLabel="name" placeholder="Select a CPU Type" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Clock Speed</label>
                            <Dropdown :showClear="true" :filter="true" v-model="selectedCpuClockSpeed" :options="cpuClockSpeeds" optionValue="id" optionLabel="speed" placeholder="Select a Clock Speed" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Ram Size</label>
                            <Dropdown :showClear="true" :filter="true" v-model="selectedRam" :options="rams" optionValue="id" optionLabel="size" placeholder="Select a Ram Size" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Rom Size</label>
                            <Dropdown :showClear="true" :filter="true" v-model="selectedRom" :options="roms" optionValue="id" optionLabel="size" placeholder="Select a Rom Size" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Rom Type</label>
                            <Dropdown :showClear="true" :filter="true" v-model="selectedRomType" :options="romTypes"  placeholder="Select a Rom Type" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                        </div>
                    </div>
                    <div class="">
                        <label for="description" class="block text-sm font-medium text-gray-700">Bandwidth</label>
                        <Dropdown :showClear="true" :filter="true" v-model="selectedBandwidth" :options="bandwidths" optionValue="id" optionLabel="size" placeholder="Select a Bandwidth" class="block w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="ips" class="block text-sm font-medium text-gray-700">IP's</label>
                        <InputText type="text" v-model="selectedIps" id="ips"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Save" icon="pi pi-check" @click="submitVps" class="bg-indigo-600 text-white"
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

const romTypes = ['SSD', 'HHD'];
const processerTypes = computed(() => measurementStore.processerTypes)
const cpuTypes = computed(() => measurementStore.cpuTypes)
const cpuClockSpeeds = computed(() => measurementStore.cpuClockSpeeds)
const rams = computed(() => measurementStore.rams)
const roms = computed(() => measurementStore.roms)
const bandwidths = computed(() => measurementStore.bandwidths)

const selectedProcesserType = ref(null)
const selectedCpuType = ref(null)
const selectedCpuClockSpeed = ref(null)
const selectedRam = ref(null)
const selectedRom = ref(null)
const selectedRomType = ref(null)
const selectedBandwidth = ref(null)
const selectedIps = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    if (modal.value == 'vps') displayModal.value = true;
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

async function submitVps() {
    const payload = {
        id: 0,
        processorTypeId: selectedProcesserType.value,
        cpuTypeId: selectedCpuType.value,
        cpuClockSpeedId: selectedCpuClockSpeed.value,
        ramSizeId: selectedRam.value,
        romType: selectedRomType.value,
        romSizeId: selectedRom.value,
        bandWidthSizeId: selectedBandwidth.value,
        ips: selectedIps.value,
        status: "Active"
    }

    return await measurementStore.saveVps(payload)
}

</script>