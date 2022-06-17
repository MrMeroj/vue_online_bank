<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заявка" v-else-if="request">  
    <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>: <app-status :type="request.status"></app-status></p>
    <div class="form-control">
      <label for="status">Статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn primary" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявка с ID = {{ id }} нет.
  </h3>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

import { currency } from '~/utils/currency'

import AppPage from '../components/ui/AppPage.vue'
import AppLoader from '../components/ui/AppLoader.vue'
import AppStatus from '../components/ui/AppStatus.vue'
export default {
  components: { AppPage, AppLoader, AppStatus },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const status = ref()

    const { id } = route.params
    const request = ref({})

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', id)
      status.value = request.value?.status
      loading.value = false
    })

    const hasChanges = computed(() => request.value.status !== status.value)

    const remove = async () => {
      await store.dispatch('request/remove', id)
      router.push('/')
    }  

    const update = async () => {
      const data = {...request.value, status: status.value, id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }

    return {
      request,
      currency,
      loading,
      id,
      status,
      remove,
      update,
      hasChanges
    }
  }
}
</script>
