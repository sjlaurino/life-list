<template>
  <div class="home">
    <h1 class="mb-3 mt-3 title">Welcome to Your Life List!</h1>
    <form @submit.prevent="addItem">
      <div class="row d-flex justify-content-center">
        <div class="col-3">
          <input type="text" v-model="creator" class="form-control" placeholder="Created By...">
        </div>
        <div class="col-3">
          <input type="text" v-model="title" class="form-control" placeholder="Title...">
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-6">
          <textarea
            type="text"
            v-model="description"
            class="form-control"
            placeholder="Describe Life List Item..."
          ></textarea>
        </div>
      </div>
      <button type="submit" class="submit btn btn-warning mt-1">Submit</button>
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
    addItem: function(e) {
      let payload = {
        creator: this.creator,
        title: this.title,
        description: this.description
      };
      if (this.creator && this.title && this.description) {
      }

      if (!this.creator) {
        this.$swal("FREEZE!", "Name required", "OK");
      }
      if (!this.title) {
        this.$swal("FREEZE!", "Title required", "OK");
      }
      if (!this.description) {
        this.$swal("FREEZE!", "Description required", "OK");
      }

      e.preventDefault();

      this.$store.dispatch("postItem", payload);

      event.target.reset();
    }
  }
};
</script>
<style scoped>
.submit {
  cursor: pointer;
}
.title {
  color: black;
  font-family: "Amatic SC", cursive;
  font-size: 50px;
  font-weight: bold;
}
.home {
  background-color: azure;
}
</style>

