<template>
    <div class="max-w-7xl bg-white rounded-md border border-gray-300 mx-auto my-4 overflow-hidden">
        <DataTable :value="bandwidths" :paginator="true" :rows="10"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            :rowsPerPageOptions="[10,20,50]" responsiveLayout="scroll"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
            <Column field="size" header="Size"></Column>
            <Column field="description" header="Description"></Column>
            <Column field="status" header="Status"></Column>
        </DataTable>
    </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useMeasurementStore } from '../../../store';

export default {
    setup() {
        const measurementStore = useMeasurementStore();
        onMounted(() => {
            measurementStore.getBandwidths();
        })

        const bandwidths = computed(() => measurementStore.bandwidths);

        return {
            bandwidths
        }
    }
}
</script>

