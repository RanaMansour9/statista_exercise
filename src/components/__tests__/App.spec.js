import { it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'

it('check that GameBoard sub-component is rendered', () => {
    // render the component
    const wrapper = mount(App)

    // check that sub-components are rendered
    expect(wrapper.getComponent({ name: 'GameBoard' }).exists()).toBeTruthy()
})
