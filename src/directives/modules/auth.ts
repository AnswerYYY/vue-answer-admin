/**
 * v-auth
 * 按钮权限
 **/
import { Directive, DirectiveBinding } from 'vue'
import { hasAuth } from '@/router/utils'
const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding
    if (value) {
      if (!hasAuth(value)) el.remove()
    } else {
      throw new Error("need auths! Like v-auth=\"['btn_add','btn_edit']\"")
    }
  }
}
export default auth
