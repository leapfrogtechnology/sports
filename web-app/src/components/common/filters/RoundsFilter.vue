<template>
  <div class="rounds-filter-wrapper">
    <v-select
      class="rounds-filter"
      label="description"
      placeholder="Select a round"
      v-model="selectedRound"
      :clearable="false"
      :options="rounds"
      @input="handleChangeSelectedRound"
    />
  </div>
</template>

<script lang="ts">
import { Prop, Component, Vue } from 'vue-property-decorator';

import { RoundInterface } from '@/interfaces/interfaces';

@Component
export default class RoundsFilter extends Vue {
  @Prop()
  public rounds!: RoundInterface[];
  @Prop()
  public changeSelectedRound!: any;

  public selectedRound: RoundInterface | null = null;

  public created() {
    this.selectedRound = this.rounds[0];
  }

  private handleChangeSelectedRound(round: RoundInterface) {
    this.changeSelectedRound(round);
  }
}
</script>
