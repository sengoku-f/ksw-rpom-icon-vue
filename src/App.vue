<template>
  <div id="app">
    <IconAdd :size="55" color="#40B883"/>
    <IconAomMenuQxglColor :size="55" color="#40B883"/>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import IconAdd from './icons/add.js'
import IconAomMenuQxglColor from './icons/aom-menu-QXGL-color.js'
import "~/styles/icon.css";

export default {
  name: 'App',
  components: {
    HelloWorld,
    IconAdd,
    IconAomMenuQxglColor,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
