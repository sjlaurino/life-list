<template>
  <div class="bg">
    <div class="row">
      <div class="col">
        <i @click="homeRoute()" class="fas fa-home fa-2x d-flex justify-content-start mt-1 ml-1"></i>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div v-if="findActive.title" class="col-8">
        <h1>{{findActive.title}}</h1>
        <table class="table table-bordered">
          <thead class="header">
            <tr>
              <th scope="col">Created by:</th>
              <th scope="col">
                Description:
                <i
                  v-if="!findActive.closed"
                  v-on:click="isOpen = !isOpen"
                  class="fas fa-pencil-alt ml-2"
                ></i>
              </th>
            </tr>
          </thead>
          <tbody class="item" :class="findActive.closed ? 'table-primary' :'table-warning'">
            <tr>
              <td>{{findActive.creator}}</td>
              <td>{{findActive.description}}</td>
            </tr>
          </tbody>
        </table>
        <span v-show="isOpen">
          <form @submit.prevent="editItem(findActive._id)">
            <h5 class="mb-3 mt-3">Edit '{{findActive.title}}'</h5>
            <div class="row d-flex justify-content-center">
              <div class="col-3">
                <input
                  type="text"
                  v-model="creator"
                  class="form-control"
                  placeholder="Created By..."
                >
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
            <button type="submit" class="submit btn btn-primary mt-1 mb-5">Submit</button>
          </form>
        </span>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col">
        <h5>Notes:</h5>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <NotesComponent></NotesComponent>
      <h3
        v-if="!this.$store.state.notes.length > 0 && findActive.closed"
      >list item does not contain any notes</h3>
    </div>
  </div>
</template>

<script>
import NotesComponent from "@/components/NotesComponent.vue";

export default {
  name: "itemDetails",
  mounted() {
    let id = this.$route.params.id;
    this.$store.dispatch("getList", id);
  },
  props: ["id"],
  data() {
    return {
      isOpen: false,
      description: "",
      title: "",
      creator: ""
    };
  },
  computed: {
    item() {
      return this.$store.state.activeItem;
    },
    findActive() {
      if (this.$store.state.activeItem._id) {
        return this.$store.state.activeItem;
      }
      return (
        this.$store.state.listItems.find(item => {
          return item._id == this.$route.params.id;
        }) || {}
      );
    }
  },
  methods: {
    homeRoute() {
      this.$store.commit("homeRoute");
    },
    editItem(id) {
      let newData = {
        creator: this.creator,
        title: this.title,
        description: this.description,
        id: id
      };
      this.$store.dispatch("editItem", newData);
    }
  },
  components: {
    NotesComponent
  }
};
</script>
<style scoped>
.fa-pencil-alt {
  cursor: pointer;
}
.fa-home {
  cursor: pointer;
}
.header {
  background-color: black;
  color: white;
}
.bg {
  background-color: azure;
}
</style>
