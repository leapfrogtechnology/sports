<template>
  <div class="points-table-wrapper">
    <div v-if="!data.points || !data.points.length">
      <p class="alert">Nothing to show here at the moment.</p>
    </div>
    <slot v-else>
      <PointsTable
        v-for="(group, index) in groups"
        :key="`group-points-${index}`"
        :title="group.name"
        :points="group.points"
      />
    </slot>
  </div>
</template>

<script lang="ts">
import { uniqBy } from 'lodash';
import { Component, Vue, Prop } from 'vue-property-decorator';

import PointsTable from '@/components/common/PointsTable.vue';

@Component({
  components: { PointsTable }
})
export default class Points extends Vue {
  @Prop() private data!: any;

  get groups(): object {
    const groups: any = [];
    const uniqueGroups = uniqBy(this.data.points, 'group');

    uniqueGroups.forEach((g: any) => {
      const points = this.data.points.filter((p: any) => p.group === g.group);

      groups.push({
        points,
        name: g.group
      });
    });

    return groups;
  }
}
</script>
