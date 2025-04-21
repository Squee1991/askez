<template>
    <div class="about__wrapper">
        <HeaderWithBack
                title="back to menu"
                :icon="Arrow"/>
        <div class="about__content">
            <div class="about__info">
                <div class="about__header">
                    <h1 class="about__title">FocusPanda</h1>
                    <p class="about__subtitle">Путь к духовному совершенству</p>
                </div>

                <div class="about__description">
                    <div class="about__intro-card" style="--delay: 0.1s">
                        <p class="about__intro">
                            Askez — это уникальное приложение, созданное для поддержки вашего пути в аскетизме и
                            духовном развитии. Мы помогаем вам укреплять дух через практики воздержания и
                            самодисциплины.
                        </p>
                    </div>
                    <div class="about__sections-container">
                        <div class="about__section" style="--delay: 0.2s" role="region"
                             aria-labelledby="asceticism-title">
                            <div class="about__section-icon" aria-hidden="true">🧘</div>
                            <h2 class="about__section-title" id="asceticism-title">Что такое аскетизм?</h2>
                            <p>
                                Аскетизм — это практика воздержания от мирских удовольствий для достижения духовных
                                целей. Это путь самодисциплины, который помогает укрепить дух и развить внутреннюю силу.
                            </p>
                        </div>
                        <div class="about__section" style="--delay: 0.4s">
                            <div class="about__section-icon">⚡</div>
                            <h2 class="about__section-title">Возможности приложения</h2>
                            <ul class="about__features">
                                <li>Отслеживание ежедневных аскетических практик</li>
                                <li>Установка и мониторинг личных испытаний</li>
                                <li>Поддержание дисциплинированного образа жизни</li>
                                <li>Получение достижений за выполнение целей</li>
                                <li>Совершенсиврвание себя и своего персонажа</li>
                            </ul>
                        </div>
                        <div class="about__section" style="--delay: 0.6s">
                            <div class="about__section-icon">🌟</div>
                            <h2 class="about__section-title">Наша миссия</h2>
                            <p>
                                Мы стремимся помочь вам развить силу духа через практики аскетизма, предоставляя
                                инструменты и поддержку на вашем пути к духовному совершенству.
                            </p>
                        </div>
                    </div>
                </div>
                <!-- Footer -->
                <div class="about__footer">
                    <div class="about__version">
                        <p>Версия 1.0</p>
                        <p class="about__copyright">© 2025 FocusPanda. Все права защищены.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import HeaderWithBack from '../src/components/headerWithBack.vue';
import Arrow from '../assets/images/arrowBack.svg';
</script>

<style scoped>
.about__wrapper {
    position: relative;
    padding: 25px;
    min-height: 100vh;
    width: 100%;
    background-color: var(--background-color);
    background-image: radial-gradient(circle at 10% 10%, rgba(0, 188, 212, 0.08) 0%, transparent 30%),
    radial-gradient(circle at 90% 90%, rgba(0, 188, 212, 0.08) 0%, transparent 30%),
    url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300BCD4' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    color: #ffffff;
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
    margin-bottom: 1.5rem;
    position: relative;
    padding-bottom: 1rem;
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
    font-size: 3.5rem;
    letter-spacing: 1px;
    text-shadow: 0 0 10px rgba(0, 188, 212, 0.5), 0 0 20px rgba(0, 188, 212, 0.3);
    font-family: "Acme", serif;
    background: linear-gradient(90deg, #00e5ff, #006064);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 0.5rem;
    position: relative;
    font-weight: 700;
}

.about__subtitle {
    font-size: 1.3rem;
    color: #ffffff;
    opacity: 0.95;
    font-style: italic;
    margin-bottom: 1rem;
    text-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
    font-weight: 500;
    letter-spacing: 0.5px;
}

.about__hero {
    margin-bottom: 2rem;
    text-align: center;
}

.about__hero-img {
    max-width: 100%;
    height: auto;
    border-radius: 16px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    transition: transform 0.3s ease;
}

.about__hero-img:hover {
    transform: scale(1.02);
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
    background: linear-gradient(135deg, rgba(0, 188, 212, 0.15), rgba(0, 188, 212, 0.08));
    border: 1px solid rgba(0, 188, 212, 0.3);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease forwards;
    animation-delay: var(--delay, 0s);
}

.about__sections-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.about__section {
    padding: 1.8rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 188, 212, 0.15);
    border: 1px solid rgba(0, 188, 212, 0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    transform: translateY(20px);
    transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    animation-delay: var(--delay, 0s);
}

.about__section:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 40px rgba(0, 188, 212, 0.25);
    border-color: rgba(0, 188, 212, 0.4);
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
    transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.about__section:hover .about__section-icon {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 0 25px rgba(0, 188, 212, 0.5);
}

.about__section-title {
    font-size: 1.4rem;
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    text-shadow: 0 0 5px rgba(0, 188, 212, 0.3);
    font-weight: 600;
    letter-spacing: 0.5px;
}

.about__section p {
    flex-grow: 1;
    margin-bottom: 1rem;
    color: #ffffff;
    font-size: 1.05rem;
    line-height: 1.8;
    letter-spacing: 0.3px;
    font-weight: 400;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
}

.about__features {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
    flex-grow: 1;
}

.about__features li {
    display: flex;
    align-items: center;
    padding: 0.8rem 1.5rem;
    margin: 0.8rem 0;
    border-radius: 8px;
    background: rgba(0, 188, 212, 0.08);
    transition: all 0.3s ease;
    font-weight: 500;
    letter-spacing: 0.2px;
    text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
}

.about__features li:before {
    content: "✓";
    margin-right: 1rem;
    color: #00e5ff;
    font-weight: bold;
    text-shadow: 0 0 5px rgba(0, 229, 255, 0.7);
    font-size: 1.1rem;
}

.about__features li:hover {
    transform: translateX(10px);
    background: rgba(0, 188, 212, 0.1);
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.15);
}

.about__footer {
    position: relative;
    padding: 2rem 1rem;
    margin-top: 3rem;
    background: linear-gradient(to right, transparent, rgba(0, 188, 212, 0.1), transparent);
}

.about__footer:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, #00BCD4, transparent);
}

.about__version {
    font-size: 0.9rem;
    opacity: 0.9;
    letter-spacing: 0.2px;
    color: #ffffff;
    font-weight: 500;
}

.about__copyright {
    margin-top: 0.5rem;
    font-size: 0.85rem;
    opacity: 0.85;
    font-weight: 400;
}

.about__learn-more {
    margin-top: 1.5rem;
    padding: 0.8rem 1.5rem;
    background: linear-gradient(135deg, #00e5ff, #006064);
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
    letter-spacing: 0.5px;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.3);
}

.about__learn-more:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 188, 212, 0.4);
}

@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .about__title {
        font-size: 2.5rem;
        text-shadow: 0 0 8px rgba(0, 188, 212, 0.5), 0 0 15px rgba(0, 188, 212, 0.3);
    }

    .about__sections-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .about__section {
        padding: 1.5rem;
    }

    .about__features li {
        padding: 0.6rem 1rem;
        font-size: 1rem;
    }

    .about__section p {
        font-size: 1rem;
        line-height: 1.7;
    }
}

@media (max-width: 480px) {
    .about__title {
        font-size: 2rem;
        text-shadow: 0 0 6px rgba(0, 188, 212, 0.5), 0 0 12px rgba(0, 188, 212, 0.3);
    }

    .about__subtitle {
        font-size: 1rem;
    }

    .about__section-icon {
        width: 50px;
        height: 50px;
        font-size: 1.8rem;
    }

    .about__section-title {
        font-size: 1.3rem;
    }

    .about__features li {
        font-size: 0.95rem;
    }
}
</style>
