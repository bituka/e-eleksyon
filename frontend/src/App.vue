<template>
<div id="main">
  <Pic />
  <form action="">
    <Form />
  </form>
  
  
</div>
  
</template>

<script>
import Pic from "./components/Pic.vue";
import Form from "./components/Form.vue";

export default {
  name: 'Main',
  components: {
    Pic,
    Form,
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
