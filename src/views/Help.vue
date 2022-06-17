<template>
  <app-page title="Помощь">
    <question-item
      v-for="q in questions"
      :key="q.title"
      :question="q"
    ></question-item>
  </app-page>
</template>

<script>
import QuestionItem from '../components/question/QuestionItem.vue'
import AppPage from '../components/ui/AppPage.vue'

export default {
  components: { AppPage, QuestionItem },
  setup() {
    const questions = [
      {title: 'Что есть в данной системе?', text: 'Тут есть все, для того, чтобы смотреть, какие заявки человек добавлял'},
      {title: 'Как тут работает авторизация?', text: 'Все реализовано через Firebase'}
    ]

    return { questions }
  },
}
</script>
