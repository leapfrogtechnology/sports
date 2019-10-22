<template>
  <div v-if="!fixtures.length" class="container">
    <p class="alert">Nothing to show here here at the moment.</p>
  </div>
  <div v-else class="container">
    <p v-if="!fixtures.length" class="alert">No fixtures found.</p>
    <ScoreCardsList
      v-else
      groupBy="round"
      :rounds="rounds"
      :fixtures="fixtures"
      :showFilterOptions="true"
      :triggerShowModal="triggerShowModal"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

import { FixtureInterface, RoundInterface } from '@/interfaces/interfaces';
import { sortFixturesByDate, getFixturesRounds } from '@/services/fixtures';
import ScoreCardsList from '@/components/common/score-card/ScoreCardsList.vue';

@Component({
  components: { ScoreCardsList }
})
export default class Fixtures extends Vue {
  @Prop() public data!: any;
  @Prop() public triggerShowModal!: any;

  get fixtures(): FixtureInterface[] {
    return this.data && this.data.fixtures && sortFixturesByDate(this.data.fixtures) || [];
  }

  get rounds(): RoundInterface[] {
    return (this.data && this.data.rounds && getFixturesRounds(this.fixtures, this.data.rounds)) || [];
  }
}
</script>
