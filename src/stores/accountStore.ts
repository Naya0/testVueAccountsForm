import { defineStore } from 'pinia'

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: { text: string }[]
  type: AccountType
  login: string
  password: string | null
  isValid: boolean
}

function loadAccounts(): Account[] {
  const saved = localStorage.getItem('accounts')
  return saved ? JSON.parse(saved) : []
}

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: loadAccounts() as Account[],
  }),
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account)
      this.save()
    },
    updateAccount(id: string, updated: Partial<Account>) {
      const index = this.accounts.findIndex((a: Account) => a.id === id)
      if (index !== -1) {
        this.accounts[index] = { ...this.accounts[index], ...updated }
        this.save()
      }
    },
    deleteAccount(id: string) {
      this.accounts = this.accounts.filter((a: Account) => a.id !== id)
      this.save()
    },
    save() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
  },
})
