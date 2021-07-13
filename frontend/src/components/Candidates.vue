<template>
<div class="etitle">
    <p class="main">Candidates</p>
    <button class="butn" data-bs-toggle="modal" data-bs-target="#candidate"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button>

<div class="modal fade" id="candidate" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Candidate:</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="">
          <div class="mb-3">
            <label class="form-label" for="fname">First Name:</label>
          <input class="form-control" type="text" name="fname" placeholder="" id="fname">
          </div>
          <div class="mb-3">
            <label class="form-label" for="lname">Last Name:</label>
          <input class="form-control" type="text" name="lname" placeholder="" id="lname">
          </div>
          
          
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
            <label class="form-check-label" for="flexRadioDefault1">
               President 
            </label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
            <label class="form-check-label" for="flexRadioDefault2">
            Vice President
            </label>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
<div>
  <p class="head">Running for President</p>
  <!-- the list elements will be rendered by a for loop -->
  <ul class="cand">
  <li><img src="../assets/Portrait_Placeholder.png" alt=""><p class="name">Gerald</p></li>
  <li><img src="../assets/Portrait_Placeholder.png" alt=""><p class="name">Jasmine</p></li>
  </ul>
</div>
<div>
  <p class="head">Running for Vice President</p>
  <!-- the list elements will be rendered by a for loop -->
  <ul class="cand">
  <li><img src="../assets/Portrait_Placeholder.png" alt=""><p class="name">Gerald</p></li>
  <li><img src="../assets/Portrait_Placeholder.png" alt=""><p class="name">Jasmine</p></li>
  </ul>
</div>

</div>
</template>

<script>
export default {
    name: 'Candidates'
}
</script>

<style scoped>
.butn {
  background-color: white;
  border: none;
  padding: 1px 5px 2px 5px;
  vertical-align: middle;
  margin-left: 2%;
  margin-bottom: 2%;
}
.butn:hover {
  background-color: grey;
}
.etitle {
  margin-right: 75%;
  margin-top: 5%;
}
h4 {
  display: inline-block;
}
.main {
  font-size: 1.3em;
  display: inline-block;
}
ul {
  list-style-type: none;
  margin-left: 24%;
}
.name {
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: .8em;
}
img {
  width: 40%;
}
li {
  display: inline;
  margin-right: auto;
  margin-left:  5%;
  position: relative;
  text-align: center;
}
.head {
  text-align: left;
  margin-left: 34%;
  font-size: .9em;
  display: inline-flexbox;
}
</style>