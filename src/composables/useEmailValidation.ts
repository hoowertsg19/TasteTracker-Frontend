import { ref, watch } from 'vue'
import { authAPI } from '@/services/api'

export function useEmailValidation() {
  const email = ref('')
  const emailStatus = ref<'idle' | 'checking' | 'valid' | 'invalid' | 'not-found'>('idle')
  const emailMessage = ref('')

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const validateEmailFormat = (emailValue: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  const checkEmailInBackend = async (emailValue: string) => {
    if (!emailValue || !validateEmailFormat(emailValue)) {
      emailStatus.value = 'invalid'
      emailMessage.value = 'Formato de email inválido'
      return
    }

    emailStatus.value = 'checking'
    emailMessage.value = 'Verificando...'

    try {
      console.log('🔍 Verificando email:', emailValue)
      const result = await authAPI.checkEmail(emailValue)
      console.log('📬 Resultado del backend:', result)

      if (result.exists) {
        emailStatus.value = 'valid'
        emailMessage.value = 'Email registrado ✓'
      } else {
        emailStatus.value = 'not-found'
        emailMessage.value = result.message || 'Este email no está registrado'
      }
    } catch (error) {
      console.error('❌ Error en validación:', error)
      emailStatus.value = 'invalid'
      emailMessage.value = 'Error al verificar email'
    }
  }

  watch(email, (newEmail) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    emailStatus.value = 'idle'
    emailMessage.value = ''

    if (!newEmail) {
      return
    }

    if (!validateEmailFormat(newEmail)) {
      emailStatus.value = 'invalid'
      emailMessage.value = 'Formato de email inválido'
      return
    }

    // Esperar 800ms antes de consultar backend (debounce)
    debounceTimer = setTimeout(() => {
      checkEmailInBackend(newEmail)
    }, 800)
  })

  return {
    email,
    emailStatus,
    emailMessage,
  }
}
