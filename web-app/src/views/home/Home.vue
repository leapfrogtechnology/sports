<template>
  <div class="container">
    <div class="home-wrapper">
      <div v-if="error" class="home-content-wrapper">
        <p class="home-sub-title">Oops...something went wrong. Try again later!</p>
      </div>
      <div v-else-if="loading" class="home-content-wrapper">
        <p class="home-sub-title">Hang on...fetching...</p>
        <LoadingIcon />
      </div>
      <div v-else class="home-content-wrapper">
        <TournamentsShort
          title="Current ongoing tournaments"
          :competitions="this.recentTournaments.current"
        />
        <TournamentsShort
          title="Upcoming tournaments"
          :competitions="this.recentTournaments.upcoming"
        />
        <TournamentsShort title="Past tournaments" :competitions="this.recentTournaments.past" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import LoadingIcon from '@/components/common/LoadingIcon.vue';
import TournamentsShort from './partials/TournamentsShort.vue';

@Component({
  components: { LoadingIcon, TournamentsShort }
})
export default class Home extends Vue {
  private error: boolean = false;

  get loading(): boolean {
    return this.$store.state.tournaments.loading;
  }

  get recentTournaments() {
    return this.$store.getters['tournaments/recentTournaments'];
  }
}
</script>
