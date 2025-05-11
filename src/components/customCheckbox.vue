<template>
    <label class="label">
        <input
            class="checkbox"
            type="checkbox"
            :checked="checked"
            @change="$emit('change')"
        />
        <span class="fake"></span>
    </label>
</template>

<script setup>
defineProps({
    checked: Boolean
})

defineEmits(['change'])

</script>

<style scoped>
.checkbox {
    display: none;
}

.fake {
    position: relative;
    width: 35px;
    height: 35px;
    border: 2px solid white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: border-color 0.3s;
}

.fake::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: .5s;
}

.label input:checked + .fake::before {
    opacity: 1;
    transition: .5s;
}


</style>