<template>
<div>
<Navbar />
<div class="container">
    <h1>Ballot</h1>
    <!-- the ballot component will be rendered by a for loop for every position and candidate -->
  <Ballot />
</div>
</div>


</template>

<script>
import Navbar from "../components/Navbar.vue";
import Ballot from "../components/Ballot.vue";
export default {
    name: 'BallotUI',
    components: {
        Ballot,
        Navbar
    }
}
</script>

<style scoped>
.container {
    text-align: center;
    margin-top: 5%;
}
</style>