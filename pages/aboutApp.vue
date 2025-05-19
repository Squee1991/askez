<template>
	<div class="about__wrapper">
		<HeaderWithBack
			:icon="Arrow" />
		<div class="about__content">
			<div class="about__info">
				<div class="about__header">
					<h1 class="about__title">{{ $t('about.title') }}</h1>
<!--					<p class="about__subtitle">{{ $t('about.subtitle') }}</p>-->
				</div>
				<div class="about__description">
<!--					<div class="about__intro-card">-->
<!--						<p class="about__intro">-->
<!--							{{ $t('about.intro') }}-->
<!--						</p>-->
<!--					</div>-->
					<div class="about__sections-container">
<!--						<div class="about__section">-->
<!--							<div class="about__section-icon">🧘</div>-->
<!--							<h2 class="about__section-title">{{ $t('about.section1_title') }}</h2>-->
<!--							<p>-->
<!--								{{ $t('about.section1_text') }}-->
<!--							</p>-->
<!--						</div>-->
						<div class="about__section">
							<div class="about__section-icon">⚡</div>
							<h2 class="about__section-title">{{ $t('about.section2_title') }}</h2>
							<ul class="about__features">
								<li>{{ $t('about.feature_track') }}</li>
								<li>{{ $t('about.feature_challenges') }}</li>
								<li>{{ $t('about.feature_guidance') }}</li>
								<li>{{ $t('about.feature_community') }}</li>
								<li>{{ $t('about.feature_discipline') }}</li>
							</ul>
						</div>
<!--						<div class="about__section">-->
<!--							<div class="about__section-icon">🌟</div>-->
<!--							<h2 class="about__section-title">{{ $t('about.section3_title') }}</h2>-->
<!--							<p>-->
<!--								{{ $t('about.section3_text') }}-->
<!--							</p>-->
<!--						</div>-->
					</div>
				</div>

				<div class="about__footer">
					<div class="about__version">
						<p>{{ $t('about.version') }}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>


<script setup>
import HeaderWithBack from '../src/components/headerWithBack.vue';
import Arrow from '../assets/images/back.svg'

</script>

<style scoped>
.about__wrapper {
	position: relative;
	padding: 25px;
	min-height: 100vh;
	width: 100%;
	background-color: var(--background-color);
	background-image:
			radial-gradient(circle at 20% 20%, rgba(0, 188, 212, 0.05) 0%, transparent 30%),
			radial-gradient(circle at 80% 80%, rgba(0, 188, 212, 0.05) 0%, transparent 30%),
			url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300BCD4' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.about__content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 2rem;
	padding: 1rem;
	max-width: 1200px;
	margin: 0 auto;
}

.about__info {
	text-align: center;
	width: 100%;
	max-width: 800px;
	margin: 0 auto;
}

.about__header {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-bottom: 3rem;
	position: relative;
	padding-bottom: 2rem;
}

.about__header:after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 100px;
	height: 3px;
	background: linear-gradient(90deg, transparent, #00BCD4, transparent);
}

.about__title {
	font-size: 3rem;
	color: var(--text-color);
	font-family: "Acme", serif;
	margin-bottom: 0.5rem;
	text-shadow: 0 0 15px rgba(0, 188, 212, 0.6);
	letter-spacing: 0.5px;
	position: relative;
	display: inline-block;
}

.about__title:before,
.about__title:after {
	content: '';
	position: absolute;
	top: 50%;
	width: 30px;
	height: 2px;
	background: linear-gradient(90deg, transparent, #00BCD4);
}

.about__title:before {
	left: -40px;
}

.about__title:after {
	right: -40px;
	background: linear-gradient(90deg, #00BCD4, transparent);
}

.about__subtitle {
	font-size: 1.3rem;
	color: var(--text-color);
	opacity: 0.95;
	margin-bottom: 0.5rem;
	font-style: italic;
	position: relative;
	display: inline-block;
	font-weight: 500;
	letter-spacing: 0.3px;
	text-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
}

.about__description {
	text-align: left;
	margin: 2rem 0;
	line-height: 1.6;
}

.about__intro-card {
	margin-bottom: 3rem;
	padding: 1.5rem;
	border-radius: 16px;
	background: linear-gradient(135deg, rgba(0, 188, 212, 0.1), rgba(0, 188, 212, 0.05));
	border: 1px solid rgba(0, 188, 212, 0.2);
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	position: relative;
	overflow: hidden;
}

.about__intro-card:before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: radial-gradient(circle at top right, rgba(0, 188, 212, 0.1), transparent 70%);
	pointer-events: none;
}

.about__intro {
	font-size: 1.1rem;
	line-height: 1.7;
	font-weight: 400;
	letter-spacing: 0.2px;
	color: var(--text-color);
	position: relative;
	z-index: 1;
}

.about__sections-container {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	gap: 2rem;
	margin-bottom: 3rem;
}

.about__section {
	padding: 1.8rem;
	border-radius: 16px;
	background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
	position: relative;
	overflow: hidden;
	transition: transform 0.3s ease, box-shadow 0.3s ease;
	border: 1px solid rgba(255, 255, 255, 0.1);
	height: 100%;
	display: flex;
	flex-direction: column;
}

.about__section:hover {
	transform: translateY(-5px);
	box-shadow: 0 8px 30px rgba(0, 188, 212, 0.2);
	border: 1px solid rgba(0, 188, 212, 0.3);
}

.about__section:before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 5px;
	background: linear-gradient(90deg, #00BCD4, transparent);
}

.about__section:after {
	content: '';
	position: absolute;
	bottom: 0;
	right: 0;
	width: 100px;
	height: 100px;
	background: radial-gradient(circle at bottom right, rgba(0, 188, 212, 0.1), transparent 70%);
	pointer-events: none;
}

.about__section-icon {
	font-size: 2.2rem;
	background: linear-gradient(135deg, rgba(0, 188, 212, 0.2), rgba(0, 188, 212, 0.1));
	width: 60px;
	height: 60px;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 auto 1.5rem;
	box-shadow: 0 0 15px rgba(0, 188, 212, 0.3);
	position: relative;
	z-index: 1;
}

.about__section-title {
	font-size: 1.4rem;
	color: var(--text-color);
	margin-bottom: 1.2rem;
	border-bottom: 1px solid rgba(255, 255, 255, 0.2);
	padding-bottom: 0.8rem;
	text-align: center;
	font-weight: 600;
	letter-spacing: 0.3px;
	text-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
}

.about__section p {
	font-size: 1.05rem;
	line-height: 1.7;
	font-weight: 400;
	letter-spacing: 0.2px;
	color: var(--text-color);
	margin-bottom: 1rem;
	flex-grow: 1;
}

.about__features {
	list-style-type: none;
	padding: 0;
	margin: 1.5rem 0;
	flex-grow: 1;
}

.about__features li {
	margin: 0.8rem 0;
	padding-left: 1.8rem;
	position: relative;
	transition: transform 0.2s ease, color 0.2s ease;
	font-size: 1.05rem;
	line-height: 1.6;
	font-weight: 400;
	letter-spacing: 0.2px;
	color: var(--text-color);
}

.about__features li:hover {
	transform: translateX(5px);
	color: #00BCD4;
	text-shadow: 0 0 5px rgba(0, 188, 212, 0.5);
}

.about__features li:before {
	content: "•";
	position: absolute;
	left: 0;
	color: #00BCD4;
	font-size: 1.2rem;
	line-height: 1;
}

.about__footer {
	margin-top: 3rem;
	padding-top: 2rem;
	border-top: 1px solid rgba(255, 255, 255, 0.1);
	position: relative;
}

.about__footer:before {
	content: '';
	position: absolute;
	top: -1px;
	left: 50%;
	transform: translateX(-50%);
	width: 150px;
	height: 1px;
	background: linear-gradient(90deg, transparent, #00BCD4, transparent);
}

.about__version {
	font-size: 0.9rem;
	opacity: 0.8;
	padding: 1rem;
	position: relative;
	font-weight: 400;
	letter-spacing: 0.2px;
	color: var(--text-color);;
}

.about__copyright {
	margin-top: 0.5rem;
	font-size: 0.8rem;
}

@media (max-width: 768px) {
	.about__title {
		font-size: 2.5rem;
	}

	.about__title:before,
	.about__title:after {
		width: 20px;
	}

	.about__title:before {
		left: -30px;
	}

	.about__title:after {
		right: -30px;
	}

	.about__subtitle {
		font-size: 1.1rem;
	}

	.about__sections-container {
		grid-template-columns: 1fr;
	}

	.about__section {
		padding: 1.5rem;
	}

	.about__intro {
		font-size: 1rem;
	}

	.about__section p,
	.about__features li {
		font-size: 1rem;
	}
}
</style>