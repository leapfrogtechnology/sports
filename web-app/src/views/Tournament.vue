<template>
  <LoadingIcon v-if="tournamentData.loading"/>
  <div v-else-if="tournamentData.error" class="container">
    <div class="alert alert-error">Unable to fetch data. Please try again later.</div>
  </div>
  <div v-else class="container">
    <SportHeader
      :title="title"
      :subTitle="subTitle"
      :selectedSportSeason="selectedSportSeason"
      :categories="tournamentData.data.categories"
    />
    <div class="tournament-content-wrapper">
      <router-view :data="tournamentData.data"/>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch } from 'vue-property-decorator';

  import LoadingIcon from '@/components/common/LoadingIcon.vue';
  import SportHeader from '@/components/common/sport-header/SportHeader.vue';

  @Component({
    components: { LoadingIcon, SportHeader }
  })
  export default class Tournament extends Vue {
    @Watch('$route')
    onPropertyChanged() {
      this.fetchData();
    }

    public mounted() {
      this.fetchData();
    }

    private fetchData() {
      this.$store.dispatch('tournaments/fetchTournament', this.$route.params);
    }

    get tournamentData() {
      return this.$store && this.$store.getters['tournaments/selectedTournamentData'];
    }

    get title() {
      return this.$route.params.game;
    }

    get subTitle() {
      return this.$route.params.season;
    }

    get selectedSportSeason() {
      return {
        sport: this.$route.params.game,
        season: this.$route.params.season
      };
    }
  }
</script>
