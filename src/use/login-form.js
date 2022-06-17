import { computed, watch } from 'vue';
import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default function useLoginForm() {
  const store = useStore()
  const router = useRouter()
  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const {
    value: email,
    errorMessage: eError,
    handleBlur: eBlur,
  } = useField('email', yup.string().trim().required('Пожалуйста введите email').email());

  const MIN_LENGTH = 6;

  const {
    value: password,
    errorMessage: pError,
    handleBlur: pBlur,
  } = useField(
    'password',
    yup
      .string()
      .trim()
      .required('Пожалуйста введите пароль')
      .min(MIN_LENGTH, `Пароль не может быть меньше ${MIN_LENGTH} символов`),
  );

  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500);
    }
  });

  const onSubmit = handleSubmit(async (values) => {
    try {
      console.log('Form', values);
      await store.dispatch('auth/login', values)
      router.push('/')
    } catch(e) {}
  });

  return {
    email,
    password,
    eError,
    eBlur,
    pError,
    pBlur,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}
