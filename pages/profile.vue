<template>
  <div class="profile-container">
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton default-href="/menu"></IonBackButton>
        </IonButtons>
        <IonTitle>{{ $t('profile.title') }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <!-- Профиль пользователя -->
      <div class="profile-header">
        <IonAvatar class="profile-avatar">
          <img :src="userAvatar || '/images/account.svg'" alt="Profile avatar">
        </IonAvatar>
        <h2 class="profile-name">{{ userName }}</h2>
        <p class="profile-email">{{ userEmail }}</p>
      </div>

      <!-- Статистика -->
      <IonList>
        <IonItem>
          <IonLabel>
            <h3>{{ $t('profile.tasksCompleted') }}</h3>
            <p>{{ completedTasks }}</p>
          </IonLabel>
          <IonIcon :icon="checkmarkCircleOutline" slot="start"></IonIcon>
        </IonItem>

        <IonItem>
          <IonLabel>
            <h3>{{ $t('profile.streak') }}</h3>
            <p>{{ currentStreak }} {{ $t('profile.days') }}</p>
          </IonLabel>
          <IonIcon :icon="flameOutline" slot="start"></IonIcon>
        </IonItem>
      </IonList>

      <!-- Настройки профиля -->
      <IonList>
        <IonItem button @click="editProfile">
          <IonLabel>{{ $t('profile.editProfile') }}</IonLabel>
          <IonIcon :icon="createOutline" slot="end"></IonIcon>
        </IonItem>

        <IonItem button @click="changePassword">
          <IonLabel>{{ $t('profile.changePassword') }}</IonLabel>
          <IonIcon :icon="keyOutline" slot="end"></IonIcon>
        </IonItem>

        <IonItem button @click="notificationSettings">
          <IonLabel>{{ $t('profile.notifications') }}</IonLabel>
          <IonIcon :icon="notificationsOutline" slot="end"></IonIcon>
        </IonItem>
      </IonList>
    </IonContent>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { 
  checkmarkCircleOutline, 
  flameOutline, 
  createOutline, 
  keyOutline, 
  notificationsOutline 
} from 'ionicons/icons'
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonAvatar,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/vue'

const authStore = useAuthStore()

// Данные пользователя
const userName = ref('')
const userEmail = ref('')
const userAvatar = ref('')
const completedTasks = ref(0)
const currentStreak = ref(0)

// Методы
const editProfile = () => {
  // Реализация редактирования профиля
}

const changePassword = () => {
  // Реализация смены пароля
}

const notificationSettings = () => {
  // Реализация настроек уведомлений
}

onMounted(async () => {
  // Загрузка данных пользователя
  const user = authStore.user
  if (user) {
    userName.value = user.displayName || 'User'
    userEmail.value = user.email || ''
    userAvatar.value = user.photoURL || ''
    // Здесь можно добавить загрузку дополнительных данных
  }
})

definePageMeta({
  middleware: ['auth'],
})
</script>

<style scoped>
.profile-container {
  height: 100%;
  background-color: var(--background-color);
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin-bottom: 1rem;
}

.profile-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0.5rem 0;
  color: var(--text-color);
}

.profile-email {
  font-size: 1rem;
  color: var(--ion-color-medium);
}

:deep(IonList) {
  margin-top: 2rem;
  background: transparent;
}

:deep(IonItem) {
  --background: transparent;
  --border-color: var(--ion-color-light);
  margin-bottom: 0.5rem;
}

:deep(IonIcon) {
  color: var(--ion-color-primary);
}
</style> 