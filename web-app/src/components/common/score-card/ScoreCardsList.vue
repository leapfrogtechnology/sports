<template>
  <div v-if="fixtures.length" :class="scoreCardListWrapperClass">
    <div v-if="showFilterOptions" class="filters-wrapper">
      <RoundsFilter
        v-if="rounds && rounds.length"
        :rounds="rounds"
        :changeSelectedRound="changeSelectedRound"
      />
      <TeamsFilter
        v-if="teamsList && teamsList.length"
        :teams="teamsList"
        :changeSelectedTeam="changeSelectedTeam"
      />
    </div>
    <slot v-if="!!groupBy && !!rounds.length">
      <div v-for="(group, index) in groupedFixturesList" :key="`grouped-fixtures-${index}`">
        <h2 class="score-card-list-title">{{ group.round.description }}</h2>
        <ScoreCardWrapper
          v-for="(fixture, index) in group.fixtures"
          :key="`score-card-wrapper-${index}`"
          :fixture="fixture"
          :triggerShowModal="triggerShowModal"
        />
      </div>
    </slot>
    <slot v-else>
      <h2 v-if="title && title.length" class="score-card-list-title">{{ title }}</h2>
      <p v-if="!fixturesList.length" class="alert">No fixtures found.</p>
      <ScoreCardWrapper
        v-else
        v-for="(fixture, index) in fixturesList"
        :key="`score-card-wrapper-${index}`"
        :fixture="fixture"
        :triggerShowModal="triggerShowModal"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { find, chain, filter, cloneDeep } from 'lodash';
import { Component, Vue, Prop } from 'vue-property-decorator';

import SearchBar from '@/components/common/SearchBar.vue';
import { getTeamsFromFixtures } from '@/services/TeamService';
import TeamsFilter from '@/components/common/filters/TeamsFilter.vue';
import RoundsFilter from '@/components/common/filters/RoundsFilter.vue';
import ScoreCardWrapper from '@/components/common/score-card/ScoreCardWrapper.vue';
import { getFixturesRounds, searchFixturesByKeyword } from '@/services/FixtureService';
import { FixtureInterface, RoundInterface, TeamInterface } from '@/interfaces/interfaces';

@Component({
  components: { SearchBar, TeamsFilter, RoundsFilter, ScoreCardWrapper }
})
export default class ScoreCardList extends Vue {
  @Prop() public title!: string;
  @Prop() public triggerShowModal!: any;
  @Prop({ default: null }) public groupBy!: null;
  @Prop({ default: false }) public showFilterOptions!: boolean;
  @Prop({ default: () => [] }) public rounds!: RoundInterface[];
  @Prop({ default: () => [] }) public fixtures!: FixtureInterface[];

  public selectedTeam: TeamInterface | null = null;
  public selectedRound: RoundInterface | null = (this.rounds && this.rounds.length && this.rounds[0]) || null;

  public changeSelectedRound(round: RoundInterface) {
    this.selectedRound = round;
  }

  public changeSelectedTeam(team: TeamInterface) {
    this.selectedTeam = team;
  }

  private getRoundInfoByName(name: string): any {
    return find(this.rounds, { description: name }) || null;
  }

  get fixturesList(): FixtureInterface[] {
    let fixturesList = cloneDeep(this.fixtures);

    // For all rounds, return all fixtures.
    if (this.selectedRound && this.selectedRound.id !== 0) {
      fixturesList = filter(
        fixturesList,
        fixture => fixture.round.toLowerCase() === (this.selectedRound && this.selectedRound.description.toLowerCase())
      );
    }

    // Search fixtures by keywords
    if (this.selectedTeam && this.selectedTeam.id !== 0) {
      fixturesList = filter(
        fixturesList,
        fixture =>
          fixture.homeTeam.id === (this.selectedTeam && this.selectedTeam.id) ||
          fixture.awayTeam.id === (this.selectedTeam && this.selectedTeam.id)
      );
    }

    return fixturesList;
  }

  get groupedFixturesList(): any {
    const fixtures = cloneDeep(this.fixturesList);

    return chain(fixtures)
      .map(fixture => Object.assign(fixture, { roundInfo: this.getRoundInfoByName(fixture.round) }))
      .groupBy('round')
      .map(roundFixtures => ({
        round: roundFixtures[0].roundInfo,
        fixtures: chain(roundFixtures)
          .sortBy('date')
          .reverse()
          .sortBy('status')
          .reverse()
          .value()
      }))
      .sortBy('round.sortOrder')
      .reverse()
      .value();
  }

  get scoreCardListWrapperClass() {
    return {
      'score-card-list-wrapper': true,
      'score-card-list-wrapper--single': this.fixturesList.length === 1
    };
  }

  get teamsList() {
    return getTeamsFromFixtures(this.fixtures);
  }
}
</script>
