import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { renderWithQiankun, qiankunWindow, type QiankunProps } from 'vite-plugin-qiankun/dist/helper'

import App from './App.vue'
import router from './router'

let app: App<Element>
function render(props: QiankunProps) {
  const { container } = props

  app = createApp(App)

  app.use(createPinia())
  app.use(router)

  app.mount(container)
}

// 独立运行时
if (qiankunWindow.__POWERED_BY_QIANKUN__) {
  console.log('[mat-cloud-qiankun-vuejs] is microapp')

  renderWithQiankun({
    mount(props: QiankunProps) {
      console.log('[mat-cloud-qiankun-vuejs] [mount]', props)
      render(props)
    },
    bootstrap() {
      console.log('[mat-cloud-qiankun-vuejs] [bootstrap]')
    },
    update(props: QiankunProps) {
      console.log('[mat-cloud-qiankun-vuejs] [update]', props)
    },
    unmount(props: QiankunProps) {
      console.log('[mat-cloud-qiankun-vuejs] [unmount]', props)
      app?.unmount()
    }
  })
}
