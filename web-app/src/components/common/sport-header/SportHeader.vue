<template>
  <div id="sport-header" class="sport-header-wrapper">
    <div class="sport-header">
      <h2 class="sport-title">
        {{ title }}
        <span v-if="subTitle.length" class="sport-sub-title">#{{ subTitle }}</span>
      </h2>
      <div class="sport-categories-wrapper">
        <div v-if="categories.length > 1" class="select-wrapper sport-categories">
          <select v-model="activeCategoryId" @change="handleActiveCategoryChange">
            <option
              v-for="(category, index) in categories"
              :key="index"
              :value="category.id"
            >{{ category.description }}</option>
          </select>
        </div>
      </div>
      <!-- <drop-down-menu :subRoutes="subRoutes" :rounds="matchRounds"/> -->
      <ButtonGroupMenu :subRoutes="subRoutes" :rounds="matchRounds"/>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';

import DropDownMenu from './partials/DropDownMenu.vue';
import { RoundInterface } from '@/interfaces/interfaces';
import { CategoryInterface } from '@/interfaces/interfaces';
import ButtonGroupMenu from './partials/ButtonGroupMenu.vue';

@Component({
  components: { DropDownMenu, ButtonGroupMenu }
})
export default class SportHeader extends Vue {
  @Prop() private routes!: any;
  @Prop() private selectedSportSeason!: any;
  @Prop() private updateDataByCategoryId!: any;
  @Prop({ default: '' }) private subTitle!: string;
  @Prop({ default: () => [] }) private title!: string;
  @Prop({ default: () => [] }) private rounds!: RoundInterface[];
  @Prop({ default: () => [] }) private categories!: CategoryInterface[];

  private activeCategoryId: number = 0;

  public getRouteName(routeKey: string): string {
    let routeName = '';

    switch (routeKey.toLowerCase()) {
      case 'home':
        routeName = 'Home';
        break;
      case 'fixtures':
        routeName = 'Fixtures';
        break;
      case 'results':
        routeName = 'Results';
        break;
      case 'teams':
        routeName = 'Teams';
        break;
      case 'points':
        routeName = 'Points';
        break;
      case 'stats':
        routeName = 'Stats';
        break;
      case 'knockouts':
        routeName = 'Knockouts';
        break;
    }

    return routeName;
  }

  public getRouteWithSeason(route: string) {
    const sport = this.selectedSportSeason.sport;
    const season = this.selectedSportSeason.season;

    let routePath = route;

    if (route.length) {
      if (sport.length) {
        routePath = routePath.replace(':sport', sport.toString());
      }

      if (season.length) {
        routePath = routePath.replace(':season', season.toString());
      }
    }

    return routePath;
  }

  public handleActiveCategoryChange() {
    this.updateDataByCategoryId(this.activeCategoryId);
  }

  get subRoutes() {
    const subRoutes = [];
    const keys = Object.keys(this.routes);

    for (const key of keys) {
      // Exclude unnecessary routes for sub-header
      if (key.toLowerCase() !== 'fixture') {
        subRoutes.push({
          path: this.getRouteWithSeason(this.routes[key]),
          name: this.getRouteName(key)
        });
      }
    }

    return subRoutes;
  }

  get matchRounds() {
    return _.sortBy(this.rounds, ['sortOrder']);
  }
}
</script>

<style>
</style>
