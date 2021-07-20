<template>
<div class="container">
    <p class="head">Running for President</p>
  <!-- the candidates will be rendered by a for loop -->
  <form action="">
      <div class="row">
          <div class="col">
              <label class="label" for="gerald"><img  src="../assets/Portrait_Placeholder.png" alt=""><p class="name">Gerald</p></label>
      <input type="checkbox" name="" id="gerald">
          </div>
          <div class="col">
<label class="label" for="Sophia"><img  src="../assets/Portrait_Placeholder.png" alt=""><p class="name">Sophia</p></label>
      <input type="checkbox" name="" id="Sophia">
          </div>
          
      </div>
      
  </form>
</div>
</template>

<script>
export default {
    name: 'Ballot'
}
</script>

<style scoped>

.cand {
    margin-right: -5%;

}
.name {
  font-size: .8em;
}
img {
  width: 15%;
}
.head {
  text-align: left;
  margin-left: 23%;
  font-size: 1.3em;
  display: inline-flexbox;
  font-weight: bold;
}
.label {
    display: inline;
}
</style>