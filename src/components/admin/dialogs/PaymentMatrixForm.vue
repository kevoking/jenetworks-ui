<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Payment Matrix" v-model:visible="displayModal" @hide="closeModal" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
            :style="{ width: '40vw' }" :modal="true">
            <div class="">
                <div class="space-y-4">
                    <div class="grid grid-cols-1 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">VPS</label>
                            <Dropdown v-model="selectedVps" :options="vpsList" :showClear="true" :filter="true" optionLabel="id" placeholder="Select a VPS" class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" >
                                <template #value="slotProps">
                                    <div class="country-item country-item-value" v-if="slotProps.value">
                                        <div>{{slotProps.value.processorType.type}}/{{slotProps.value.ramSize.size}} RAM/{{slotProps.value.romSize.size}}/{{slotProps.value.bandWidthSize.size}} Bandwidth</div>
                                    </div>
                                    <span v-else>
                                        {{slotProps.placeholder}}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="country-item">
                                        <div>{{slotProps.option.processorType.type}}/{{slotProps.option.ramSize.size}} RAM/{{slotProps.option.romSize.size}}/{{slotProps.option.bandWidthSize.size}} Bandwidth</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Dedicated Server</label>
                            <Dropdown v-model="selectedServer" :showClear="true" :filter="true" :options="dedicatedServers" optionLabel="id" placeholder="Select a Dedicated Server" class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" >
                                <template #value="slotProps">
                                    <div class="country-item country-item-value" v-if="slotProps.value">
                                        <div>{{slotProps.value.processorType.type}}/{{slotProps.value.ramSize.size}} RAM/{{slotProps.value.romSize.size}}/{{slotProps.value.bandWidthSize.size}} Bandwidth</div>
                                    </div>
                                    <span v-else>
                                        {{slotProps.placeholder}}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="country-item">
                                        <div>{{slotProps.option.processorType.type}}/{{slotProps.option.ramSize.size}} RAM/{{slotProps.option.romSize.size}}/{{slotProps.option.bandWidthSize.size}} Bandwidth</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                        <div class="">
                            <label for="size" class="block text-sm font-medium text-gray-700">Email Plan</label>
                            <Dropdown v-model="selectedEmailPlan" :showClear="true" :filter="true" :options="emailPLanList" optionLabel="id" placeholder="Select email plan" class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" >
                                <template #value="slotProps">
                                    <div class="country-item country-item-value" v-if="slotProps.value">
                                        <div>{{slotProps.value.name}}</div>
                                    </div>
                                    <span v-else>
                                        {{slotProps.placeholder}}
                                    </span>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                    <div class="">
                        <label for="description" class="block text-sm font-medium text-gray-700">Operating System</label>
                        <Dropdown v-model="selectedOs" :showClear="true" :filter="true" :options="operatingSystems" optionValue="id" optionLabel="name" placeholder="Select a Operaing System" class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="">
                        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                        <InputText type="text" v-model="amount" id="ips"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Save" icon="pi pi-check" @click="submitPaymentMatrix" class="blue-bg text-white"
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

measurementStore.getDedicatedServers()
measurementStore.getOperatingSystems()
measurementStore.getVpsList()
// measurementStore.getShar
measurementStore.getEmailPlans()

const dedicatedServers = ref(computed(() => measurementStore.dedicatedServers.filter(e => e.status === 'Active')))
const operatingSystems = ref(computed(() => measurementStore.operatingSystems.filter(e => e.status === 'Active')))
const vpsList = ref(computed(() => measurementStore.vpsList.filter(e => e.status === 'Active')))
const sharedHostingList = ref(computed(() => measurementStore.sharedHostingList.filter(e => e.status === 'Active')))
const emailPLanList = ref(computed(() => measurementStore.emailPlans.filter(e => e.status === 'Active')))

const selectedServer = ref(null)
const selectedOs = ref(null)
const selectedVps = ref(null)
const selectedHosting = ref(null)
const selectedEmailPlan = ref(null)
const amount = ref(null)

const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

watch(modal, value => {
    if (modal.value == 'paymentmatrix') displayModal.value = true;
})

// watch(payment, value => {
//   toast.add({severity:'success', summary: 'Payment Successful', life: 3000});
// })
watch(displayModal, value => {
    if (displayModal.value == false) measurementStore.modal = null;
})
const openModal = () => {
    displayModal.value = true;
};
const closeModal = () => {
    displayModal.value = false;
    measurementStore.modal = null;
}

async function submitPaymentMatrix() {
    const payload = {
        id: 0,
        vpsId: selectedVps.value?.id ?? 0,
        dedicatedServerId: selectedServer.value?.id ?? 0,
        osId: selectedOs.value,
        sharedHostingId: selectedHosting.value?.id ?? 0,
        emailPlanId: selectedEmailPlan.value?.id ?? 0,
        amount: amount.value
    }

    return measurementStore.savePaymentMatrix(payload)
}

</script>