<template>
  <div class="futsal-score-details-wrapper">
    <div class="futsal-score-details">
      <div v-for="(activity, index) in sortedActivities" :key="index" class="futsal-activity-row">
        <div class="activity-home-team">
          <FutsalActivity :activity="activity" teamType="home"/>
        </div>
        <div class="activity-score-time">
          <span class="activity-score-time-wrapper">
            <span v-if="activity.time">{{ activity.time }}'</span>
            <span v-else>NA</span>
          </span>
        </div>
        <div class="activity-away-team">
          <FutsalActivity :activity="activity" teamType="away"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

import { ActivityInterface } from '@/interfaces/interfaces';
import FutsalActivity from '@/components/futsal/FutsalActivity.vue';

@Component({
  components: { FutsalActivity }
})
export default class FutsalActivities extends Vue {
  @Prop() private activities!: ActivityInterface[];

  get sortedActivities() {
    return this.activities.sort(activity => activity.id);
  }
}
</script>
