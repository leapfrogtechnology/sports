<template>
  <div class="container">
    <div v-if="!fixtures.length">
      <p class="alert">Nothing to show here at the moment.</p>
    </div>
    <div v-else>
      <p v-if="!fixtures.length" class="alert">No results found.</p>
      <ScoreCardsList
        v-else
        groupBy="round"
        :rounds="rounds"
        :fixtures="fixtures"
        :showFilterOptions="true"
        :triggerShowModal="triggerShowModal"
      />
    </div>
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
export default class Results extends Vue {
  @Prop() public triggerShowModal!: any;

  @Prop() private data!: any;

  get fixtures(): FixtureInterface[] {
    return (this.data && this.data.results && sortFixturesByDate(this.data.results, 'DESC')) || [];
  }

  get rounds(): RoundInterface[] {
    return (this.data && this.data.rounds && getFixturesRounds(this.fixtures, this.data.rounds)) || [];
  }
}
</script>
