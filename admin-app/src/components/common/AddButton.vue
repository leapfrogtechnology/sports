<template>
  <div v-if="buttonText.length">
    <a-button
      :style="{ margin: '8px 0' }"
      type="primary"
      icon="plus"
      @click="handleClick"
    >{{buttonText}}</a-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AddButton extends Vue {
  @Prop() private buttonText!: string;
  @Prop() private handleClick!: any;
}
</script>
