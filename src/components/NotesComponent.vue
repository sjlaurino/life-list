
<template>
  <div>
    <div v-show="!findActive.closed">
      <h4 class="text-center">Add Note:</h4>
      <form @submit.prevent="addNote()">
        <div class="row d-flex justify-content-center">
          <div class="col-4">
            <input
              type="text"
              v-model="newNote.creator"
              class="form-control"
              placeholder="Created By..."
            >
          </div>
          <div class="col-4">
            <input type="text" v-model="newNote.content" class="form-control" placeholder="Note...">
          </div>
        </div>
        <button type="submit" class="submit btn btn-primary mt-1">Submit</button>
      </form>
    </div>
    <div class="row d-flex justify-content-center">
      <div v-for="note in notes" class="notes col-5" :key="note._id">
        <div class="card mt-2">
          <div class="card-body">
            <p class="card-text">{{note.content}}</p>
            <p class="card-text">Created by:{{note.creator}}</p>
            <select v-model="newNote.flagged">
              <option
                @change="toggleNote(note.flagged)"
                :value="flagged"
                v-for="flagged in flags"
                :key="flagged"
              >{{flagged}}</option>
            </select>
          </div>
          <i
            v-show="!findActive.closed"
            @click="removeNote(note._id)"
            class="fas fa-trash-alt mb-1"
          ></i>
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
    },
    findActive() {
      return (
        this.$store.state.listItems.find(item => {
          return item._id == this.$route.params.id;
        }) || {}
      );
    }
  },
  methods: {
    addNote() {
      let payload = {
        creator: this.newNote.creator,
        content: this.newNote.content,
        flagged: this.newNote.flagged
      };
      this.$store.dispatch("postNote", payload);
      event.target.reset();
    },
    removeNote(id) {
      this.$store.dispatch("removeNote", id);
    },
    //toggle changing all notes at once. Haven't finished the edit in store.
    toggleNote(data) {
      this.$store.dispatch("toggleNote", data);
    }
  },
  components: {}
};
</script>
<style>
.fa-trash-alt {
  cursor: pointer;
}
</style>

