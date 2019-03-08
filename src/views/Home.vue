<template>
  <div class="home">
    <form @submit.prevent="addItem">
      <h1 class="mb-3 mt-3">Welcome to Your Life List!</h1>
      <div class="row d-flex justify-content-center">
        <div class="col-2">
          <input type="text" v-model="creator" class="form-control" placeholder="Created By...">
        </div>
        <div class="col-2">
          <input type="text" v-model="title" class="form-control" placeholder="Title...">
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-4">
          <textarea
            type="text"
            v-model="description"
            class="form-control"
            placeholder="Type Life List Item Here..."
          ></textarea>
        </div>
      </div>
      <button type="submit" class="submit btn btn-primary mt-1">Submit</button>
    </form>
    <div class="row d-flex justify-content-center mt-5">
      <listComponent></listComponent>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import listComponent from "@/components/ListComponent.vue";

export default {
  name: "home",
  mounted() {
    debugger;
    this.$store.dispatch("getList");
  },
  data() {
    return {
      creator: "",
      title: "",
      description: ""
    };
  },
  components: {
    listComponent
  },
  methods: {
    addItem() {
      let payload = {
        creator: this.creator,
        title: this.title,
        description: this.description
      };
      this.$store.dispatch("postItem", payload);
    }
  }
};
</script>
<style scoped>
.submit {
  cursor: pointer;
}
</style>

