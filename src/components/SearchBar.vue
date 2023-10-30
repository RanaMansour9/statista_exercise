<template>
<div class="flex">
    <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" v-model="searchTerm" placeholder="Search for statistics" type="text" />
    <button type="button" class="text-white rounded-md  bg-blue-700 ml-3 p-3" @click="fetchData()">
        Search
    </button>
    </div>
</template>

<script>
export default {
data () {
    return {
    searchTerm: 'statista',
    }
},
props: {
    searchResults: {
    type: String,
    default: null
    }
},
methods: {
    fetchData () {
    fetch('https://cdn.statcdn.com/static/application/search_results.json', {
            method: 'GET',
        })
        .then(response => {
        response.json().then(res =>
        this.$emit('setSearchResults', res)
        )
        })
        .catch(err => {
        console.error(err);
        })

    }
}

}
</script>



<style scoped>
</style>
