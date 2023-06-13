import { nextTick } from 'vue'
import * as elIcons from '@element-plus/icons-vue'
export interface IconFontName {
  icon: string
  name: string
}
// 获取本地svg
export function getLocalIconfontNames() {
  return new Promise<IconFontName[]>((resolve, reject) => {
    nextTick(() => {
      let iconfonts: IconFontName[] = []

      const svgEl = document.getElementById('local-icon')
      if (svgEl?.dataset.iconName) {
        iconfonts = (svgEl?.dataset.iconName as string).split(',').map((e) => ({
          name: e.replace('local-', ''),
          icon: e
        }))
      }

      if (iconfonts.length > 0) {
        resolve(iconfonts)
      } else {
        reject('No Local Icons')
      }
    })
  })
}
// 获取elementplus icon
export function getElementPlusIconfontNames() {
  return new Promise<IconFontName[]>((resolve, reject) => {
    nextTick(() => {
      const iconfonts: IconFontName[] = []
      const icons = elIcons as any

      for (const i in icons) {
        iconfonts.push({
          icon: `el-icon-${icons[i].name}`,
          name: icons[i].name
        })
      }
      if (iconfonts.length > 0) {
        resolve(iconfonts)
      } else {
        reject('No ElementPlus Icons')
      }
    })
  })
}
// 获取iconfont
export function getIconfontNames() {
  return new Promise<IconFontName[]>((resolve, reject) => {
    const iconfonts: IconFontName[] = []
    import(`../../assets/iconfont/iconfont.json`)
      .then((data) => {
        if (data) {
          const { glyphs } = data.default
          glyphs.forEach((e: any) => {
            iconfonts.push({
              name: e.name,
              icon: `iconfont icon-${e.font_class}`
            })
          })
          resolve(iconfonts)
        } else {
          reject('No Iconfont Icons')
        }
      })
      .catch(() => {
        reject('No Iconfont Icons')
      })
  })
}
