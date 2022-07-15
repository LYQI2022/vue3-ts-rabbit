import { h, render } from "vue";
import message from './message.vue'

type Options = {
  type: 'success' | 'error' | 'warning'
  text: string
  duration?: number
}

export function Message({ type, text, duration = 3000}: Options) {
  // 创建一个 div 标签用来包裹虚拟 DOM ，避免和 body 直接接触，可以创建多个虚拟 DOM
 const div = document.createElement('div')
  // 给 div 加上类名
 div.setAttribute('class', 'xtx-message-container')
  // 将 div 挂载到 body 上
 document.body.appendChild(div)

  // h 函数创建虚拟 DOM
 const vnode = h(message, {type, text})
  // render 函数将虚拟 DOM 渲染到页面
 render(vnode, div)

  // 开启定时器，让标签自动消失
  setTimeout(() => {
    // 调用 render 函数，传入 null ，移除挂载在 div 上的虚拟 DOM 
    render(null, div)
    // 删除 div
    div.remove()
  }, duration);
}

// 优化访问的方法: Message.success()
Message.success = function(text: string, duration: number = 2000) {
  Message({
    type: 'success',
    text,
    duration
  })
}

Message.error = function(text: string, duration: number = 2000) {
  Message({
    type: 'error',
    text,
    duration
  })
}

Message.warning = function(text: string, duration: number = 2000) {
  Message({
    type: 'warning',
    text,
    duration
  })
}