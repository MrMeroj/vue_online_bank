<template>
  <component :is="layout" v-if="layout" />
</template>

<script>

import { computed } from 'vue'
import { useRoute } from 'vue-router'

import MainLayout from './layout/MainLayout.vue'
import AuthLayout from './layout/AuthLayout.vue'

export default {
  components: {
    MainLayout,
    AuthLayout,
  },
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout + '-layout')
    }
  },
}
</script>
