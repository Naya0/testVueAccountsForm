export function isInvalid(field: string, value: string, type?: string): boolean {
  if (field === 'login') return !value || value.length > 100
  if (field === 'password') return type === 'Локальная' && (!value || value.length > 100)
  if (field === 'label') return value.length > 50
  return false
}
