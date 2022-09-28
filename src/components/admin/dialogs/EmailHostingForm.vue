<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div>
        <Dialog header="Email Hosting" v-model:visible="displayModal" @hide="closeModal"
            :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '40vw' }" :modal="true">
            <div class="w-full">
                <div class="space-y-4 w-full">
                    <div class="w-full">
                        <label for="plan" class="block text-sm font-medium text-gray-700">Email Plan</label>
                        <Dropdown v-model="emailPlanId" :showClear="true" :filter="true" :options="emailPlans"
                            optionValue="id" optionLabel="id" placeholder="Select a plan"
                            class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="ids" class="block text-sm font-medium text-gray-700">Email Ids</label>
                        <Dropdown v-model="emailIdsId" :showClear="true" :filter="true" :options="emailIds"
                            optionValue="id" optionLabel="ids" placeholder="Select email Ids"
                            class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="plan" class="block text-sm font-medium text-gray-700">Email Space</label>
                        <Dropdown v-model="emailSpaceId" :showClear="true" :filter="true" :options="emailSpaces"
                            optionValue="id" optionLabel="totalSpace" placeholder="Select email space"
                            class=" w-full border border-gray-300 rounded-md shadow-sm px-3 focus:outline-none  focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full">
                        <label for="size" class="block text-sm font-medium text-gray-700">Webmail</label>
                        <InputText type="text" v-model="webmail" id="size"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div>
                    <div class="w-full field-checkbox">
                        <Checkbox inputId="isPop3" v-model="isPop3" :binary="true" />
                        <label for="isPop3">PoP3</label>
                    </div>
                    <div class="w-full field-checkbox">
                        <Checkbox inputId="isImap" v-model="isImap" :binary="true" />
                        <label for="isImap">IMaP</label>
                    </div>
                    <div class="w-full field-checkbox">
                        <Checkbox inputId="isSmtp" v-model="isSmtp" :binary="true" />
                        <label for="isSmtp">SMTP</label>
                    </div>
                    <div class="w-full field-checkbox">
                        <Checkbox inputId="isMobileSupport" v-model="isMobileSupport" :binary="true" />
                        <label for="isMobileSupport">Mobile Support</label>
                    </div>
                    <div class="w-full field-checkbox">
                        <Checkbox inputId="isOutlookSupport" v-model="isOutlookSupport" :binary="true" />
                        <label for="isOutlookSupport">Outlook Support</label>
                    </div>
                    <!-- <div class="w-full">
                        <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
                        <InputText type="number" v-model="amount" id="amount"
                            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:blue-border sm:text-sm" />
                    </div> -->
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeModal"
                    class="p-button-outline p-button-secondary" />
                <Button label="Add Item" icon="pi pi-check" @click="submitEmailHosting" class="blue-bg text-white"
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

const emailPlans = ref(computed(() => measurementStore.emailPlans))
const emailSpaces = computed(() => measurementStore.emailSpaces)
const emailIds = computed(() => measurementStore.emailIds)

const emailPlanId = ref(null)
const emailIdsId = ref(null)
const emailSpaceId = ref(null)
const webmail = ref(null)
const isPop3 = ref(null)
const isImap = ref(null)
const isSmtp = ref(null)
const isMobileSupport = ref(null)
const isOutlookSupport = ref(null)
const amount = ref(null)
const displayModal = ref(false)
const modal = computed(() => measurementStore.modal)

const id = ref(0)
const editItem = ref(computed(() => measurementStore.editEmailHosting))
const editItemData = ref(computed(() => measurementStore.editEmailHostingData))
watch(modal, value => {

    if (editItem.value === true) {
        id.value = editItemData.value.id
        emailPlanId.value = editItemData.value.emailPlanId
        emailSpaceId.value = editItemData.value.emailSpaceId
        emailIdsId.value = editItemData.value.emailIdsId
        webmail.value = editItemData.value.webmail
        isPop3.value = editItemData.value.isPop3
        isImap.value = editItemData.value.isImap
        isSmtp.value = editItemData.value.isSmtp
        isMobileSupport.value = editItemData.value.isMobileSupport
        isOutlookSupport.value = editItemData.value.isOutlookSupport
    }
    if (modal.value == 'emailhosting') displayModal.value = true;
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

async function submitEmailHosting() {
    const payload = {
        id: 0,
        emailPlanId: emailPlanId.value,
        emailIdsId: emailIdsId.value,
        emailSpaceId: emailSpaceId.value,
        webmail: webmail.value,
        isPop3: isPop3.value,
        isImap: isImap.value,
        isSmtp: isSmtp.value,
        isMobileSupport: isMobileSupport.value,
        isOutlookSupport: isOutlookSupport.value,
        // amount: amount.value
    }

    if (editItem === true) {
        return measurementStore.updateEmailHosting(payload)
    } else {
        return measurementStore.saveEmailHosting(payload)
    }
}

</script>