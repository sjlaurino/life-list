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
                  @click="editItem(findActive._id)"
                  class="fas fa-pencil-alt ml-2"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
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
    return {};
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
      this.$store.commit("editItem", id);
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
