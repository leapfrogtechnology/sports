<template>
  <div class="categories-filter-wrapper">
    <select
      class="categories-filter"
      v-model="selectedCateogoryId"
      @change="handleChangeSelectedCategoryId"
    >
      <option
        v-for="(category, index) in categories"
        :key="index"
        :value="category.id"
        class="categories-filter-item"
      >{{ category.description }}</option>
    </select>
  </div>
</template>

<script lang="ts">
import { CategoryInterface } from '@/interfaces/interfaces';
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component
export default class CategoriesFilter extends Vue {
  @Prop() public categories!: CategoryInterface[];
  @Prop() public selectedCategory!: CategoryInterface;
  @Prop() public changeSelectedCategory!: any;

  private selectedCateogoryId: number = this.selectedCategory.id;

  private handleChangeSelectedCategoryId() {
    const category = this.categories.find(cat => {
      return cat.id === this.selectedCateogoryId;
    });

    this.changeSelectedCategory(category);
  }
}
</script>
