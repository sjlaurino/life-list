<template>
  <div>
    <div class="row">
      <div class="col">
        <i @click="homeRoute()" class="fas fa-home d-flex justify-content-start mt-1 ml-1"></i>
      </div>
    </div>
    <div class="row d-flex justify-content-center">
      <div class="col-8">
        <h1>{{findActive.title}}</h1>
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Created by:</th>
              <th scope="col">Description:</th>
            </tr>
          </thead>
          <tbody class="item">
            <tr>
              <td>{{findActive.creator}}</td>
              <td>
                {{findActive.description}}
                <i
                  v-on:click="isOpen = !isOpen"
                  class="fas fa-pencil-alt ml-2"
                ></i>
              </td>
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
      <NotesComponent></NotesComponent>
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
      return this.$store.state.listItems.find(item => {
        return item._id == this.$route.params.id;
      });
    }
  },
  methods: {
    homeRoute() {
      this.$store.commit("homeRoute");
    },
    editItem(id) {
      debugger;
      this.$store.dispatch("editItem", id);
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
</style>
