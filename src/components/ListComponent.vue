<template>
  <div class="list">
    <table class="table table-bordered">
      <thead class="header">
        <tr>
          <th scope="col">Title:</th>
          <th scope="col">Created by:</th>
          <th scope="col">Created at:</th>
          <th scope="col">Description:</th>
          <th @click="toggle++;" class="sort" scope="col">Status:</th>
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
          <td @click="setActive(item)">{{item.createdAt | formatDate }}</td>
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
import Moment from "moment";
import { debug } from "util";

export default {
  name: "list",
  props: [],
  data() {
    return {
      toggle: 0
    };
  },
  computed: {
    listItems() {
      let lists = [...this.$store.state.listItems];
      if (this.toggle % 2) {
        lists.sort((a, b) => a.closed - b.closed);
      }
      return lists;
    }
  },
  methods: {
    setActive(item) {
      this.$store.dispatch("setActive", item);
    },
    toggleClosed(id) {
      this.$store.dispatch("toggleClosed", id);
    }
    // sortDate() {
    //   return this.$store.listItems.sort(it);
    // },
    // sortStatusToggle() {
    // this.$store.state.listItems.sort((a, b) => a.closed - b.closed);
    // }
  },
  filters: {
    formatDate(date) {
      return Moment(String(date)).format("MM/DD/YYYY, LT");
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
.sort {
  cursor: pointer;
}
</style>
