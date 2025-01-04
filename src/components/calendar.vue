<template>
	<section class="feature-block">
		<div class="feature-block__description">
			<div class="feature-block__title">{{ data.title }}</div>
			<div class="feature__columns">
				<div v-for="item in data.feature" :key="item.id" class="feature__columns-inner">
					<div class="feature__column">
						<ul class="feature__list">
							<li class="feature__item"> {{ item.title }}</li>
						</ul>
						<div class="article__content-inner">
							<div class="article__content">
								<div class="column__article"> {{ item.text}}</div>
								<img class="column__image" :src="item.img.src" alt="">
							</div>
							<div class="column__point-items">
								<div v-for="item in item.additionalPoints" class="column__point"> {{item.text}}</div>
							</div>
							<div class="column__btn">
								<button class="column__btn-item"> {{ item.btn.text}}</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
	import {ref, onMounted} from 'vue'
	import Complete from 'assets/images/complete.svg'
	import Events from 'assets/images/events.svg'
	import Following from 'assets/images/following.svg'

	const data = ref({
		title: 'Description of events',
		feature: [
			{
				id: 1,
				title: "Add events",
				text: "Easily add and organize your events with a user-friendly interface.",
				img: {
					src: Events
				},
				additionalPoints: [
					{text: "Set reminders easily"},
					{text: "Choose event colors"},
					{text: "Repeat events automatically"},
				],
				btn: {
					text: 'explore this feature'
				}
			},
			{
				id: 2,
				title: "Mark completed",
				text: "Keep track of completed tasks and events with a simple marking system.",
				img: {
					src: Complete
				},
				additionalPoints: [
					{text: "View task history"},
					{text: "Hide completed tasks"},
					{text: "Earn task badges"}
				],
				btn: {
					text: 'see how it works'
				}
			},
			{
				id: 3,
				title: "Follow the progress",
				text: "Monitor your calendar progress with visual indicators and summaries.",
				img: {
					src: Following
				},
				additionalPoints: [
					{text: "Track progress charts"},
					{text: "Set daily goals"},
					{text: "Connect useful apps"}
				],
				btn: {
					text: 'start tracking now'
				}
			}
		]
	});

</script>

<style scoped>

	.feature-block__description {
		padding: 60px 0;
	}

	.article__content-inner {
		display: flex;
		flex-direction: column;
	}

	.column__btn {
		margin-top: 40px;
		width: 100%;
		padding: 10px;
	}

	.column__btn-item {
		font-size: 16px;
		width: 100%;
		padding: 11px;
		border-radius: 10px;
		border: none;
		color: white;
		background: #4CAF50;
		transition: background 0.3s ease;
	}

	.column__btn-item:hover {
		background: #45a049;
	}

	.column__point {
		padding: 10px 0;
		position: relative;
	}

	.column__point-items {
		padding: 20px;
	}

	.column__point:before {
		content: '';
		width: 100%;
		height: 1px;
		position: absolute;
		background: #E0E0E0;
		top: 100%;
		left: 0;
	}

	.article__content {
		padding: 20px;
		display: flex;
		align-items: center;
	}

	.feature-block__title {
		text-align: center;
		padding: 30px;
		font-size: 50px;
		letter-spacing: 3px;
		font-weight: bold;
		color: #333;
		position: relative;
	}

	.feature-block__title:after {
		content: '';
		position: absolute;
		width: 100px;
		height: 2px;
		background: #4CAF50;
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
	}

	.feature__columns {
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding: 60px;
	}

	.feature__column {
		width: 100%;
		padding: 10px;
		border-radius: 20px;
		background-color: #ffffff;
		box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1),
		-5px -5px 15px rgba(255, 255, 255, 0.5);
		transform: perspective(1000px) rotateX(10deg) rotateY(10deg);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
	}

	.feature__column:hover {
		transform: perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.05);
		box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.2),
		-10px -10px 25px rgba(255, 255, 255, 0.3);
	}

	.feature__columns-inner {
		padding: 20px;
		max-width: 350px;
	}

	.feature__item {
		padding: 20px;
		font-size: 24px;
		font-weight: 600;
	}

	.column__image {
		width: 40px;
		margin-left: 20px;
	}


	.column__article {
		font-weight: 400;
		font-size: 14px;
		color: #555;
	}

	.feature-block__description {
		background: #f0f4f8;
	}


</style>
