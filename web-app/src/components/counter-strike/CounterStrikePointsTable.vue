<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Team</th>
        <th>P</th>
        <th>W</th>
        <th>D</th>
        <th>L</th>
        <th class="hide-on-small-screen">RW</th>
        <th class="hide-on-small-screen">RL</th>
        <th>RD</th>
        <th>Pts</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(point, index) in points" :key="index">
        <td>{{ point.id }}</td>
        <td class="points-team-name-wrapper">
          <TeamLogo :team="point.team"/>
          {{ point.team.name }}
        </td>
        <td>{{ point.played }}</td>
        <td>{{ point.won }}</td>
        <td>{{ point.drawn }}</td>
        <td>{{ point.lost }}</td>
        <td class="hide-on-small-screen">{{ point.roundsWon }}</td>
        <td class="hide-on-small-screen">{{ point.roundsLost }}</td>
        <td>{{ getRoundsDifference(point) }}</td>
        <td>{{ point.points }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';

@Component({
  components: { TeamLogo }
})
export default class CounterStrikePointsTable extends Vue {
  @Prop() private points!: any;

  public getRoundsDifference(point: any): string {
    const prefix = !!point.roundsDifference && point.roundsDifference > 0 ? `+` : ``;

    return `${prefix}${point.roundsDifference}`;
  }
}
</script>
