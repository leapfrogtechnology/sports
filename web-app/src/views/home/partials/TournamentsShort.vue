<template>
  <div v-if="competitions.length" class="recent-tournaments-wrapper">
    <p class="score-card-list-title">{{ title }}</p>
    <div class="recent-tournaments-content">
      <div
        v-for="(competition, index) in competitions"
        :key="`competition-${competition.id}-${index}`"
        @click.prevent="handleClick(competition)"
        class="recent-tournament"
      >
        <i :class="getIcon(competition)"/>
        <div class="recent-tournament--info">
          <p>
            {{ competition.name }}: {{ competition.season }}
          </p>
          <p
            v-if="getDaysToGo(competition) >= 0"
            class="recent-days-to-go"
          >Starting from <span class="recent-days-to-go--date">{{ getStartDate(competition) }}</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { format as formatDate } from 'date-fns';
import { differenceInDays, isBefore } from 'date-fns';
import { Vue, Prop, Component } from 'vue-property-decorator';

import { SeasonInterface } from '@/interfaces/interfaces';

@Component
export default class TournamentsShort extends Vue {
  @Prop() private title!: string;
  @Prop() private competitions!: SeasonInterface[];

  public handleClick(competition: SeasonInterface) {
    const seasonName = competition.shortName ? competition.shortName : competition.season;
    const link = competition.parentTournament ? `/${competition.parentTournament.shortName}/${seasonName}` : '';

    if (link.length) {
      this.$router.push({
        path: link
      });
    }
  }

  public getLink(competition: SeasonInterface): string {
    return competition.parentTournament ? `${competition.parentTournament.shortName}/${competition.season}` : '';
  }

  public getDaysToGo(competition: SeasonInterface): number {
    return differenceInDays(competition.startDate, new Date());
  }

  public getStartDate(competition: SeasonInterface): string {
    return formatDate(new Date(competition.startDate), 'dddd, MMM DD, YYYY');
  }

  public getIcon(competition: SeasonInterface): string {
    let icon = 'rt-icon ';

    switch (competition.parentTournament && competition.parentTournament.shortName) {
      case 'futsal':
        icon += 'far fa-futbol';
        break;
      case 'table-tennis':
        icon += 'fas fa-table-tennis';
        break;
      case 'carrom-board':
        icon += 'fas fa-vector-square';
        break;
      case 'chess':
        icon += 'fas fa-chess';
        break;
      case 'counter-strike':
      case 'fifa':
      case 'dota2':
        icon += 'fas fa-gamepad';
        break;
    }

    return icon;
  }
}
</script>
