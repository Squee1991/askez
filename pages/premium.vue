<template>
	<div v-if="showPremiumModal" class="premium-info">
		<HeaderWithback :icon="ArrowIcon"/>
		<div class="premium-content">
			<div class="premium-title">{{$t('buyPremium.plus')}}</div>
			<div class="premium-list">
				<div class="premium__list-item" v-for="index in 7" :key="index">
					<img class="premium__icons" :src="getPremiumIcon(t(`premiumValues.${index - 1}`))" alt="">
					<span class="premium__list-text">{{ t(`premiumValues.${index - 1}`)}}</span>
				</div>
			</div>
			<button class="premium-button" @click="buyPremium">{{$t('buyPremium.buy')}} 3.99$</button>
			<span class="play__info">{{$t('googlePlay.pay')}}</span>
			<div class="premium-policy-link">
				<NuxtLink class="policy__btn" to="policyPrivacy">{{$t('privacy.page')}}</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script setup>
	import ArrowIcon from '../assets/images/back.svg';
	import HeaderWithback from '../src/components/headerWithBack.vue';
	import {useAuthStore} from '../stores/authStore.js'
	import {useRouter} from 'vue-router'
	import {useI18n} from "vue-i18n";
	const {t} = useI18n();
	const router = useRouter()
	const showPremiumModal = ref(true)
	const authStore = useAuthStore()
	const buyPremium = async () => {
		try {
			const result = await authStore.purchasePro();
			if (result.success) {
				showPremiumModal.value = false;
				router.push('/welcomePage');
			} else {
				alert(result.message || 'Покупка не удалась или подписка не активна');
			}
		} catch (e) {
			console.error('Ошибка при покупке подписки:', e);
			alert('Что-то пошло не так во время покупки.');
		}
	};


	const ads = [
		"无广告", "Без рекламы","Без рэкламы", "Без реклами", "Brak reklam", "Sans publicité", "Sin anuncios",
		"No advertising", "Keine Werbung", "Без рэкламы", "بدون إعلانات"
	]
	const level = [
		"熊猫成长","Прокачка панды","Паляпшэнне пандзі", "Покращення панди", "Rozwój pandy", "Amélioration du panda",
		"Mejora del panda", "Panda leveling", "Panda-Entwicklung", "Panda-Entwicklung", "Паляпшэнне пандзі",
		"تطوير الباندا"
	]
	const achievs = [
		"获取成就","Доступ к достижениям","Доступ да дасягненняў", "Доступ до досягнень", "Dostęp do osiągnięć", "Accès aux succès",
		"Acceso a logros", "Access to achievements", "Zugang zu Erfolgen", "Доступ да дасягненняў",
		"الوصول إلى الإنجازات"
	]
	const support = [
		"支持开发者","Поддержка разработчиков","Падтрымка распрацоўшчыкаў", "Підтримка розробників", "Wsparcie dla twórców", "Soutien aux développeurs",
		"Apoyo a los desarrolladores", "Support the developers", "Unterstützung der Entwickler",
		"Падтрымка распрацоўшчыкаў", "دعم المطورين"
	]

	const limit = [
		"目标数量无限","Неограниченное количество целей","Неабмежаваная колькасць мэтаў", "Необмежена кількість цілей", "Nieograniczona liczba celów",
		"Nombre illimité d’objectifs", "Objetivos ilimitados", "Unlimited number of goals",
		"Unbegrenzte Anzahl an Zielen", "Неабмежаваная колькасць мэтаў", "عدد غير محدود من الأهداف"
	]
	const chatBot = [
		"虚拟助手访问权限", "Доступ к виртуальному помощнику","Доступ да віртуальнага памочніка", "Доступ до віртуального помічника", "Dostęp do wirtualnego asystenta",
		"Accès à l’assistant virtuel", "Acceso al asistente virtual", "Access to virtual assistant",
		"Zugang zum virtuellen Assistenten", "Доступ да віртуальнага памочніка", "الوصول إلى المساعد الافتراضي"
	]
	const future = [
		"即将推出的功能访问权限","Доступ к предстоящим функциям(скоро)","Доступ да будучых функцый (хутка)", "Доступ до майбутніх функцій (незабаром)",
		"Dostęp do nadchodzących funkcji (wkrótce)", "Accès aux fonctionnalités à venir (bientôt disponible)",
		"Acceso a funciones próximas (muy pronto)", "Access to upcoming features (coming soon)",
		"Zugriff auf kommende Funktionen (bald verfügbar)", "Доступ да будучых функцый (хутка)",
		"الوصول إلى الميزات القادمة (قريبًا)"
	]


	const getPremiumIcon = (text) => {
		if (ads.includes(text)) {
			return '/images/icon-ads.svg'
		} else if (support.includes(text)) {
			return '/images/icon-friendly.svg'
		} else if (level.includes(text)) {
			return '/images/icon-level.svg'
		} else if (future.includes(text)) {
			return '/images/icon-advertisement.svg'
		// } else if (datas.includes(text)) {
		// 	return '/images/icon-datas.svg'
		} else if (limit.includes(text)) {
			return '/images/icon-limit.svg'
		} else if (chatBot.includes(text)) {
			return '/images/icon-assistant.svg'
		} else if (achievs.includes(text)) {
			return '/images/icon-achieve.svg'
		} else {
			return ''
		}
	}

</script>

<style scoped>

	.play__info {
		font-size: 10px;
		color: var(--text-color);
		padding: 5px 10px 10px 5px;
		max-width: 370px;
		margin-bottom: 5px;
	}

	.policy__btn {
		color: var(--text-color);
		text-decoration: none;
		bottom: 15px;
		font-size: 12px;
		font-family: "Nunito", sans-serif;
		margin-top: 5px;
		padding: 5px;
	}

	.premium__list-item {
		position: relative;
		display: flex;
		align-items: center;
		margin: 15px;
		font-size: 15px;
		font-family: "Nunito", sans-serif;
		font-weight: 600;
		padding-bottom: 3px;
	}

	.premium__list-item:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1px;
		width: 100%;
		background: #c9b19c;
		transform: scaleY(0.3);
	}

	.premium__icons {
		width: 43px;
		margin-right: 10px;
	}

	.premium-info {
		position:fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: var(--background-color);
		padding: 20px;
		text-align: center;
		z-index: 1000;
		display: flex;
		flex-direction: column;
	}

	.premium-content {
		flex-direction: column;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 0 auto;
		overflow-y: auto;
		max-height: calc(100vh - 80px);
		padding: 0 0 12px 0
	}

	.premium-title {
		position: relative;
		font-size: 26px;
		color: #a887fc;
		font-family: "Nunito", sans-serif;
		padding: 0 0 4px 0;
	}

	.premium-title:after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 0;
		height: 2px;
		width: 40%;
		background: #c9b19c;
	}

	.premium-list {
		margin: 20px 10px 10px 10px;
		font-size: 19px;
		font-family: "Nunito", serif;
		color: var(--text-color);
		text-align: left;
	}

	.premium-button {
		margin-bottom: 10px;
		width: 90%;
		background-color: #7E61C7;
		color: white;
		padding: 12px 28px;
		border: none;
		border-radius: 10px;
		font-size: 18px;
		font-family: "Nunito", sans-serif;
		cursor: pointer;
		transition: transform 0.2s ease, background-color 0.3s ease;
	}

	.premium-button:active {
		background-color: #a181e5;
	}
</style>