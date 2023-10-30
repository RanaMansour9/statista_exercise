<template>
    <div class="mb-8 flex flex-row-reverse">
        <input
            v-model="searchWords"
            class="search bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ml-2" 
            type="search"
            placeholder="Search title or subject..."
            :input="searchWordsUpdate()"
        />
        <button v-show="!showEndDate" type="button" class="showFilter flex text-white rounded-md  bg-blue-700 mx-3 p-3" @click="toggleEndDateFilter()">
            <img class="mr-2" src="../assets/calendar.svg" width="20" height="150" />
            <span> End Date </span>
        </button>
        <button v-show="!showStartDate" type="button" class="showFilter flex text-white rounded-md  bg-blue-700 ml-3 p-3 flex flex-row" @click="toggleStartDateFilter()">
            <img class="mr-2" src="../assets/calendar.svg" width="20" height="150" />
            <span> Start Date </span>
        </button>
        <div v-show="showEndDate" class="flex items-center">
            <span class="font-semibold mr-2"> End Date: </span> 
            <input type="date" v-model="endDate" class="cursor-pointer mr-2"/>
            <button class="mr-8 cursor-pointer hover:bg-slate-100 " @click="toggleEndDateFilter()">
                <img src="../assets/close.svg" width="15" height="150" />
            </button>
        </div>
        <div v-show="showStartDate" class="flex items-center">
            <span class="font-semibold mr-2"> Start Date: </span>
            <input type="date" v-model="startDate" class="cursor-pointer mr-2"/>
            <button class="mr-8 cursor-pointer hover:bg-slate-100"  @click="toggleStartDateFilter()">
                <img src="../assets/close.svg" width="15" height="150" />
            </button>
        </div>
    </div>
</template>


<script>
export default {
data () {
    return {
        startDate: null,
        endDate: null,
        showStartDate: false,
        showEndDate: false,
        searchWords: ''
    }
},
props: {
    tableData: {
    type: Object,
    default: null
    },
},
computed: {
},
methods: {
    toggleStartDateFilter () {
        this.showStartDate = !this.showStartDate
        if (!this.showStartDate) this.startDate = null
    },
    toggleEndDateFilter () {
        this.showEndDate = !this.showStartDate 
        if (!this.showEndDate) this.endDate = null
    },
    searchWordsUpdate() {
        this.$emit('setSearchWordsFilter', this.searchWords)
    }
},
updated () {
    this.$emit('setStartDateFilter', this.startDate)
    this.$emit('setEndDateFilter', this.endDate)
}

}
</script>


<style scoped>
input.search {
  max-width: 300px;
  padding: 9px 4px 9px 40px;
  background: transparent url("../assets/search.svg") no-repeat 10px center;
}

button .showFilter {
    min-width: 125px;
}
</style>