<template>
  <div class="sport-sub-header-wrapper sport-sub-header-wrapper--button-group">
    <div class="sport-menu-wrapper sport-menu-wrapper--menu">
      <ul>
        <li
          v-for="(route, index) in subRoutes"
          :key="`sub-route-${index}`"
        >
          <router-link :to="route.path" exact-active-class="active">{{ route.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

  @Component
  export default class ButtonGroupMenu extends Vue {
    @Prop() public subRoutes!: any;
  }
</script>

