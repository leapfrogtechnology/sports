<template>
  <div class="fixture-details">
    <div v-if="fixture.round" class="fixture-details-round">
      {{ fixture.round }}<span v-if="fixture.categoryType"> - {{ fixture.categoryType }}</span>
    </div>
    <div v-else class="fixture-details-round">Match {{ fixture.id }}</div>
    <div class="fixture-details-date">{{ fixtureDate.date }}, {{ fixtureDate.time }}</div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

import { getFixtureDate } from '@/services/fixtures';
import { FixtureInterface } from '@/interfaces/interfaces';

@Component
export default class FixtureDetailsMobile extends Vue {
  @Prop() private fixture!: FixtureInterface;

  get fixtureDate() {
    return getFixtureDate(this.fixture);
  }
}
</script>
