<template>
  <div class="accounts">
    <AccountsListItem v-for="account in store.accounts" :key="account.id" :account="account" />
  </div>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/accountStore'
import AccountsListItem from './AccountsListItem.vue'

const store = useAccountStore()
</script>

<style>
.accounts {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  gap: 8px;
}
</style>
