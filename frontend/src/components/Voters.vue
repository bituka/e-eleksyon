<template>
  <div class="col">
      <p>Voters</p>
    <button class="butn" data-bs-toggle="modal" data-bs-target="#voters"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button>
<div class="modal fade" id="voters" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
<!-- Will be rendered a for loop
Latest 50 viewers will be displayed. -->
<ul>
  <li>Harumi</li>
  <li>Kazuya</li>
  <li>Chizuru</li>
</ul>
  </div>
</template>

<script>
export default {
    name: 'Voters'
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
  margin-left: 20%;
  float: left;
  border: 1px solid grey;
}
p {
  font-size: 1.3em;
  display: inline-block;
}
ul {
  list-style-type: none;
  margin-left: 30%;
  margin-bottom: 5%;
  text-align: left;
}
li {
  font-size: 1em;
  text-align: left;
  margin-left: 14%;
}
</style>