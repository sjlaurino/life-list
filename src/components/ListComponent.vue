<template>
  <div class="list">
    <table class="table table-bordered">
      <thead class="header">
        <tr>
          <th scope="col">Title:</th>
          <th scope="col">Created by:</th>
          <th scope="col">Description:</th>
          <th scope="col">Status:</th>
        </tr>
      </thead>
      <tbody
        v-for="item in listItems"
        :key="item._id"
        :class="item.closed ? 'table-primary' :'table-warning'"
        class="listItem"
      >
        <tr>
          <td @click="setActive(item)">{{item.title}}</td>
          <td @click="setActive(item)">{{item.creator}}</td>
          <td @click="setActive(item)">{{item.description}}</td>
          <button
            class="btn btn-danger mt-1 open"
            v-if="!item.closed"
            @click="toggleClosed(item._id)"
          >Did the thing?</button>
          <button v-else class="btn btn-success closed mt-1">Crushed it!</button>
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
    },
    toggleClosed(id) {
      this.$store.dispatch("toggleClosed", id);
    }
  },
  components: {}
};
</script>
<style scoped>
.closed {
  cursor: not-allowed;
}
.listItem:hover {
  background: #3374c2;
  cursor: pointer;
  color: white;
  transform: scale(1.1);
}
.header {
  background-color: black;
  color: white;
}
</style>
