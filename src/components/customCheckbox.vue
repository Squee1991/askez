<template>
    <label class="label">
        <input type="checkbox" class="checkbox">
        <span class="fake"></span>
    </label>
</template>

<script setup>


</script>

<style scoped>

.checkbox {
    display: none;
}

.fake {
    display: inline-block;
    margin-right: 10px;
    width: 30px;
    height: 30px;
    border: 1px solid black;
    border-radius: 4px;
    position: relative;
    z-index: 0;
}

.fake:before {
    content: '';
    position: absolute;
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-image: url('../../assets/images/checkbox.svg');
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0;
}

.checkbox:checked + .fake:before {
    opacity: 1;
}

.checkbox:checked + .fake {
    border: none;
}

.punkt {
    width: 4px;
    height: 4px;
    font-weight: bold;
    background: black;
    position: relative;
    margin: 10px 0;
    border-radius: 50%;
}

.punkt__wrapper {
    width: 20px;
    height: 20px;
    padding: 15px 6px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.label {
    display: flex;
    align-items: center;
}

.punkt:before {
    top: 150%;
    left: 0;
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    background: black;
    border-radius: 50%;
}

.punkt:after {
    content: "";
    bottom: 150%;
    left: 0;
    position: absolute;
    width: 4px;
    height: 4px;
    background: black;
    border-radius: 50%;
}

</style>