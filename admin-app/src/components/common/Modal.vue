<template>
  <div>
    <a-modal :visible="visible" :title="title" :footer="null" @cancel="handleCancel">
      <component :is="bodyComponent" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({
  computed: mapState('modal', ['visible', 'title', 'bodyComponent', 'errorMessage'])
})
export default class Modal extends Vue {
  private handleCancel(e: any) {
    e.preventDefault();

    this.$store.dispatch('modal/hideModal');
  }
}
</script>
