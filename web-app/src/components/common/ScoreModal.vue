<template>
  <div v-if="show && !!bodyComponent" class="modal-wrapper" @click="close">
    <div class="modal container" @click="doNothing">
      <div class="modal-close" @click="close">
        <i class="fa fa-times"/>
      </div>
      <div v-if="!fixture">
        <div class="modal-title">Fixture not found.</div>
      </div>
      <component v-else :is="bodyComponent"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapState } from 'vuex';
  import { Vue, Component } from 'vue-property-decorator';

  @Component({
    computed: mapState('scoreModal', ['show', 'fixture', 'bodyComponent'])
  })
  export default class ScoreModal extends Vue {
    public close() {
      this.$store.dispatch('scoreModal/hideModal');
    }

    public doNothing(e: any) {
      e.stopImmediatePropagation();
    }
  }
</script>
