<template>
  <div class="page">
    <div class="account-header">
      <h1>Учетные записи</h1>
      <Button
        :icon="isOpenForm ? 'pi pi-times' : 'pi pi-plus'"
        :aria-label="isOpenForm ? 'Закрыть форму' : 'Открыть форму'"
        severity="secondary"
        variant="outlined"
        @click="handleOpenForm"
      />
    </div>

    <div v-if="isOpenForm">
      <AccountForm />
    </div>

    <AccountList />
  </div>
</template>

<script setup lang="ts">
import AccountForm from '@/components/AccountForm.vue'
import AccountList from '@/components/AccountsList.vue'

import { Button } from 'primevue'
import { ref } from 'vue'

const isOpenForm = ref(false)

const handleOpenForm = () => {
  isOpenForm.value = !isOpenForm.value
}
</script>

<style scoped>
.account-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
</style>
