<template>
<TableFilters
    :tableData="tableData"
    @setStartDateFilter="setStartDateFilter"
    @setEndDateFilter="setEndDateFilter"
    @setSearchWordsFilter="setSearchWordsFilter"
/>
<table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
            <th v-for="(header, index) in tableHeaders" :key=index scope="col" class="px-6 py-3">
                {{header}}
            </th>
        </tr>
    </thead>
    <tbody>
        <tr
            v-for="(result, index) in filteredData"
            :key="index"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 cursor-pointer"
            @click="openResultLink(result.link)"
            >
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img :src="result.teaser_image_urls[1].src" width="125" height="125" @error="setAltImg($event, result.image_url)" />
            </th>
            <td class="px-6 py-4">
                {{result.date}}
            </td>
            <td class="px-6 py-4">
                {{result.title}}
            </td>
            <td class="px-6 py-4">
                {{result.subject}}
            </td>
            <td class="px-6 py-4">
                {{result.description.slice(0,130) + '...'}}
            </td>
        </tr>
    </tbody>
</table>
</template>

<script>
import TableFilters from './TableFilters.vue'

export default {
components: {
    TableFilters
},
data () {
    return {
        startDate: null,
        endDate: null,
        searchWords: ''
    }
},
props: {
    tableHeaders: {
    type: Array,
    default: null
    },
    tableData: {
    type: Object,
    default: null
    },
},
computed: {
    filteredData(){
      if (this.startDate && !this.endDate && !this.searchWords) {
          return this.applyStartDateFilter(this.tableData)
      }

      if (!this.startDate && this.endDate && !this.searchWords) {
         return this.applyEndDateFilter(this.tableData)
      }

      if (!this.startDate && !this.endDate && this.searchWords) {
         return this.applySearchWordsFilter(this.tableData)
      }

      if (this.startDate && this.endDate && !this.searchWords) {
          const startDateFilterData =  this.applyStartDateFilter(this.tableData)
          return this.applyEndDateFilter(startDateFilterData)
      }

      if (this.startDate && !this.endDate && this.searchWords) {
          const startDateFilterData =  this.applyStartDateFilter(this.tableData)
          return this.applySearchWordsFilter(startDateFilterData)
      }

      if (!this.startDate && this.endDate && this.searchWords) {
          const endDateFilterData =  this.applyEndDateFilter(this.tableData)
          return this.applySearchWordsFilter(endDateFilterData)
      }

       if (this.startDate && this.endDate && this.searchWords) {
          const startDateFilterData =  this.applyStartDateFilter(this.tableData)
          const startEndDateFilterData =  this.applyEndDateFilter(startDateFilterData)
          return this.applySearchWordsFilter(startEndDateFilterData)
      }
      return this.tableData
    }
},
methods: {
    openResultLink (link) {
        window.open(link, '_blank')
    },
    setAltImg(event, link) {
        event.target.src = link
    },
    setStartDateFilter (value) {
        this.startDate = value
    },
    setEndDateFilter (value) {
        this.endDate = value
    },
    setSearchWordsFilter (value) {
        this.searchWords = value
    },
    applyStartDateFilter (inputData) {
        return inputData.filter(data => {
            var date = data.date
            return (date >= this.startDate)
          })
    },
    applyEndDateFilter (inputData) {
        return inputData.filter(data => {
            var date = data.date
            return (date <= this.endDate)
          })
    },
    applySearchWordsFilter (inputData) {
        return inputData.filter(data => {
            var title = data.title
            var subject = data.subject
            return (title.toLowerCase().includes(this.searchWords.toLowerCase())) || (subject.toLowerCase().includes(this.searchWords.toLowerCase()))
          })
    },
},
updated () {
}

}
</script>


<style scoped>
</style>