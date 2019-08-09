<template>
  <div class="points-table-wrapper">
    <div v-if="!data.points || !data.points.length">
      <p class="alert">Nothing to show here at the moment.</p>
    </div>
    <slot v-else-if="!groups.length || groups.length === 1">
      <Points :points="data.points" />
    </slot>
    <slot v-else>
      <Points
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

import Points from './partials/Points.vue';

@Component({
  components: { Points }
})
export default class FutsalPoints extends Vue {
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
