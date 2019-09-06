<template>
  <div>
    <h2 class="custom-page-title">ROUNDS</h2>
    <AddButton buttonText="Add new round" :handleClick="handleAdd" />
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

import RoundInterface from '@/domains/models/Round';
import ItemsList from '@/components/common/ItemsList.vue';
import AddButton from '@/components/common/AddButton.vue';
import { ROUNDS_ADD_EDIT_FORM_MODAL } from '@/constants/modals';

@Component({
  components: { ItemsList, AddButton },
  computed: mapState('rounds', ['data', 'loading', 'errorMessage'])
})
export default class Rounds extends Vue {
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
      title: 'Short name',
      dataIndex: 'shortName'
    },
    {
      title: 'Sort order',
      dataIndex: 'sortOrder'
    },
    {
      title: 'Actions',
      width: '250px',
      scopedSlots: { customRender: 'actions' }
    }
  ];

  private mounted() {
    this.$store.dispatch(`rounds/fetchList`);
  }

  private handleEdit(data: RoundInterface) {
    this.$store.dispatch('rounds/setEditData', data);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Update round',
      component: ROUNDS_ADD_EDIT_FORM_MODAL
    });
  }

  private handleDelete(data: RoundInterface) {
    const store = this.$store;
    const message = this.$message;

    this.$confirm({
      title: 'Do you want to delete this round?',
      onOk() {
        store.dispatch('rounds/delete', data).then(() => {
          store.dispatch(`rounds/fetchList`);
          message.success('Round deleted successfully.', 10);
        }).catch(err => {
          message.error('Unable to delete the round.', 10);
        });
      }
    });
  }

  private handleAdd(e: any) {
    e.preventDefault();

    // Remove editData, if any
    this.$store.dispatch('rounds/setEditData', null);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new round',
      component: ROUNDS_ADD_EDIT_FORM_MODAL
    });
  }
}
</script>
