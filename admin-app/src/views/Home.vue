<template>
  <div class="home">
    <Dashboard msg="Sports Admin Dashboard" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import Dashboard from '@/views/Dashboard.vue';

@Component({
  components: {
    Dashboard
  }
})
export default class Home extends Vue {}
</script>

