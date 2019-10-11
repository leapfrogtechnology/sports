<template>
  <div class="container">
    <FutsalStats v-if="isFutsal" :stats="stats" />
  </div>
</template>

<script lang="ts">
  import { Vue, Prop, Component} from 'vue-property-decorator';

  import FutsalStats from '@/components/futsal/FutsalStats.vue';

  @Component({
    components: { FutsalStats }
  })
  export default class StatsTable extends Vue {
    @Prop({ default: '' }) private title!: string;
    @Prop({ default: () => [] }) private stats!: any;

    get selectedSport(): string {
      return this.$route.params.game || '';
    }

    get isFutsal(): boolean {
      return this.selectedSport === 'futsal' || this.selectedSport === 'fifa';
    }
  }
</script>
