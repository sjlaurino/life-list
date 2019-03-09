<template>
  <div class="list">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Title:</th>
          <th scope="col">Created by:</th>
          <th scope="col">Description:</th>
        </tr>
      </thead>
      <tbody v-for="item in listItems" :key="item._id">
        <tr @click="setActive(item)">
          <td>{{item.title}}</td>
          <td>{{item.creator}}</td>
          <td>{{item.description}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "list",
  props: [],
  data() {
    return {};
  },
  computed: {
    listItems() {
      return this.$store.state.listItems;
    }
  },
  methods: {
    setActive(item) {
      this.$store.dispatch("setActive", item);
    }
  },
  components: {}
};
</script>