<template>
  <div class="account-list__item">
    <InputText
      v-model="label"
      type="text"
      name="label"
      maxlength="50"
      placeholder="Введите метки через ;"
      @blur="updateLabels"
    />

    <Dropdown
      v-model="account.type"
      :options="accountTypes"
      placeholder="Тип"
      class="field-dropdown"
    />

    <InputText
      v-model="account.login"
      type="text"
      name="login"
      maxlength="100"
      placeholder="Введите логин"
    />

    <InputText
      v-if="account.type === 'Локальная'"
      v-model="account.password"
      type="password"
      name="password"
      maxlength="100"
      placeholder="Введите пароль"
    />

    <Button
      icon="pi pi-trash"
      severity="secondary"
      variant="outlined"
      aria-label="Delete"
      @click="deleteAccount"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useAccountStore, type Account } from '@/stores/accountStore'

const store = useAccountStore()

const props = defineProps<{ account: Account }>()
const account = props.account

const label = ref(account.labels.map((l) => l.text).join(';'))

const accountTypes = ['LDAP', 'Локальная']

function updateLabels() {
  const parsed = label.value
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((text) => ({ text }))

  store.updateAccount(account.id, { labels: parsed })
}

watch(
  () => account.type,
  (newVal) => {
    const payload = { type: newVal, password: newVal === 'LDAP' ? null : account.password }
    store.updateAccount(account.id, payload)
  },
)

watch(
  () => account.login,
  (val) => {
    store.updateAccount(account.id, { login: val })
  },
)

watch(
  () => account.password,
  (val) => {
    if (account.type === 'Локальная') {
      store.updateAccount(account.id, { password: val })
    }
  },
)

function deleteAccount() {
  store.deleteAccount(account.id)
}
</script>

<style scoped>
.account-list__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
}
.invalid {
  border-color: red !important;
}
input {
  width: 250px;
}

.field-dropdown {
  width: 200px;
}
input[name='login'] {
  flex-grow: 1;
}
</style>
