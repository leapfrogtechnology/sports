<template>
  <div>
    <h2 class="custom-page-title">EMPLOYEES</h2>
    <CustomButton :disabled="syncing" text="Sync Employees" icon="sync" :handleClick="handleSync" />
    <a-alert v-if="errorMessage.length" :message="errorMessage" type="error" showIcon />
    <ItemsList v-else :data="data" :loading="loading" :pagination="pagination" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';

import ItemsList from '@/components/common/ItemsList.vue';
import CustomButton from '@/components/common/CustomButton.vue';

@Component({
  components: { ItemsList, CustomButton },
  computed: mapState('employees', ['data', 'loading', 'errorMessage'])
})
export default class Employees extends Vue {
  private syncing: boolean = false;
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
    this.fetchList();
  }

  private async handleSync() {
    this.syncing = true;

    const message = this.$message;

    message.loading('Syncing the list of employees...', 0);

    this.$store
      .dispatch(`employees/sync`)
      .then(response => {
        this.$message.success(
          `Synced the list of employees: (${response.count.new}) new & (${response.count.updated}) updated.`,
          10
        );

        this.fetchList();
      })
      .catch(() => {
        this.$message.error('Unable to sync the list of employees. Please try again later.', 5);
      })
      .finally(() => {
        message.destroy();

        this.syncing = false;
      });
  }

  private fetchList() {
    this.$store.dispatch(`employees/fetchList`);
  }
}
</script>
