<template>
  <h4 v-if="requests.length === 0" class="text-center">Заявок пака нет</h4>
  <table class="table" v-else>
    <thead>
      <tr>
        <th>#</th>
        <th>ФИО</th>
        <th>Телефон</th>
        <th>Сумма</th>
        <th>Статус</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(r, idx) in requests" :key="r?.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ r?.fio }}</td>
        <td>{{ r?.phone }}</td>
        <td>{{ currency(r?.amount) }}</td>
        <td>
          <app-status :type="r?.status"></app-status>
        </td>
        <td>
          <button class="btn primary" @click="redirectRequest(r?.id)">Открыть</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useRouter } from 'vue-router';

import { currency } from '~/utils/currency';
import AppStatus from '../ui/AppStatus.vue';

export default {
  components: { AppStatus },
  props: ['requests'],
  setup() {
    const router = useRouter()
    const redirectRequest = (id) => {
      router.push({name: 'Request', params: { id }})
    }
    return { currency, redirectRequest }
  }
}
</script>
