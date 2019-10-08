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
      <ButtonGroupMenu :subRoutes="subRoutes" />
    </div>
  </div>
</template>

<script lang="ts">
import { sortBy } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';

import { SUB_ROUTES } from '@/constants/routes';
import DropDownMenu from './partials/DropDownMenu.vue';
import { CategoryInterface } from '@/interfaces/interfaces';
import ButtonGroupMenu from './partials/ButtonGroupMenu.vue';

@Component({
  components: { DropDownMenu, ButtonGroupMenu }
})
export default class SportHeader extends Vue {
  @Prop() private selectedSportSeason!: any;
  @Prop() private handleCategoryChange!: any;
  @Prop({ default: '' }) private title!: string;
  @Prop({ default: '' }) private subTitle!: string;
  @Prop({ default: () => [] }) private categories!: CategoryInterface[];

  private activeCategoryId: number = 0;

  public handleActiveCategoryChange() {
    this.handleCategoryChange(this.activeCategoryId);
  }

  get subRoutes() {
    const subRoutes = sortBy(SUB_ROUTES, 'sortOrder') as any;
    const { game, season } = this.$route.params;

    return (
      Object.keys(subRoutes).map(key => ({
        path: `/${game}/${season}/${subRoutes[key].path}`,
        name: subRoutes[key].name
      })) || []
    );
  }
}
</script>

<style>
</style>
