<template>
  <loading-icon v-if="loading"/>
  <div v-else-if="error" class="container">
    <div class="alert alert-error">Unable to load data. Please try again later.</div>
  </div>
  <div v-else class="container">
    <SportHeader
      :title="title"
      :subTitle="subTitle"
      :categories="data.categories"
      :rounds="data.rounds"
      :routes="routes"
      :selectedSportSeason="selectedSportSeason"
      :updateDataByCategoryId="updateDataByCategoryId"
    />
    <div class="tournament-content-wrapper">
      <router-view :data="data" :triggerShowModal="triggerShowModal"/>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from 'lodash';
import { Component, Vue, Prop } from 'vue-property-decorator';

import SPORTS from '@/constants/sports';
import { TABLE_TENNIS_ROUTES } from '@/constants/routes';
import { FixtureInterface } from '@/interfaces/interfaces';
import { getFilteredData } from '@/services/FixtureService';
import { getCategoryById } from '@/services/CategoryService';
import { getSanitizedData } from '@/services/FixtureService';
import LoadingIcon from '@/components/common/LoadingIcon.vue';
import { fetchSportData } from '@/services/TournamentService';
import SportHeader from '@/components/common/sport-header/SportHeader.vue';

@Component({
  components: { SportHeader, LoadingIcon }
})
export default class TableTennis extends Vue {
  @Prop() public updateSelectedSport: any;

  public data: any = {};
  public fixedData: any = {};
  public error: boolean = false;
  public loading: boolean = false;
  public season: string | number = '';
  public showModal: boolean = false;
  public routes: object = TABLE_TENNIS_ROUTES;
  public modalFixture: FixtureInterface | null = null;

  public async created() {
    await this.fetchData();
  }

  public async beforeUpdate() {
    if (this.season.toString() !== this.$route.params.season.toString()) {
      await this.fetchData();
    }
  }

  public async fetchData() {
    if (this.loading) {
      return;
    }

    this.error = false;
    this.loading = true;

    try {
      this.season = this.$route.params.season;
      this.updateSelectedSport(SPORTS.TABLE_TENNIS);

      const response = await fetchSportData(SPORTS.TABLE_TENNIS, this.season);

      if (response && response.status) {
        this.data = getSanitizedData(response.data);
        this.fixedData = cloneDeep(this.data);

        return;
      }

      this.data = null;
      this.error = true;
    } catch (e) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  }

  public updateDataByCategoryId(categoryId: number) {
    const category = getCategoryById(this.fixedData.categories, categoryId);

    this.data = getFilteredData(cloneDeep(this.fixedData), { category });
  }

  public triggerShowModal(status: boolean = false, fixture: FixtureInterface | null = null) {
    this.showModal = status;
    this.modalFixture = fixture;
  }

  get title(): string {
    return `Table Tennis`;
  }

  get subTitle(): string | number {
    return this.season;
  }

  get selectedSportSeason(): object {
    return {
      sport: SPORTS.TABLE_TENNIS,
      season: this.season
    };
  }
}
</script>
