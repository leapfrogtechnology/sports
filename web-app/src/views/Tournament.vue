<template>
  <LoadingIcon v-if="tournamentData.loading"/>
  <div v-else-if="tournamentData.error" class="container">
    <div class="alert alert-error">Unable to fetch data. Please try again later.</div>
  </div>
  <div v-else-if="!!tournamentData.data" class="container">
    <SportHeader
      :title="title"
      :subTitle="subTitle"
      :categories="tournamentData.data.categories"
      :handleCategoryChange="handleCategoryChange"
    />
    <div class="tournament-content-wrapper">
      <router-view :data="tournamentData.data"/>
    </div>
    <ScoreModal />
  </div>
  <div v-else class="container">
    <div class="alert alert-error">Something went wrong. Please try again.</div>
  </div>
</template>

<script lang="ts">
  import { cloneDeep } from 'lodash';
  import { Vue, Component, Watch } from 'vue-property-decorator';

  import * as fixtureService from '@/services/fixtures';
  import * as categoriesService from '@/services/categories';
  import ScoreModal from '@/components/common/ScoreModal.vue';
  import LoadingIcon from '@/components/common/LoadingIcon.vue';
  import SportHeader from '@/components/common/sport-header/SportHeader.vue';

  @Component({
    components: { LoadingIcon, SportHeader, ScoreModal }
  })
  export default class Tournament extends Vue {
    public selectedCategoryId: number = 0;

    @Watch('$route')
    public onPropertyChanged(value: any, oldValue: any) {
      if (value.params.game !== oldValue.params.game || value.params.season !== oldValue.params.season) {
        this.selectedCategoryId = 0;

        this.fetchData();
      }
    }

    public mounted() {
      this.fetchData();
    }

    public handleCategoryChange(value: any) {
      this.selectedCategoryId = value;
    }

    private fetchData() {
      this.$store.dispatch('tournaments/fetchTournament', this.$route.params);
    }

    get tournamentData() {
      const data = this.$store && this.$store.getters['tournaments/selectedTournamentData'];
      const tournamentData = cloneDeep(data);

      if (tournamentData.data) {
        const category = categoriesService.getCategoryById(tournamentData.data.categories, this.selectedCategoryId);
        const filteredData = fixtureService.getFilteredData(tournamentData.data, { category });

        tournamentData.data = Object.assign(tournamentData.data, filteredData);
      }

      return tournamentData;
    }

    get title() {
      return this.$route.params.game;
    }

    get subTitle() {
      return this.$route.params.season;
    }
  }
</script>
