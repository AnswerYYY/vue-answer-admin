import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
// “globEager”已弃用
// const modules = import.meta.globEager('./**/*.ts')

// 由于Vite的import.meta.glob类型最后更改为unknown，导致default会报错
const modules: Record<string, any> = import.meta.glob('./**/*.ts', { eager: true })

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) {
    return
  }
  mockModules.push(...modules[key].default)
})

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
