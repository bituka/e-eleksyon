<template>
      <div class="mb-3">
        <label for="tbox" class="form-label">Title of your Election</label>
        <input type="text" v-model="title" class="tbox form-control" id="tbox" placeholder="Title...">
        <button @click="print" class="btn btn-outline-success" type="submit">Create an Election</button>
      </div>
</template>

<script>
export default {
    name: 'Form',
    data() {
        return {
            title: ''
        }
    },
    methods: {
        print() {
            console.log(this.title);
        }
    }
    
}
</script>

<style scoped>
.tbox {
    margin-top: 2%;
}
.form-label {
    margin-top: 18%;
    margin-left: 13%;
    font-weight: bold;
}
.form-control {
    padding: 1.5% 3%;
    width: 40%;
    margin-left: 27%;
}

.btn {
    margin-top: 2%;
    width: 24%;
    padding: 2% 2% ;
    margin-right: 4%;

}

</style>