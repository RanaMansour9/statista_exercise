<template>
<div>
    <SearchHeader />
    <div class="px-5 py-9 flex flex-col h-full grow">
        <SearchBar @setSearchResults="setSearchResults" />
        <SearchResults :results="searchResults" />
    </div>
    <SearchFooter />
</div>
</template>

<script>
import SearchHeader from './SearchHeader.vue'
import SearchBar from './SearchBar.vue'
import SearchResults from './SearchResults.vue'
import SearchFooter from './SearchFooter.vue'

export default {
components: {
    SearchHeader,
    SearchBar,
    SearchResults,
    SearchFooter
},
data () {
    return {
    searchResults: 'No Results'
    }
},
props: {
},
methods: {
    setSearchResults (res) {
        this.searchResults = res
    }
}

}
</script>



<style scoped>
</style>
