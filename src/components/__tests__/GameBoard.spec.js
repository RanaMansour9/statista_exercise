import { it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GameBoard from '../GameBoard.vue'


const wrapper = shallowMount(GameBoard)

it("Test GameBoard component props", async () => {
    expect(wrapper.text()).toMatch('The GAME winner is the one who gets 3 WINS in a row')
});

it("Test if data is a function", () => {
    expect(typeof GameBoard.data).toBe("function")
});

it("Button clicked data boardResetNeeded check value", async () => {
    await wrapper.get("button").trigger("click")
    expect(wrapper.vm.boardResetNeeded).toEqual(false)
 })


it("Button clicked data isGameOver check value", async () => {
    await wrapper.get("button").trigger("click")
    expect(wrapper.vm.isGameOver).toEqual(false)
 })


it("Button clicked data rowWinner check value", async () => {
    await wrapper.get("button").trigger("click")
    expect(wrapper.vm.rowWinner).toEqual(0)
 })

it('Check that isGameOver sub-component is rendered', async () => {
    await wrapper.setData({ isGameOver: true })
    expect(wrapper.getComponent({ name: 'GameOver' }).exists()).toBeTruthy()
})

it("Button clicked boardUpdate", async () => {
    await wrapper.get("button").trigger("click")
    wrapper.vm.boardUpdate(1,1)
    expect(wrapper.vm.cells[0][0]).toEqual('X')
 })


it("Button clicked checkWinnerExists", async () => {
    await wrapper.get("button").trigger("click")
    await wrapper.vm.checkWinnerExists(0,0)
    expect(wrapper.vm.boardResetNeeded).toEqual(false)
 })


 it("Button clicked check Winner Name", async () => {
    await wrapper.setData({ cells: [
        ['O', '', ''],
        ['O', 'X', ''],
        ['O', '', 'X']
    ] })
    await wrapper.get("button").trigger("click")
    expect(wrapper.vm.theWinner).toEqual('Player 2 ( O )')
 })

it("Check checkCellsFull", async () => {
    await wrapper.setData({ cells: [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X']
    ] })
    await wrapper.vm.checkCellsFull()
    expect(wrapper.vm.checkCellsFull()).toBeTruthy()
 })


