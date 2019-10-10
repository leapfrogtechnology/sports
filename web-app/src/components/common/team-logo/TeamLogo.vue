<template>
  <div v-if="isTeamDouble || isTeamSingle" :class="{ 'team-double': isTeamDouble }">
    <ParticipantLogo
      v-for="(player, index) in teamInfo.players"
      :key="index"
      :participant="player"
      :showLarge="showLarge"
      :customStyles="teamCustomStyles"
    />
  </div>
  <ParticipantLogo
    v-else
    :participant="teamInfo"
    :customStyles="teamCustomStyles"
    :showLarge="showLarge"
  />
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  import { TeamInterface } from '@/interfaces/interfaces';
  import ParticipantLogo from './partials/ParticipantLogo.vue';
  import { isTeamDouble, getTeamInfo, getTeamCustomStyles, isTeamSingle } from '@/services/TeamService';

  @Component({
    components: { ParticipantLogo }
  })
  export default class TeamLogo extends Vue {
    @Prop() public showLarge!: boolean;
    @Prop() private team!: TeamInterface;

    get isTeamDouble(): boolean {
      return isTeamDouble(this.team);
    }

    get isTeamSingle(): boolean {
      return isTeamSingle(this.team);
    }

    get teamInfo(): TeamInterface {
      return getTeamInfo(this.team);
    }

    get teamCustomStyles(): object {
      return getTeamCustomStyles(this.team);
    }
  }
</script>
