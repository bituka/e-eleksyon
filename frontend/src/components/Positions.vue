<template>
<div class="col">
    <p>Positions</p>
    <button class="butn" data-bs-toggle="modal" data-bs-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
</svg></button>
<!-- Button trigger modal -->

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Position:</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form action="">
          <label class="form-label" for="position">Position:</label>
          <input class="form-control" type="text" name="position" placeholder="Type here..." id="position">
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
<!-- This will be a for loop to iterate positions stored in db -->
<ul>
    <li>President</li>
    <li>Vice President</li>
  </ul>
</div>
  

</template>

<script>
export default {
  name: 'ElekTitle'
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
p {
  font-size: 1.3em;
  margin-right: -1%;
  display: inline;
  margin-left: -52%;
}
ul {
  list-style-type: none;
  margin-right: 15%;
  margin-bottom: 5%;
  margin-left: 12%;
  
}
li {
  
  text-align: left;
}

</style>