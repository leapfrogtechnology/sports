<template>
  <div>
    <h2 v-if="title && title.length" class="score-card-list-title">{{ title }}</h2>
     <div v-if="showGroup">
        <span class="score-card-list-title">
          Group {{ title }}
          {{ groupCount}}
        </span>
    </div>
    <table class="table table--striped points-wrapper">
      <thead>
        <tr>
          <th>#</th>
          <th>Team</th>
          <th>P</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th class="hide-on-small-screen">GF</th>
          <th class="hide-on-small-screen">GA</th>
          <th>GD</th>
          <th>Pts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(point, index) in points" :key="index">
          <td>{{ (index + 1) }}</td>
          <td class="points-team-name-wrapper">
            <TeamLogo :team="point.team" />
            {{ point.team.name }}
          </td>
          <td>{{ point.played }}</td>
          <td>{{ point.won }}</td>
          <td>{{ point.drawn }}</td>
          <td>{{ point.lost }}</td>
          <td class="hide-on-small-screen">{{ point.goalsFor }}</td>
          <td class="hide-on-small-screen">{{ point.goalsAgainst }}</td>
          <td>{{ point.goalDifference }}</td>
          <td>{{ point.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';

@Component({
  components: { TeamLogo }
})
export default class Points extends Vue {
  @Prop() private title!: string | null;
  @Prop() private points!: object;
  @Prop() private showGroup!: boolean;
}
</script>
