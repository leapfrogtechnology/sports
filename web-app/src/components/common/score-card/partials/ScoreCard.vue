<template>
  <div class="score-card-wrapper">
    <ScoreCardMobile :fixture="fixture" :showFixtureModal="showFixtureModal"/>
    <ScoreCardDesktop :fixture="fixture" :showFixtureModal="showFixtureModal"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  import * as MODALS from '@/constants/modals';
  import ScoreCardMobile from './ScoreCardMobile.vue';
  import ScoreCardDesktop from './ScoreCardDesktop.vue';
  import { FixtureInterface } from '@/interfaces/interfaces';

  @Component({
    components: { ScoreCardMobile, ScoreCardDesktop }
  })
  export default class ScoreCard extends Vue {
    @Prop() public fixture!: FixtureInterface;

    public showFixtureModal() {
      const modalBodyComponent = this.getScoreModal(this.$route.params.game);

      this.$store.dispatch('scoreModal/showModal', { fixture: this.fixture, bodyComponent: modalBodyComponent });
    }

    private getScoreModal(game: string) {
      switch (game.toLowerCase()) {
        case 'futsal':
          return MODALS.FUTSAL_SCORE_MODAL;
        case 'table-tennis':
          return MODALS.TABLE_TENNIS_SCORE_MODAL;
        case 'carrom-board':
          return MODALS.CARROM_BOARD_SCORE_MODAL;
        default:
          return null;
      }
    }
  }
</script>
