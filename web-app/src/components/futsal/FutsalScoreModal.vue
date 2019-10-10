<template>
  <div v-if="fixture">
    <div class="modal-title">
      <div class="modal-fixture-date">
        <span class="fixture-date">{{ fixtureDate }}</span>
      </div>
    </div>
    <div class="modal-body">
      <div class="modal-teams-wrapper">
        <div :class="['modal-team', getWinnerClassObject(fixture.homeTeam)]">
          <div class="modal-team-players">
            <TeamLogo :team="fixture.homeTeam" :showLarge="true"/>
          </div>
          <p class="text-center">{{ fixture.homeTeam.name }}</p>
        </div>
        <div class="modal-score">
          <span v-if="isFixturePlayed">
            <span :class="getWinnerClassObject(fixture.homeTeam)">{{ fixture.homeTeamScore }}</span> :
            <span :class="getWinnerClassObject(fixture.awayTeam)">{{ fixture.awayTeamScore }}</span>
          </span>
          <span v-else>VS</span>
        </div>
        <div :class="['modal-team', getWinnerClassObject(fixture.awayTeam)]">
          <div class="modal-team-players">
            <TeamLogo :team="fixture.awayTeam" :showLarge="true"/>
          </div>
          <p class="text-center">{{ fixture.awayTeam.name }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <p v-if="isFixtureCancelled" class="text-center">This fixture has been cancelled.</p>
      <p v-else-if="!isFixturePlayed" class="text-center">This fixture is yet to be played.</p>
      <p v-else-if="!fixture.activities.length" class="text-center">No extra information available.</p>
      <div v-else class="modal-fixture-activities-wrapper">
        <FutsalActivities :activities="fixture.activities"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import dateFns from 'date-fns';
  import { cloneDeep } from 'lodash';
  import { Vue, Component } from 'vue-property-decorator';

  import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';
  import FutsalActivities from '@/components/futsal/FutsalActivities.vue';
  import { FixtureInterface, TeamInterface } from '@/interfaces/interfaces';
  import { isFixturePlayed, isFixtureCancelled } from '@/services/FixtureService';

  @Component({
    components: { TeamLogo, FutsalActivities }
  })
  export default class FutsalScoreModal extends Vue {
    public isTeamWinner(team: TeamInterface) {
      const winnerTeam =
        this.fixture && this.fixture.homeTeamScore > this.fixture.awayTeamScore
          ? this.fixture && this.fixture.homeTeam
          : this.fixture && this.fixture.awayTeam;

      return winnerTeam && team.id === winnerTeam.id;
    }

    public getWinnerClassObject(team: TeamInterface) {
      return this.isFixturePlayed && this.isTeamWinner(team) ? { 'winner-team': true } : {};
    }

    get fixture(): FixtureInterface {
      const data = this.$store && this.$store.state.scoreModal.fixture;

      return cloneDeep(data);
    }

    get isFixturePlayed() {
      return isFixturePlayed(this.fixture);
    }

    get isFixtureCancelled() {
      return isFixtureCancelled(this.fixture);
    }

    get fixtureDate() {
      return this.fixture && dateFns.format(new Date(this.fixture.date), 'dddd MMM D, YYYY, hh:mm A');
    }
  }
</script>
