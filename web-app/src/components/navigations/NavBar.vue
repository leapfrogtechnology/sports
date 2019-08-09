<template>
  <div>
    <div class="logo-wrapper">
      <img
        :src="logo"
        class="logo"
        alt="sports"
      >
      <div class="logo-title">{{ pageTitle }}</div>
    </div>
    <ul class="nav nav--primary">
      <li>
        <router-link
          :to="baseRoutes.FUTSAL"
          active-class="active"
        >
          <i class="fa fa-futbol" />
          <span class="nav__link-text">FUTSAL</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="baseRoutes.CHESS"
          active-class="active"
        >
          <i class="fa fa-chess" />
          <span class="nav__link-text">CHESS</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="baseRoutes.CARROM_BOARD"
          active-class="active"
        >
          <i class="fa fa-vector-square" />
          <span class="nav__link-text">CAROM-BOARD</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="baseRoutes.TABLE_TENNIS"
          active-class="active"
        >
          <i class="fa fa-table-tennis" />
          <span class="nav__link-text">TABLE-TENNIS</span>
        </router-link>
      </li>
      <li>
        <router-link
          :to="baseRoutes.OTHERS"
          active-class="active"
        >
          <i class="fa fa-ellipsis-h" />
          <span class="nav__link-text">MORE...</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import EventBus from '@/events/eventBus';
import { invertedLogo } from '@/assets/images';
import { BASE_ROUTES } from '@/constants/routes';

interface TitleInterface {
  primaryText: string;
  secondaryText?: string;
}

@Component
export default class NavBar extends Vue {
  private baseRoutes: object = Object.freeze(BASE_ROUTES);
  private logo: string = invertedLogo;
  private title: TitleInterface = {
    primaryText: 'LF Sports',
    secondaryText: '',
  };

  public created() {
    EventBus.$on('change-logo-title', (primaryText: string = 'LF Sports', secondaryText: string = '') => {
      this.title.primaryText = primaryText;
      this.title.secondaryText = secondaryText;
    });
  }

  get pageTitle() {
    return `${this.title.primaryText} ${this.title.secondaryText}`;
  }
}
</script>
