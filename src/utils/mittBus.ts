import mitt from 'mitt'
type Events = {
  openSettingDrawer: boolean
  refreshPage: boolean
}
const mittBUs = mitt<Events>()
export default mittBUs
