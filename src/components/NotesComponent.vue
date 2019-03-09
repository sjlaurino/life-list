
<template>
  <div class="col">
    <div v-for="note in notes" class="notes col-2" :key="note._id">
      <div class="card">
        <div class="card-body">
          <p class="card-text">{{note.content}}</p>
          <p class="card-text">Created by:{{note.creator}}</p>
          <select v-model="newNote.flagged">
            <option :value="flagged" v-for="flagged in flags" :key="flagged"></option>
          </select>
        </div>
      </div>
    </div>

    <form @submit.prevent="addNote">
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
  </div>
</template>

<script>
export default {
  name: "NotesComponent",
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
    addNote() {}
  },
  components: {}
};
</script>
