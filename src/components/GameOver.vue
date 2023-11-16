<template>
  <div class="fixed inset-0 z-40">
    <div class="flex items-center justify-center w-full h-full bg-gray-500 opacity-95">
        <div class="flex flex-col items-center">
            <p class="flex items-center justify-center mb-12 text-2xl"><span class="mr-2 font-medium text-green-600"> {{ winnerName }} </span> is this GAME WINNER !!</p>
            <div class="flex">
                <button class="p-5 text-white rounded-md bg-emerald-600 w-36" @click="handleClick()">Play Again</button>
            </div>
        </div>
    </div>
  </div>
</template>


<script>
export default {
name: 'GameOver',
components: {
},
data () {
    return {
    }
},
props: {
    winnerName: {
    type: String,
    default: null
    }
},
computed: {
},
methods: {
    handleClick () {
        this.$emit('restartGame')
    }
},
unmounted () {
    this.$emit('resetWinnerName')
}

}
</script>



<style scoped>
</style>
