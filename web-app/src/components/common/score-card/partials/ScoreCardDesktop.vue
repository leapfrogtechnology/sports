<template>
  <div
    class="score-card score-card--desktop"
    :class="{ 'score-card--cancelled': isFixtureCancelled }"
    @click="showFixtureModal"
  >
    <!-- Fixture date info -->
    <div class="other-info-wrapper other-info-wrapper--left">
      <span class="other-info-wrapper__day">{{ fixtureDate.day }}</span>
      <span class="other-info-wrapper__date">{{ fixtureDate.date }}</span>
      <span class="other-info-wrapper__time">{{ fixtureDate.time }}</span>
    </div>
    <!-- Home team -->
    <div class="team-wrapper team-wrapper--home">
      <div class="fixture-team-logo">
        <TeamLogo :team="fixture.homeTeam"/>
      </div>
      <p class="fixture-team-name">{{ getTeamInfo(fixture.homeTeam).name }}</p>
    </div>
    <!-- Result -->
    <div v-if="isFixtureCancelled" class="score-wrapper score-wrapper--cancelled">CANCELLED</div>
    <div v-else-if="isFixturePlayed" class="score-wrapper">
      <span :class="['score-wrapper__home', isHomeTeamWinnerForNoScore ? 'score-wrapper__home__trophy' : '']">
        <i v-if="isHomeTeamWinnerForNoScore" class="fas fa-trophy"/>
        {{ fixture.homeTeamScore }}
      </span>
      <span v-if="!this.fixture.winnerTeam" class="score-wrapper__dot">:</span>
      <span :class="['score-wrapper__away', isAwayTeamWinnerForNoScore ? 'score-wrapper__away__trophy' : '']">
        {{ fixture.awayTeamScore }}
        <i v-if="isAwayTeamWinnerForNoScore" class="fas fa-trophy"/>
      </span>
    </div>
    <div v-else class="score-wrapper score-wrapper--versus">vs</div>
    <!-- Away team -->
    <div class="team-wrapper team-wrapper--away">
      <p class="fixture-team-name">{{ getTeamInfo(fixture.awayTeam).name }}</p>
      <div class="fixture-team-logo">
        <TeamLogo :team="fixture.awayTeam"/>
      </div>
    </div>
    <!-- Other info -->
    <div class="other-info-wrapper other-info-wrapper--right">
      <span
        v-if="fixture.categoryType && fixture.categoryType.length"
        class="other-info-wrapper__category"
      >{{ fixture.categoryType }}</span>
      <span
        v-if="fixture.round && fixture.round.length"
        class="other-info-wrapper__round"
      >{{ fixture.round }}</span>
      <span v-if="showMatchNumber" class="other-info-wrapper__match">Match {{ fixture.id }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { getTeamInfo } from '@/services/teams';
import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';
import { FixtureInterface, TeamInterface } from '@/interfaces/interfaces';
import { getFixtureDate, isFixturePlayed, isFixtureCancelled } from '@/services/fixtures';

@Component({
  components: { TeamLogo }
})
export default class ScoreCardDesktop extends Vue {
  @Prop() private showFixtureModal!: any;
  @Prop() private fixture!: FixtureInterface;

  private getTeamInfo(team: TeamInterface): TeamInterface {
    return getTeamInfo(team);
  }

  get fixtureDate() {
    return getFixtureDate(this.fixture);
  }

  get isFixturePlayed() {
    return isFixturePlayed(this.fixture);
  }

  get isFixtureCancelled() {
    return isFixtureCancelled(this.fixture);
  }

  get showMatchNumber() {
    return !(
      (this.fixture.round && this.fixture.round.length) ||
      (this.fixture.categoryType && this.fixture.categoryType.length)
    );
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
}
</script>
