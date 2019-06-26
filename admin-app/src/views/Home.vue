<template>
  <div class="home">
    <!-- <HelloWorld msg="Sports Admin Dashboard"/> -->
    <Login />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// import HelloWorld from '@/components/HelloWorld.vue';
import Login from '@/components/Login.vue';

@Component({
  components: {
    // HelloWorld,
    Login
  }
})
export default class Home extends Vue {}
</script>

