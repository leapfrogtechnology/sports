<template>
  <div class="logo-wrapper">
    <a @click="handleClick"><img :src="logo" class="logo" alt="sports"></a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { invertedLogo } from '@/assets/images';
import { BASE_ROUTE } from '@/constants/routes';

@Component
export default class Logo extends Vue {
  public logo: string = invertedLogo;

  public handleClick() {
    this.$router.push({
      path: BASE_ROUTE
    });
  }
}
</script>
