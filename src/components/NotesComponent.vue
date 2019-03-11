
<template>
  <div>
    <h4 class="text-center">Add Note:</h4>
    <form @submit.prevent="addNote()">
      <div class="row d-flex justify-content-center">
        <div class="col-4">
          <input type="text" v-model="creator" class="form-control" placeholder="Created By...">
        </div>
        <div class="col-4">
          <input type="text" v-model="content" class="form-control" placeholder="Note...">
        </div>
      </div>
      <button type="submit" class="submit btn btn-primary mt-1">Submit</button>
    </form>

    <div v-for="note in notes" class="notes col-6" :key="note._id">
      <div class="card mt-2">
        <div class="card-body">
          <p class="card-text">{{note.content}}</p>
          <p class="card-text">Created by:{{note.creator}}</p>
          <select v-model="newNote.flagged">
            <option :value="flagged" v-for="flagged in flags" :key="flagged">{{flagged}}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotesComponent",
  mounted() {
    let routeId = this.$route.params.id;
    this.$store.dispatch("getNotes", routeId);
  },
  props: [],
  data() {
    return {
      newNote: {
        creator: "",
        content: "",
        flagged: "pending"
      },
      flags: ["pending", "completed", "rejected"]
    };
  },
  computed: {
    notes() {
      return this.$store.state.notes;
    }
  },
  methods: {
    addNote() {
      let payload = {
        creator: this.creator,
        content: this.content,
        flagged: this.flagged
      };
      this.$store.dispatch("postNote", payload);
    }
  },
  components: {}
};
</script>
