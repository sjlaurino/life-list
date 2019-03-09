<template>
  <div class="row d-flex justify-content-center">
    <div class="col-8 mt-5">
      <h1>{{item.title}}</h1>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Created by:</th>
            <th scope="col">Description:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{item.creator}}</td>
            <td>{{item.description}}</td>
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
    this.$store.dispatch("getList");
    this.$store.dispatch("getNotes");
  },
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    item() {
      return this.$store.state.activeItem;
    }
  },
  methods: {},
  components: {
    NotesComponent
  }
};
</script>