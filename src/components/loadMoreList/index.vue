<template>
  <div class="inner-load">
    <van-list
      v-model="loading"
      :offset="30"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadList"
    >
      <slot></slot>
    </van-list>
  </div>
</template>

<script>
export default {
  props: {
    finished: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    loadList() {
      this.$emit('load')
    }
  }
}
</script>

<style lang="scss" scoped>
.singlelist {
  width: 100%;
  height: 200px;
  background: #f7f7f7;
}

.inner-load {
  height: 100%;
}
</style>