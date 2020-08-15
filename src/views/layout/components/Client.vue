<template>
  <div>
    <keep-alive exclude="showalldata">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "client",
  components: {},
  data() {
    return {
      cacheData: [],
    };
  },
  methods: {},
};
</script>

