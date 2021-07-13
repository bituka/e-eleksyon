<template>
<div>
<Pic />
  <Form />
</div>

  
</template>

<script>
import Form from "../components/Form.vue";
import Pic from "../components/Pic.vue";

export default {
    name: 'Main',
    components: {
        Form,
        Pic
    }
}
</script>

<style>

</style>