<template>
  <div class="knockout-item">
    <div :class="[hasParentFixtures ? 'knockout-item-parent' : 'knockout-item-child']">
      <ScoreCardMinimal :fixture="fixture"/>
    </div>
    <div class="knockout-item-children" v-if="hasParentFixtures">
      <div class="knockout-item-child" v-if="fixture && fixture.homeTeamParentFixtureId">
        <Tree :fixtureIds="fixture.homeTeamParentFixtureId" :allFixtures="allFixtures"/>
      </div>
      <div class="knockout-item-child" v-if="fixture && fixture.awayTeamParentFixtureId">
        <Tree :fixtureIds="fixture.awayTeamParentFixtureId" :allFixtures="allFixtures"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { find } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';

import ScoreCardMinimal from '@/components/common/score-card/ScoreCardMinimal.vue';

@Component({
  components: { ScoreCardMinimal }
})
export default class Tree extends Vue {
  @Prop() public fixtureIds!: any;
  @Prop() public allFixtures!: any;

  get fixture() {
    return find(this.allFixtures, { id: this.fixtureIds }) as any;
  }

  get hasParentFixtures() {
    return this.fixture && (this.fixture.homeTeamParentFixtureId || this.fixture.awayTeamParentFixtureId);
  }
}
</script>
