<template>
  <div v-if="fixture">
    <div class="modal-title">
      <div class="modal-fixture-round">{{ fixture.round }} - {{ fixture.categoryType }}</div>
      <div class="modal-fixture-date">{{ fixtureDate }}</div>
    </div>
    <div class="modal-body">
      <div class="modal-teams-wrapper">
        <div :class="['modal-team team-double', getWinnerClassObject(fixture.homeTeam)]">
          <div class="modal-team-players">
            <TeamLogo :team="fixture.homeTeam" :showLarge="true"/>
          </div>
          <p
            v-for="(player, index) in fixture.homeTeam.players"
            :key="`modal-team-player-name-${index}`"
            :class="['text-center', getWinnerClassObject(fixture.homeTeam)]"
          >{{ player.name }}</p>
        </div>
        <div class="modal-score">
          <span v-if="isFixturePlayed">
            <span :class="getWinnerClassObject(fixture.homeTeam)">{{ fixture.homeTeamScore }}</span> :
            <span :class="getWinnerClassObject(fixture.awayTeam)">{{ fixture.awayTeamScore }}</span>
          </span>
          <span v-else>VS</span>
        </div>
        <div :class="['modal-team team-double', getWinnerClassObject(fixture.awayTeam)]">
          <div class="modal-team-players">
            <TeamLogo :team="fixture.awayTeam" :showLarge="true"/>
          </div>
          <p
            v-for="(player, index) in fixture.awayTeam.players"
            :key="`modal-team-player-name-${index}`"
            class="text-center"
          >{{ player.name }}</p>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <p v-if="!isFixturePlayed" class="text-center">This fixture is yet to be played.</p>
      <p
        v-else-if="!fixture.activities.length"
        class="text-center"
      >No extra information available.</p>
      <div v-else class="modal-fixture-activities-wrapper">
        <div
          v-for="(activity, index) in fixture.activities"
          :key="`modal-fixture-activity-${index}`"
          class="modal-fixture-activity"
        >
          <span :class="['modal-fixture-activity-column', getSetWinnerClassObject(activity, 'home')]">
            {{ getTeamActivityScore(activity.homeTeamPoints) }}
          </span>
          <span class="modal-fixture-activity-column modal-fixture-activity-column--set">
            SET-{{ index + 1 }}
          </span>
          <span :class="['modal-fixture-activity-column', getSetWinnerClassObject(activity, 'away')]">
            {{ getTeamActivityScore(activity.awayTeamPoints) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import dateFns from 'date-fns';
  import { sortBy, cloneDeep } from 'lodash';
  import { Vue, Component } from 'vue-property-decorator';

  import { isFixturePlayed } from '@/services/fixtures';
  import { SCORE_MODAL_DATE_TIME_FORMAT } from '@/constants/utils';
  import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';
  import { TeamInterface, FixtureInterface, ActivityInterface } from '@/interfaces/interfaces';

  @Component({
    components: { TeamLogo }
  })
  export default class TableTennisScoreModal extends Vue {
    public isTeamWinner(team: TeamInterface) {
      const winnerTeam =
        this.fixture && this.fixture.homeTeamScore > this.fixture.awayTeamScore
          ? this.fixture && this.fixture.homeTeam
          : this.fixture && this.fixture.awayTeam;

      return winnerTeam && team.id === winnerTeam.id;
    }

    public isSetWinner(activity: ActivityInterface, team: string) {
      if (team.toLowerCase() === 'home' && activity.homeTeamPoints > activity.awayTeamPoints) {
        return true;
      }

      if (team.toLowerCase() === 'away' && activity.awayTeamPoints > activity.homeTeamPoints) {
        return true;
      }

      return false;
    }

    public getWinnerClassObject(team: TeamInterface) {
      return this.isFixturePlayed && this.isTeamWinner(team) ? { 'winner-team': true } : {};
    }

    public getSetWinnerClassObject(activity: ActivityInterface, team: string) {
      return this.isSetWinner(activity, team)
        ? {
          'set-winner': true
        }
        : {};
    }

    public getTeamActivityScore(points: number) {
      return Number.isInteger(points) ? points : '-';
    }

    get fixture(): FixtureInterface {
      const data = this.$store && this.$store.state.scoreModal.fixture;

      return cloneDeep(data);
    }

    get isFixturePlayed() {
      return isFixturePlayed(this.fixture);
    }

    get fixtureDate() {
      return this.fixture && dateFns.format(new Date(this.fixture.date), SCORE_MODAL_DATE_TIME_FORMAT);
    }

    get fixtureActivities() {
      const fixtureActivities = (this.fixture && this.fixture.activities) || [];

      if (fixtureActivities.length) {
        return sortBy(fixtureActivities, ['set']);
      }

      return [];
    }
  }
</script>
