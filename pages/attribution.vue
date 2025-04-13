<template>
	<div class="attribution">
		<div class="attr__header">
			<HeaderWithback :title="t('attr.value')" :icon="Arrowicon"/>
		</div>
		<div class="attribution__text">
			<div class="attr__title">Licenses & Credits</div>

			<div class="attr__section attr__icons">
				<div class="attr__subtitle">Icons</div>
				<div class="attr__text">
					All icons are downloaded from
					<a href="https://www.flaticon.com" target="_blank" class="attr__link">Flaticon</a>
					and used with a valid Premium subscription.
				</div>
			</div>

			<div class="attr__section attr__images">
				<div class="attr__subtitle">Images & Backgrounds</div>
				<div class="attr__text">
					All panda images and backgrounds were generated using AI and are used exclusively within this
					project.
				</div>
			</div>

			<div class="attr__section attr__fonts">
				<div class="attr__subtitle">Fonts</div>
				<div class="attr__text">
					Fonts are provided by
					<a href="https://fonts.google.com" target="_blank" class="attr__link">Google Fonts</a>
					and licensed under the
					<a href="https://scripts.sil.org/OFL" target="_blank" class="attr__link">SIL Open Font License
						(OFL)</a>.
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import HeaderWithback from '../src/components/headerWithBack.vue'
	import Arrowicon from '../assets/images/arrowSvg.svg';
	import {useI18n} from "vue-i18n";

	const {t} = useI18n();
</script>

<style scoped>

	.attr__header {
		padding: 0 10px;
	}

	.attribution__text {
		background-color: var(--background-color);
		padding: 24px;
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
		max-width: 700px;
		margin: 0 auto;
		font-family: sans-serif;
	}

	.attribution {
		padding: 20px;
	}

	.attr__title {
		font-size: 22px;
		font-weight: bold;
		margin-bottom: 16px;
		color: var(--text-color);
	}

	.attr__section {
		margin-bottom: 20px;
	}

	.attr__subtitle {
		font-weight: 600;
		font-size: 16px;
		margin-bottom: 8px;
		color: #555;
	}

	.attr__text {
		font-size: 14px;
		color: var(--text-color);
		line-height: 1.5;
	}

	.attr__link {
		color: #007acc;
		text-decoration: none;
		transition: color 0.2s;
	}

	.attr__link:hover {
		color: #005f99;
		text-decoration: underline;
	}
</style>
