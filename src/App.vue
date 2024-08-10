<template>
  <div id="app">
    <HeadItem />
    <IconsItem />
  </div>
</template>

<script>
import HeadItem from "./components/HeadItem.vue";
import IconsItem from "./components/IconsItem.vue";

export default {
  name: "App",
  components: {
    HeadItem,
    IconsItem,
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
body {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
}
</style>
