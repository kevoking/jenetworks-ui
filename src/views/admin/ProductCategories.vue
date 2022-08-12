<template>
    <div>
        <div class="py-6">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 class="text-2xl font-semibold text-gray-900">Categories</h1>
            </div>
            <div class="max-w-7xl mx-auto">
                <!-- Replace with your content -->
                <div class="mx-auto max-w-7xl my-4 flex justify-end items-center">
                    <button class="bg-orange-400 px-4 py-2 rounded-md" @click="toggleModal('productcategory')">Add
                        Category
                    </button>
                </div>
                <div class="bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
                    <DataTable :value="productCategories" :paginator="true" :rows="10" class="p-datatable-sm"
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        :rowsPerPageOptions="[10, 20, 50]" responsiveLayout="scroll"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
                        <Column field="name" header="Name"></Column>
                        <Column field="description" header="Description"></Column>
                        <Column field="status" header="Status"></Column>
                    </DataTable>
                </div>
                <!-- /End replace -->
            </div>
        </div>
        <ProductCategoryForm />
    </div>
</template>
<script setup>
import { computed, ref } from 'vue'
import { useMeasurementStore } from '../../store';
import ProductCategoryForm from '../../components/admin/dialogs/ProductCategoryForm.vue'

const measurementStore = useMeasurementStore();

measurementStore.getProductCategories()

const categories = computed(() => measurementStore.productCategories)
const productCategories = ref(categories)

function toggleModal(target) {
    measurementStore.modal = target
}
</script>