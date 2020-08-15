<template>
  <div class="container">
    <div class="contents">
      <transition name="fade-transform" mode="out-in">
          <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {}

</script>
