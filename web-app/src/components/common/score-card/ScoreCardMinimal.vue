<template>
  <div class="score-card-minimal">
    <div class="minimal-fixture-id">{{ `Match ${fixture.id} - ${fixture.roundInfo.description}` }}</div>
    <div class="minimal-teams">
      <div :class="['minimal-team', isHomeTeamWinner ? 'winner' : '']">
        <div class="minimal-team-name">{{ homeTeam.name }}</div>
        <div v-if="isHomeTeamWinnerForNoScore" class="minimal-team-score">
          <i class="fas fa-trophy" />
        </div>
        <div v-else class="minimal-team-score">{{ fixture.homeTeamScore }}</div>
      </div>
      <div :class="['minimal-team', isAwayTeamWinner ? 'winner' : '']">
        <div class="minimal-team-name">{{ awayTeam.name }}</div>
        <div v-if="isAwayTeamWinnerForNoScore" class="minimal-team-score">
          <i class="fas fa-trophy" />
        </div>
        <div v-else class="minimal-team-score">{{ fixture.awayTeamScore }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { getTeamInfo } from '@/services/teams';
import { isFixturePlayed } from '@/services/fixtures';
import { FixtureInterface } from '@/interfaces/interfaces';

@Component
export default class ScoreCardMinimal extends Vue {
  @Prop() public fixture!: FixtureInterface;

  get homeTeam() {
    return getTeamInfo(this.fixture.homeTeam, this.fixture.homeTeamParentFixtureId);
  }

  get awayTeam() {
    return getTeamInfo(this.fixture.awayTeam, this.fixture.awayTeamParentFixtureId);
  }

  get isHomeTeamWinnerForNoScore() {
    return (
      isFixturePlayed(this.fixture) &&
      this.fixture.winnerTeam &&
      this.fixture.winnerTeam.id === this.fixture.homeTeam.id
    );
  }

  get isAwayTeamWinnerForNoScore() {
    return (
      isFixturePlayed(this.fixture) &&
      this.fixture.winnerTeam &&
      this.fixture.winnerTeam.id === this.fixture.awayTeam.id
    );
  }

  get isHomeTeamWinner() {
    return (
      isFixturePlayed && (this.isHomeTeamWinnerForNoScore || this.fixture.homeTeamScore > this.fixture.awayTeamScore)
    );
  }

  get isAwayTeamWinner() {
    return (
      isFixturePlayed && (this.isAwayTeamWinnerForNoScore || this.fixture.awayTeamScore > this.fixture.homeTeamScore)
    );
  }
}
</script>
