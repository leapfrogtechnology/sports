<template>
  <div>
    <h2 v-if="title && title.length" class="score-card-list-title">{{ title }}</h2>
    <div class="table table--striped points-wrapper">
      <FutsalPointsTable v-if="isFutsal" :points="points" />
      <DotaPointsTable v-if="isDota" :points="points" />
      <CounterStrikePointsTable v-if="isCounterStrike" :points="points" />
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Prop, Component} from 'vue-property-decorator';

  import DotaPointsTable from '@/components/dota/DotaPointsTable.vue';
  import FutsalPointsTable from '@/components/futsal/FutsalPointsTable.vue';
  import CounterStrikePointsTable from '@/components/counter-strike/CounterStrikePointsTable.vue';

  @Component({
    components: { DotaPointsTable, FutsalPointsTable, CounterStrikePointsTable }
  })
  export default class PointsTable extends Vue {
    @Prop({ default: '' }) private title!: string;
    @Prop({ default: () => [] }) private points!: any;

    get selectedSport(): string {
      return this.$route.params.game || '';
    }

    get isFutsal(): boolean {
      return this.selectedSport === 'futsal' || this.selectedSport === 'fifa';
    }

    get isDota(): boolean {
      return this.selectedSport === 'dota2';
    }

    get isCounterStrike(): boolean {
      return this.selectedSport === 'counter-strike';
    }
  }
</script>
