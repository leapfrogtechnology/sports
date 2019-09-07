<template>
  <a-layout>
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <SideBar />
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px' }">
      <a-layout-header :style="{ background: '#fff', padding: 0 }">
        <div :style="{ padding: '4px 24px', background: '#fff' }">
          <TopBar />
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial' }">
        <div :style="{ padding: '24px', background: '#fff' }">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
    <Modal />
  </a-layout>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import TopBar from '@/components/TopBar.vue';
import SideBar from '@/components/SideBar.vue';
import Modal from '@/components/common/Modal.vue';

@Component({
  components: { Modal, TopBar, SideBar }
})
export default class Dashboard extends Vue {}
</script>
