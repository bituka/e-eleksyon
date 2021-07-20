<template>
  <div class="main">
    <h1>Login</h1>
      <a  href="https://google.com">
        <img id="google" src="../assets/icons8-google-30.png" alt="">
   </a>
   <a href="https://fb.com">
     <img id="fb" src="../assets/341641.png" alt="">
   </a>

    <div class="container">
    <form action="">
              <input type="text" name="uname" placeholder="Username" required>
              <input type="password" name="pword" placeholder="Password" required>
              <input type="submit" value="Submit">
          </form>
    </div>
      
  </div>
</template>

<script>
export default {
  name: 'LoginForm'
}
</script>

<style scoped>
.main {
  text-align: center;
  align-items: center;
  margin-top: 10%;
}
.container {
  padding: 2%;
}
input[type=text], input[type=password] {
  width: 55%;
  padding: 1% 2%;
  margin: 1%;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type=submit] {
  width:55%;
  background-color: #04AA6D;
  color: white;
  padding: 1% 2%;  
  border: none;
  border-radius: 4px;
  cursor: pointer;

}

#google {
  width: 33px;
  height: 33px;
  border-radius: 25px;
  border: 3px solid black;
  margin-right: 2%;
}

#google:hover {
  background-color:rgb(201, 201, 201);
}

#fb {
  width: 35px;
  height: 35px;
  border-radius: 30px;
  border: 3px solid black;

}
#fb:hover {
  background-color:rgb(201, 201, 201);

}
</style>