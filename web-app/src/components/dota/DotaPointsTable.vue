<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>Team</th>
      <th>P</th>
      <th>W</th>
      <th>L</th>
      <th>Pts</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(point, index) in points" :key="index">
      <td>{{ point.id }}</td>
      <td class="points-team-name-wrapper">
        <TeamLogo :participant="point.team"/> {{ point.team.name }}
      </td>
      <td>{{ point.played }}</td>
      <td>{{ point.won }}</td>
      <td>{{ point.lost }}</td>
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
  export default class DotaPointsTable extends Vue {
    @Prop() private points!: any;
  }
</script>
