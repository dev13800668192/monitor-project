<template>
  <div class="container">
    <div class="contents">
      <transition name="fade-transform" mode="out-in">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {}

</script>
