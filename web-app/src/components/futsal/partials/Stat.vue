<template>
  <div v-if="stat" class="stats-wrapper">
    <div class="stats-col">
      <h4 class="stats-title">
        <img v-if="stat.icon" :src="stat.icon" class="stat-image-logo" alt>
        {{ stat.title }}
      </h4>
      <table class="table table--striped">
        <tbody>
          <tr v-for="(player, index) in stat.players" :key="`player-stat-${index}`">
            <td class="stats-player-name-wrapper">
              <TeamLogo :team="player"/>
              {{ player.name }}
            </td>
            <td class="stats-player-score-wrapper">{{ player.count }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import { StatInterface } from '@/interfaces/interfaces';
import TeamLogo from '@/components/common/team-logo/TeamLogo.vue';

@Component({
  components: { TeamLogo }
})
export default class Stat extends Vue {
  @Prop() public stat!: StatInterface;
}
</script>
