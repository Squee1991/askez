<template>
    <NuxtLink to="/singup">
        <div class="description">
            <button class="next__btn">Next page</button>
        </div>
    </NuxtLink>

</template>
<script setup>

</script>

<style>
.description {
    background-image: url("../assets/images/descriptionPandaIMG.jpg");
    width: 100%;
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.next__btn {
    border-radius: 50%;

}
</style>