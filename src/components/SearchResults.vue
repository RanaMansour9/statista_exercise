<template>
<section class="mt-10">
    <div v-if="!computedResults"  class="panelCard padding-all-20">No Results</div>
    <ResultsTable
        v-else
        :tableHeaders="tableHeaders"
        :tableData="computedResults"
    />
</section>
</template>

<script>
import ResultsTable from './ResultsTable.vue'

export default {
components: {
    ResultsTable
},
data () {
    return {
        tableHeaders: ["Image", "Date", "Title", "Subject", "Description"]
    }
},
props: {
    results: {
    type: Object,
    default: null
    }
},
computed: {
    rows() {
        return this.items.length
    },
    computedResults () {
    // console.log('results', this.results.items)        
    return this.results.items
    }
},
methods: {
 
}

}
</script>



<style scoped>
</style>
