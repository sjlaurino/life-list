<template>
  <div class="row d-flex justify-content-center">
    <div class="col-8 mt-5">
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
            <td>{{findActive.description}}</td>
          </tr>
        </tbody>
      </table>
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
  methods: {},
  components: {
    NotesComponent
  }
};
</script>
<style>
.item {
  cursor: pointer;
}
</style>
