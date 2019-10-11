<template>
  <div>
    <div v-if="!goalsStats.players.length && !yellowCardsStats.players.length && !redCardsStats.players.length">
      <p class="alert">No stats available.</p>
    </div>
    <div v-else class="stats-list-wrapper">
      <Stat
        v-if="goalsStats.players.length"
        :stat="goalsStats"
      />
      <Stat
        v-if="assistsStats.players.length"
        :stat="assistsStats"
      />
      <Stat
        v-if="yellowCardsStats.players.length"
        :stat="yellowCardsStats"
      />
      <Stat
        v-if="redCardsStats.players.length"
        :stat="redCardsStats"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import Stat from './partials/Stat.vue';
import { footballIcon, redCardIcon, yellowCardIcon, footballAssistIcon } from '@/assets/images';

@Component({
  components: { Stat }
})
export default class FutsalStats extends Vue {
  @Prop() private stats!: any;

  get goalsStats() {
    return {
      title: 'Goals',
      icon: footballIcon,
      players: this.stats.goals
    };
  }

  get assistsStats() {
    return {
      title: 'Assists',
      icon: footballAssistIcon,
      players: this.stats.assists || []
    };
  }

  get yellowCardsStats() {
    return {
      title: 'Yellow Cards',
      icon: yellowCardIcon,
      players: this.stats.yellowCards
    };
  }

  get redCardsStats() {
    return {
      title: 'Red Cards',
      icon: redCardIcon,
      players: this.stats.redCards
    };
  }
}
</script>
