/**
 * 判断是否为空
 */
export function isEmpty(value: any): boolean {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (value === 0 || isNaN(value)) return true
      break
    case 'object':
      if (value === null || value.length === 0) return true
      for (const i in value) {
        return false
      }
      return true
  }
  return false
}

export function converToUrl(requestParams: object): string {
  const params: any[] = []
  Object.entries(requestParams).forEach(([key, value]) => {
    const param = key + '=' + value
    params.push(param)
  })
  return '?' + params.join('&')
}
