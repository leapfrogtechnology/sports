<template>
  <div v-if="text.length">
    <a-button
      :style="{ margin: '8px 0' }"
      type="primary"
      :icon=icon
      @click="handleClick"
    >{{text}}</a-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class CustomButton extends Vue {
  @Prop() private text!: string;
  @Prop({
    default: 'plus'
  })
  private icon!: string;
  @Prop() private handleClick!: any;
}
</script>
