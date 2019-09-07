<template>
  <div class="custom-top-bar">
    <a-button class="custom-top-bar--item" type="danger" size="small" @click="handleLogOut">
      <a-icon type="logout" />Log out
    </a-button>
    <div class="custom-top-bar--item">
      <a-avatar v-if="hasProfilePictureUrl" :src="userInfo.profilePictureUrl" size="small" />
      <a-avatar v-else icon="user" size="small" />
      {{ userInfo.firstName }}
    </div>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';

import * as ROUTES from '@/constants/routes';

@Component({
  computed: mapState('user', ['userInfo'])
})
export default class TopBar extends Vue {
  public userInfo!: any;

  private beforeMount() {
    this.$store.dispatch('user/fetchUserInfo');
  }

  private handleLogOut(e: any) {
    e.preventDefault();

    this.$store.dispatch('user/logout').then(() => {
      this.$router.push(ROUTES.DASHBOARD);
    });
  }

  get hasProfilePictureUrl() {
    return !!this.userInfo.profilePictureUrl;
  }
}
</script>
