/* eslint-disable no-undef */
import Vconsole from 'vconsole'
// 判断是否为生产环境
let vConsole = ''
if (BUILD_TYPE !== 'PRO' && BUILD_TYPE !== 'dev') {
    vConsole = new Vconsole()
}
export default vConsole