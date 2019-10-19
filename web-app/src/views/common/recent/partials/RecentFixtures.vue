<template>
  <div v-if="noRecentFixtures">
    <p class="alert alert-success">Nothing to see here. Trying other sections.</p>
  </div>
  <div v-else>
    <ScoreCardsList
      v-if="recentFixtures.todayFixtures.length"
      title="Today"
      :fixtures="recentFixtures.todayFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="recentFixtures.tomorrowFixtures.length"
      title="Tomorrow"
      :fixtures="recentFixtures.tomorrowFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="recentFixtures.twRemainingFixtures.length"
      title="Later this week"
      :fixtures="recentFixtures.twRemainingFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="recentFixtures.nwFixtures.length"
      title="Next week"
      :fixtures="recentFixtures.nwFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="recentFixtures.twPlayedFixtures.length"
      title="Earlier this week"
      :fixtures="recentFixtures.twPlayedFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="recentFixtures.lwFixtures.length"
      title="Last week"
      :fixtures="recentFixtures.lwFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="recentFixtures.upComingFixtures.length"
      title="Upcoming"
      :fixtures="recentFixtures.upComingFixtures"
      :triggerShowModal="triggerShowModal"
    />
    <ScoreCardsList
      v-if="noRecentFixtures && recents.results.length"
      title="Results"
      :fixtures="recents.results"
      :triggerShowModal="triggerShowModal"
    />
  </div>
</template>

<script lang="ts">
import dateFns from 'date-fns';
import { isEqual } from 'lodash';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

import { isFixturePlayed, isFixtureCancelled } from '@/services/fixtures';
import { RecentsInterface, FixtureInterface } from '@/interfaces/interfaces';
import ScoreCardsList from '@/components/common/score-card/ScoreCardsList.vue';

@Component({
  components: { ScoreCardsList }
})
export default class RecentFixtures extends Vue {
  @Prop() public fixtureLink!: string;
  @Prop() public triggerShowModal!: any;
  @Prop() public recents!: RecentsInterface;

  public noRecentFixtures: boolean = false;
  public recentFixtures: object = {
    todayFixtures: [],
    tomorrowFixtures: [],
    twPlayedFixtures: [],
    twRemainingFixtures: [],
    lwFixtures: [],
    nwFixtures: [],
    upComingFixtures: []
  };

  @Watch('recents', { immediate: true, deep: true })
  public onRecentsChanged(newVal: RecentsInterface, oldVal: RecentsInterface) {
    if (!isEqual(newVal, oldVal)) {
      this.updateData();
    }
  }

  public getFixturesForRangeOfDays(fixtures: FixtureInterface[], firstDay: any, lastDay: any) {
    let rangeFixtures: FixtureInterface[] = [];

    if (dateFns.isSameDay(firstDay, lastDay)) {
      rangeFixtures = fixtures.filter(fixture => dateFns.isSameDay(new Date(fixture.date), firstDay));
    } else {
      rangeFixtures = fixtures.filter(fixture => dateFns.isWithinRange(new Date(fixture.date), firstDay, lastDay));
    }

    return rangeFixtures.sort((a, b) => {
      return dateFns.compareAsc(a.date, b.date);
    });
  }

  public checkIfFixturesListIsEmpty(fixturesList: any) {
    const keys = Object.keys(fixturesList);

    for (const key of keys) {
      if (fixturesList[key] && fixturesList[key].length) {
        return false;
      }
    }

    return true;
  }

  public getRecentFixtures(recentFixtures: FixtureInterface[]) {
    const today = new Date();

    // Reset time
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    const yesterday = dateFns.subDays(today, 1);
    const tomorrow = dateFns.addDays(today, 1);
    const dayAfterTomorrow = dateFns.addDays(today, 2);
    const todayWeekDay = dateFns.getDay(today);
    const twStartDay = dateFns.startOfWeek(today);
    const twLastDay = dateFns.endOfWeek(today);
    const lwStartDay = dateFns.startOfWeek(dateFns.subWeeks(today, 1));
    const lwEndDay = dateFns.endOfWeek(dateFns.subWeeks(today, 1));
    const nwStartDay = dateFns.startOfWeek(dateFns.addWeeks(today, 1));
    const nwEndDay = dateFns.endOfWeek(dateFns.addWeeks(today, 1));

    const todayFixtures = this.getFixturesForRangeOfDays(recentFixtures, today, today);
    const tomorrowFixtures = this.getFixturesForRangeOfDays(recentFixtures, tomorrow, tomorrow);
    // Display this week played fixtures from Tuesday till end of the week.
    const twPlayedFixtures =
      todayWeekDay >= 1 ? this.getFixturesForRangeOfDays(recentFixtures, twStartDay, yesterday) : [];
    // Display this week remaining fixtures from Monday till Thursday.
    const twRemainingFixtures =
      todayWeekDay >= 1 && todayWeekDay <= 4
        ? this.getFixturesForRangeOfDays(recentFixtures, dayAfterTomorrow, twLastDay)
        : [];
    // Display last week fixtures from Sunday till Monday.
    const lwFixtures = todayWeekDay <= 1 ? this.getFixturesForRangeOfDays(recentFixtures, lwStartDay, lwEndDay) : [];
    // Display next week fixtures from Friday till end of the week or if there are no current week remaining fixtures.
    const nwFixtures =
      todayWeekDay >= 5 || !twRemainingFixtures.length
        ? this.getFixturesForRangeOfDays(recentFixtures, nwStartDay, nwEndDay)
        : [];

    let recentFixturesList = {
      todayFixtures,
      tomorrowFixtures,
      twPlayedFixtures,
      twRemainingFixtures,
      lwFixtures,
      nwFixtures,
      upComingFixtures: []
    };

    if (this.checkIfFixturesListIsEmpty(recentFixturesList)) {
      const comingFixtures = recentFixtures.filter(
        fixture => !(isFixturePlayed(fixture) || isFixtureCancelled(fixture))
      );

      recentFixturesList = Object.assign(recentFixturesList, {
        upComingFixtures: comingFixtures
      });
    }

    return recentFixturesList;
  }

  private updateData() {
    const recentFixtures = this.recents ? this.recents.results.concat(this.recents.fixtures) : [];

    if (!recentFixtures.length) {
      this.noRecentFixtures = true;

      return;
    }

    this.noRecentFixtures = false;
    this.recentFixtures = this.getRecentFixtures(recentFixtures);
  }
}
</script>
