import Vue from 'vue'
const globalFilter = {
  textLength: function (text) {
    if (text.length > 3) {
      return text.substring(0, 2) + '...'
    } else {
      return text
    }
  }
}
Object.keys(globalFilter).forEach(key => {
  Vue.filter(key, globalFilter[key])
})