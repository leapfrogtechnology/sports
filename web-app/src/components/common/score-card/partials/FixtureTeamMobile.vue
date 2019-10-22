<template>
  <div :class="{ 'fixture-team-name-wrapper': true, 'winner' : isWinner }">
    <TeamLogo :team="team"/>
    <span class="fixture-team-name">{{ teamInfo.name }}</span>
    <span class="fixture-team-score">
      <i v-if="isWinner" class="fas fa-trophy"/>
      {{ score }}
    </span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { getTeamInfo } from '@/services/teams';
import { TeamInterface } from '@/interfaces/interfaces';
import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';

@Component({
  components: { TeamLogo }
})
export default class FixtureTeamMobile extends Vue {
  @Prop() public team!: TeamInterface;
  @Prop() public isWinner!: boolean;
  @Prop() public score!: number;

  get teamInfo(): TeamInterface {
    return getTeamInfo(this.team);
  }
}
</script>
