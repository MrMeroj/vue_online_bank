<template>
  <div class="sidebar" v-if="sidebar">
    <div class="sidebar-close" @click="close">&times;</div>
    <div class="sidebar-content">
      <p>Добро пожаловать в систему по учету заявок в нашем банке. Здесь вы найдете исчерпывающую информацию про систему и заявки</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const sidebar = computed(() => store.state.sidebar)

    const close = () => store.commit('closeSidebar')

    return { sidebar, close }
  }
}
</script>
