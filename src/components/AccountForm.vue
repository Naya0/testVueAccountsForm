<template>
  <div class="account-form__container">
    <h2>Добавить новый аккаунт</h2>

    <form class="account-form__item" @submit.prevent="submitForm">
      <InputText
        v-model="label"
        type="text"
        name="label"
        maxlength="50"
        placeholder="Введите метки через ;"
      />

      <Dropdown
        v-model="type"
        :options="accountTypes"
        placeholder="Тип"
        :class="{ invalid: isInvalid('type', type) }"
      />

      <InputText
        v-model="login"
        type="text"
        name="login"
        maxlength="100"
        placeholder="Введите логин"
        :class="{ invalid: isInvalid('login', login) }"
      />

      <InputText
        v-if="type === 'Локальная'"
        v-model="password"
        type="password"
        name="password"
        maxlength="100"
        placeholder="Введите пароль"
        :class="{ invalid: isInvalid('password', password, type) }"
      />

      <Button label="Создать" type="submit" />
    </form>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useAccountStore } from '@/stores/accountStore'
import { isInvalid } from '@/utils/formValid'

const store = useAccountStore()
const accountTypes = ['LDAP', 'Локальная']

const label = ref('')
const type = ref<'LDAP' | 'Локальная'>('LDAP')
const login = ref('')
const password = ref('')

function parseLabels(raw: string) {
  return raw
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))
}

function submitForm() {
  const errors = [
    isInvalid('login', login.value),
    isInvalid('type', type.value),
    isInvalid('password', password.value, type.value),
  ]

  if (errors.includes(true)) {
    alert('Пожалуйста, заполните обязательные поля корректно')
    return
  }

  store.addAccount({
    id: String(Date.now()),
    labels: parseLabels(label.value),
    type: type.value,
    login: login.value,
    password: type.value === 'LDAP' ? null : password.value,
    isValid: true,
  })

  label.value = ''
  type.value = 'LDAP'
  login.value = ''
  password.value = ''
}
</script>

<style scoped>
.account-form__container {
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 10px 10px 30px;
  width: 90%;
  margin: 10px auto;
}

.account-form__item {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: flex-start;
}

.invalid {
  border-color: red !important;
}

input,
.field-dropdown {
  width: 200px;
}

input[name='login'] {
  flex-grow: 1;
}

h2 {
  margin: 20px 0;
}
</style>
