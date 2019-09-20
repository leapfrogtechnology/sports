<template>
  <div>
    <h2 class="custom-page-title">EMPLOYEES</h2>
    <a-alert v-if="errorMessage.length" :message="errorMessage" type="error" showIcon />
    <ItemsList
      v-else
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
    />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import {Vue, Component} from 'vue-property-decorator';

import ItemsList from '@/components/common/ItemsList.vue';

@Component({
  components: { ItemsList },
  computed: mapState('employees', ['data', 'loading', 'errorMessage'])
})
export default class Employees extends Vue {
  // Table
  private pagination: object = {};
  private columns: object[] = [
    {
      title: 'S. No.',
      width: '100px',
      customRender: (text: any, record: any, index: any) => index + 1
    },
    {
      title: 'Avatar',
      dataIndex: 'profilePictureUrl',
      scopedSlots: { customRender: 'avatar' }
    },
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'EMS ID',
      dataIndex: 'emsEmployeeId'
    }
  ];

  private mounted() {
    this.$store.dispatch(`employees/fetchList`);
  }
}
</script>
