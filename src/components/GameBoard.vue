<template>
<div>
    <GameOver v-if="isGameOver" :winnerName="theWinner" @restartGame="restartGame" @resetWinnerName="resetWinnerName" />
    <p class="flex justify-center mt-10 mb-12 text-2xl font-medium"> The GAME winner is the one who gets 3 WINS in a row </p>
    <div class="flex p-10">
        <div v-if="boardResetNeeded" class="flex flex-col items-center justify-center w-full h-full p-5 m-5 text-2xl bg-gray-200">
            {{theWinner}} WON ROUND <p> Press <span class="text-sky-600"> Reset Board </span> to continue </p>
        </div>
        <div v-else class="flex flex-col items-end w-full mx-5">
            <div class="flex" v-for="(row,rowIndex) in rows" :key="rowIndex">
                <button
                    v-for="(col, colIndex) in columns"
                    :key="colIndex"
                    class="text-3xl font-medium border-2 w-36 h-36 border-slate-500 hover:bg-slate-200"
                    @click="boardUpdate(row, col)"
                    >
                        {{ cells[row-1][col-1] }}
                </button>
            </div>
        </div>
        <div class="flex flex-col items-center justify-center w-full">
            <p class="mt-12 mb-4 text-2xl font-medium"> Stats: </p>
            <p class="text-2xl"> X wins: {{ player1score }} </p>
            <p class="text-2xl"> Y wins: {{ player2score }} </p>
            <button
                class="p-5 mt-5 text-white rounded-md bg-sky-600 w-36"
                :class="{'opacity-50': !boardResetNeeded}"
                :disabled="!boardResetNeeded"
                @click="resetBoard"
            >
                Reset Board
            </button>
            <button class="p-5 my-5 text-white rounded-md bg-neutral-600 w-36" @click="restartGame">Restart Game</button>
        </div>
    </div>
</div>
</template>

<script>
import GameOver from './GameOver.vue'

export default {
name: 'GameBoard',
components: {
    GameOver
},
data () {
    return {
        columns: 3,
        rows: 3,
        cells: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        gameSymbols: ['X', 'O'],
        player1Turn: false,
        player2Turn: false,
        player1score: 0,
        player2score: 0,
        theWinner: '',
        isGameOver: false,
        rowWinner: 0,
        previousWinner: '',
        boardResetNeeded: false
    }
},
props: {
},
computed: {
},
methods: {
    boardUpdate (row, col) {
        if(this.player1Turn && this.cells[row-1][col-1] === "") this.cells[row-1][col-1] = this.gameSymbols[0]
        if(this.player2Turn && this.cells[row-1][col-1] === "") this.cells[row-1][col-1] = this.gameSymbols[1]
        if (!this.checkCellsFull()) {
            this.checkWinnerExists(row-1,col-1)
            return
        }
        if (this.checkCellsFull() && !this.checkWinnerExists(row-1,col-1)) this.checkTieGameOver()
    },
    checkWinnerExists (row,col) {
       if (this.existsRowWinner(row) || this.existsColumnWinner(col) || this.existsDiagWinner()) {
           if (this.player1Turn) {
               this.theWinner = 'Player 1 ( X )'
               this.player1score += 1
               this.boardResetNeeded = true
               this.checkPrevoiusWinner()
               return true
           }
           if (this.player2Turn) {
               this.theWinner = 'Player 2 ( O )'
               this.player2score += 1
               this.boardResetNeeded = true
               this.checkPrevoiusWinner()
               return true
           }
       }
       return false
    },
    checkPrevoiusWinner () {
         if (this.previousWinner === "" || this.previousWinner === this.theWinner) {
            this.rowWinner += 1
        } else {
             this.rowWinner = 1
        }

        this.previousWinner = this.theWinner
    },
    existsRowWinner (row) {
        if (this.cells[row][0] !== "" && this.cells[row][1] !==  "" && this.cells[row][2] !== "") {
            if (this.cells[row][0] === this.cells[row][1] && this.cells[row][1] === this.cells[row][2]) {
                return true
            }
        }
        return false
    },
    existsColumnWinner (col) {
         if (this.cells[0][col] !== "" && this.cells[1][col] !== "" && this.cells[2][col] !== "") {
             if (this.cells[0][col] === this.cells[1][col] && this.cells[1][col] === this.cells[2][col]) return true 
         }
         return false
    },
    existsDiagWinner () {
        if (this.cells[0][0] !== "" && this.cells[1][1] !== "" && this.cells[2][2] !== "") {
            if (this.cells[0][0] === this.cells[1][1] && this.cells[1][1] === this.cells[2][2]) return true 
        }
        if (this.cells[0][2] !== "" && this.cells[1][1] !== "" && this.cells[2][0] !== "") {
            if (this.cells[0][2] === this.cells[1][1] && this.cells[1][1] === this.cells[2][0]) return true
        }
        return false
    },
    checkCellsFull () {
        for (const row of this.cells) {
            for (const col of row) {
                if (col === "") return false
            }
        }
        return true
    },
    checkTieGameOver() {
        this.isGameOver = true
        this.theWinner = 'No Player'
    },
    resetBoard () {
        this.cells = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]
        this.boardResetNeeded = false
        this.player1Turn = !this.player1Turn
        this.player2Turn = !this.player2Turn
    },
    resetGameValues () {
        this.player1score = 0
        this.player2score = 0
        this.rowWinner = 0
        this.player1Turn = false
        this.player2Turn = true
    },
    restartGame () {
        this.isGameOver = false
        this.resetBoard()
        this.resetGameValues()
    },
    resetWinnerName () {
        this.theWinner = ""
        this.previousWinner = ""
    },
},
updated () {
    if (this.theWinner !== "" && this.rowWinner === 3) {
        this.isGameOver = true
        this.rowWinner = 0
        return
    }
    this.player1Turn = !this.player1Turn
    this.player2Turn = !this.player2Turn
},
mounted () {
    this.player1Turn = true
}

}
</script>



<style scoped>
</style>
