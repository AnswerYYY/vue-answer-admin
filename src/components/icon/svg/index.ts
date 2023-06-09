// 从fs库导入读取文件和读取文件夹的函数
// fs库是node自带的，无需通过npm进行install
import { readFileSync, readdirSync } from 'fs'

// 定义一个变量以保存所有的icon文件名称
const iconNames: string[] = []

// 正则表达式处理svg
const svgTitle = /<svg([^>+].*?)>/
const clearHeightWidth = /(width|height)="([^>+].*?)"/g
const hasViewBox = /(viewBox="[^>+].*?")/g
const clearReturn = /(\r)|(\n)/g
const clearFill = /(fill="[^>+].*?")/g

// 读取svg文件
function findSvgFile(dir: string, perfix = 'local'): string[] {
  const svgRes = [] // 一个目录下所有的svg文件资源

  const dirents = readdirSync(dir, {
    withFileTypes: true
  })
  console.log(dirents)

  for (const dirent of dirents) {
    // 替换掉.svg文件后缀，然后存入预设的图标名称数组内
    iconNames.push(`${perfix}-${dirent.name.replace('.svg', '')}`)

    if (dirent.isDirectory()) {
      svgRes.push(...findSvgFile(dir + dirent.name + '/'))
    } else {
      // 读取svg文件内容，并对内容进行处理，组装为一个 symbol 元素，该元素的id属性是文件名称
      const svg = readFileSync(dir + dirent.name)
        .toString()
        .replace(clearReturn, '')
        .replace(clearFill, 'fill=""')
        .replace(svgTitle, ($1, $2) => {
          let width = 0
          let height = 0
          let content = $2.replace(clearHeightWidth, (s1: string, s2: string, s3: number) => {
            if (s2 === 'width') {
              width = s3
            } else if (s2 === 'height') {
              height = s3
            }
            return ''
          })
          if (!hasViewBox.test($2)) {
            content += `viewBox="0 0 ${width} ${height}"`
          }
          return `<symbol id="${perfix}-${dirent.name.replace('.svg', '')}" ${content}>`
        })
        .replace('</svg>', '</symbol>')
      svgRes.push(svg)
    }
  }
  return svgRes
}

// 插入所有svg
export const svgBuilder = (path: string, perfix = 'local') => {
  if (path === '') return

  // 使用以上定义的查找svg函数，获得所有的.svg文件内容
  const res = findSvgFile(path, perfix)
  return {
    name: 'svg-transform',
    transformIndexHtml(html: string) {
      return html.replace(
        '<body>',
        `
                <body>
                <svg id="local-icon" data-icon-name="${iconNames.join(
                  ','
                )}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0">
                ${res.join('')}
                </svg>
                `
      )
    }
  }
}
