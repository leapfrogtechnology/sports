<template>
  <div>
    <h2 class="custom-page-title">STATUSES</h2>
    <CustomButton text="Add new status" :handleClick="handleAdd" />
    <a-alert v-if="errorMessage.length" :message="errorMessage" type="error" showIcon />
    <ItemsList
      v-else
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';

import StatusInterface from '@/domains/models/Status';
import ItemsList from '@/components/common/ItemsList.vue';
import CustomButton from '@/components/common/CustomButton.vue';
import { STATUSES_ADD_EDIT_FORM_MODAL } from '@/constants/modals';

@Component({
  components: { ItemsList, CustomButton },
  computed: mapState('statuses', ['data', 'loading', 'errorMessage'])
})
export default class Statuses extends Vue {
  // Table
  private pagination: object = {};
  private columns: object[] = [
    {
      title: 'S. No.',
      width: '100px',
      customRender: (text: any, record: any, index: any) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Actions',
      width: '250px',
      scopedSlots: { customRender: 'actions' }
    }
  ];

  private mounted() {
    this.$store.dispatch(`statuses/fetchList`);
  }

  private handleEdit(data: StatusInterface) {
    this.$store.dispatch('statuses/setEditData', data);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Update status',
      component: STATUSES_ADD_EDIT_FORM_MODAL
    });
  }

  private handleDelete(data: StatusInterface) {
    const store = this.$store;
    const message = this.$message;

    this.$confirm({
      title: 'Do you want to delete this status?',
      onOk() {
        store.dispatch('statuses/delete', data).then(() => {
          store.dispatch(`statuses/fetchList`);
          message.success('Status deleted successfully.', 10);
        }).catch(err => {
          message.error('Unable to delete the status.', 10);
        });
      }
    });
  }

  private handleAdd(e: any) {
    e.preventDefault();

    // Remove editData, if any
    this.$store.dispatch('statuses/setEditData', null);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new status',
      component: STATUSES_ADD_EDIT_FORM_MODAL
    });
  }
}
</script>
