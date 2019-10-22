<template>
  <div class="container">
    <div v-if="!hasStats">
      <p class="alert">Nothing to show here at the moment.</p>
    </div>
    <slot v-else>
      <StatsTable :stats="data.stats"/>
    </slot>
  </div>
</template>

<script lang="ts">
  import { Vue, Prop, Component } from 'vue-property-decorator';

  import StatsTable from '@/components/common/StatsTable.vue';

  @Component({
    components: { StatsTable }
  })
  export default class Stats extends Vue {
    @Prop() private data!: any;

    get hasStats(): boolean {
      return !!(this.data.stats && Object.values(this.data.stats).length);
    }
  }
</script>
