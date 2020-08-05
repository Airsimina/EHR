<template>
  <div>
    <iframe id="ifm" :src="src" width="100%" height="100%" frameborder="0" sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      src: ''
    }
  },
  methods: {
    getIframeHeight () {
      let ifm = document.getElementById('ifm')
      console.log(document.getElementsByClassName('single')[0].clientHeight)
      ifm.height = document.documentElement.clientHeight - document.getElementsByClassName('single')[0].clientHeight
    }
  },
  created () {
    document.title = '申请'
  },
  mounted () {
    this.src = this.$route.query.src || ''
    this.getIframeHeight()
    console.log(this.src)
  },
}
</script>