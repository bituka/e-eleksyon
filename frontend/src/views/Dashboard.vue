<template>
<div class="container">
    <Navbar />
    <div class="row">
        <Position />
    <Voters />
    </div>
    
    <Candidates />
    
</div>
  
</template>

<script>
import Position from "../components/Positions.vue";
import Candidates from "../components/Candidates.vue";
import Voters from "../components/Voters.vue";
import Navbar from "../components/Navbar.vue";



export default {
    name: 'Dashboard',
    components: {
        Position,
        Candidates,
        Voters,
        Navbar
    } 


}
</script>

<style scoped>

</style>