<template>
  <div class="container">
    <p v-if="!data.allFixtures.length" class="alert">Nothing to show here here at the moment.</p>
    <p v-else-if="areMultipleCategoriesSelected" class="alert">Please select one category.</p>
    <p v-else-if="!hasLastRoundFixtures" class="alert">Nothing to show here here at the moment.</p>
    <div v-else class="knockout-wrapper">
      <Tree :fixtureIds="latestRoundFixtureIds" :allFixtures="data.allFixtures" />
    </div>
  </div>
</template>

<script lang="ts">
import { chain, find, uniq } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';

import Tree from './partials/Tree.vue';

@Component({
  components: { Tree }
})
export default class Knockouts extends Vue {
  @Prop() public data!: any;

  private getRoundInfoByName(name: string): any {
    return find(this.data.rounds, { description: name }) || null;
  }

  get areMultipleCategoriesSelected() {
    const categories = this.data.allFixtures.map((a: any) => a.categoryType);
    const uniqueCategories = uniq(categories);

    return !!(uniqueCategories && uniqueCategories.length > 1);
  }

  get hasLastRoundFixtures(): boolean {
    // No rounds for this competition
    // Or, the last round is league which is also the first round
    if (!this.data.rounds.length || this.groupedFixtures[0].round.description.toLowerCase() === 'league') {
      return false;
    }

    const lastRoundFixtures = this.groupedFixtures && this.groupedFixtures.length && this.groupedFixtures[0].fixtures;

    if (
      lastRoundFixtures &&
      (lastRoundFixtures.length > 1 ||
        (lastRoundFixtures.length === 1 &&
          (lastRoundFixtures[0].homeTeamParentFixtureId || lastRoundFixtures[0].awayTeamParentFixtureId)))
    ) {
      return true;
    }

    return false;
  }

  get latestRoundFixtureIds() {
    const ids = this.groupedFixtures[0].fixtures.map(a => a.id);

    return ids[0];
  }

  get groupedFixtures() {
    const rFixtures = chain(this.data.allFixtures)
      .map(fixture => Object.assign(fixture, { roundInfo: this.getRoundInfoByName(fixture.round) }))
      .groupBy('round')
      .map(roundFixtures => ({
        round: roundFixtures[0].roundInfo,
        fixtures: chain(roundFixtures).value()
      }))
      .sortBy('round.sortOrder')
      .reverse()
      .value();

    return rFixtures;
  }
}
</script>
