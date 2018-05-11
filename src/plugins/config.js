import fetch from '@/utils/fetch'
let MyPlugin = {};
MyPlugin.install = function (Vue, options) {
    Vue.config.errorHandler = function (err, vm, info) {
        console.log(err)
        console.log(vm)
        console.log(info)
    }
    Vue.config.productionTip = false
    Vue.prototype.$axios = fetch
    Vue.prototype.log = (message, type = 'log') => {
        console[type](message);
    }
    Vue.prototype.json = (data) => {
        return JSON.parse(data)
    }
}
export default MyPlugin;