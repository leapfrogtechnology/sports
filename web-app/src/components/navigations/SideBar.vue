<template>
  <div :class="['sidebar-wrapper', classes]" @click="showHideSideBar(false)">
    <div class="sidebar" @click.stop.prevent>
      <Logo />
      <ul class="sidebar-menu">
        <li v-for="(sideBar, index) in sideBarData" :key="`sidebar-${index}`">
          <div class="sidebar-menu-item" v-if="sideBar.seasons.length">
            <i :class="[sideBar.icon]"></i>
            {{ sideBar.name }}
            <ul class="sidebar-submenu">
              <li
                v-for="(season, index) in sideBar.seasons"
                :key="`season-${index}`"
                @click="showHideSideBar(false)"
                class="sidebar-submenu-item"
              >
                <router-link :to="season.route" active-class="active">{{ season.name }}</router-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import Logo from '@/components/common/Logo.vue';
import { fetchTournamentsList, getTournamentIcon, getTournamentsListForSideBar } from '@/services/TournamentService';

@Component({
  components: { Logo }
})
export default class SideBar extends Vue {
  @Prop() public classes!: object;
  @Prop() public showHideSideBar!: any;

  public sideBarData: object[] = [];

  public async mounted() {
    this.sideBarData = await this.getSideBarData();
  }

  private async getSideBarData() {
    const tournaments = await fetchTournamentsList();

    const data = getTournamentsListForSideBar(tournaments);

    return data;
  }
}
</script>
