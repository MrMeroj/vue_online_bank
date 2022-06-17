<template>
  <div v-if="message" :class="['alert', message.type]">
    <p class="alert-title">{{ title }}</p>
    <p>{{ message.value }}</p>
    <span class="alert-close" @click="close">&times;</span>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore()

    const TITLE_MAP = {
      primary: 'Успешно!',
      danger: 'Ошибка!',
      warning: 'Внимание!',
    }

    const message = computed(() => store.state.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    const close = () => {
      store.commit('clearMessage')
    }

    return { message, title, close }
  }
}
</script>
