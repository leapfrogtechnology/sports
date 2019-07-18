<template>
  <div class="teams-filter-wrapper">
    <v-select
      class="teams-filter"
      placeholder="Select a team"
      label="name"
      v-model="selectedTeam"
      :clearable="false"
      :options="teams"
      @input="handleChangeSelectedTeam"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { TeamInterface } from '@/interfaces/interfaces';

@Component
export default class TeamsFilter extends Vue {
  @Prop() public teams!: TeamInterface[];
  @Prop() public changeSelectedTeam!: any;

  public selectedTeam: TeamInterface | null = null;

  public created() {
    this.selectedTeam = this.teams[0];
  }

  private handleChangeSelectedTeam(team: TeamInterface) {
    this.changeSelectedTeam(team);
  }
}
</script>
