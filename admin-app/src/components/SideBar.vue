<template>
  <fragment>
    <div class="logo">
      <img :src="logo" />
    </div>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['4']">
      <a-menu-item
        v-for="(sideBarMenu, sideBarMenuIndex) in sideBarMenus"
        :key="`side-bar-menu-${sideBarMenuIndex}`"
      >
        <router-link :to="sideBarMenu.route">
          <a-icon :type="sideBarMenu.icon" />
          <span class="nav-text">{{ sideBarMenu.name }}</span>
        </router-link>
      </a-menu-item>
    </a-menu>
  </fragment>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SIDE_BAR_MENUS from '@/constants/sideBarMenu';
import { logoImage, logoInvertedImage } from '@/assets/images';

@Component
export default class SideBar extends Vue {
  private logo = logoImage;
  private sideBarMenus = SIDE_BAR_MENUS;
}
</script>

<style scoped lang="scss">
.logo {
  height: 32px;
  margin: 16px 16px 32px;
}
</style>
