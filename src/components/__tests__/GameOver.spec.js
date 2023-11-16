import { it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import GameOver from '../GameOver.vue'


const wrapper = shallowMount(GameOver)

it("Test GameOver component props", async () => {
    expect(wrapper.text()).toMatch('is this GAME WINNER !!')
});

it("Test if data is a function", () => {
    expect(typeof GameOver.data).toBe("function");
});

it('Snapshot track of changes UI testing', () => {
    expect(wrapper.text()).toMatchSnapshot()
})

it('Check winnerName', () => {
    expect(wrapper.vm.winnerName).toEqual(null)
})

it("Play Again button clicked", async () => {
    await wrapper.get("button").trigger("click")
    wrapper.vm.handleClick()
    expect(wrapper.emitted('restartGame')).toBeTruthy()
 })
