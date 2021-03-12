<template>
  <div class="loginLayout">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'LoginLayout',
}
</script>

<style lang="scss" scoped>
  .loginLayout {
    height: 100vh;
    overflow: auto;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0093e9;
    background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
  }
</style>
