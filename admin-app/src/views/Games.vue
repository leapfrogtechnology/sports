<template>
  <div>
    <h2 class="custom-page-title">GAMES</h2>
    <GamesList />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import GamesList from '@/components/games/GamesList.vue';

@Component({
  components: { GamesList }
})
export default class Games extends Vue {}
</script>
