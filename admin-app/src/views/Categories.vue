<template>
  <div>
    <h2 class="custom-page-title">CATEGORIES</h2>
    <AddButton buttonText="Add new category" :handleClick="handleAdd" />
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

import CategoryInterface from '@/domains/models/Category';
import ItemsList from '@/components/common/ItemsList.vue';
import AddButton from '@/components/common/AddButton.vue';
import { CATEGORIES_ADD_EDIT_FORM_MODAL } from '@/constants/modals';

@Component({
  components: { ItemsList, AddButton },
  computed: mapState('categories', ['data', 'loading', 'errorMessage'])
})
export default class Categories extends Vue {
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
    this.$store.dispatch(`categories/fetchList`);
  }

  private handleEdit(data: CategoryInterface) {
    this.$store.dispatch('categories/setEditData', data);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Update category',
      component: CATEGORIES_ADD_EDIT_FORM_MODAL
    });
  }

  private handleDelete(data: CategoryInterface) {
    const store = this.$store;
    const message = this.$message;

    this.$confirm({
      title: 'Do you want to delete this category?',
      onOk() {
        store.dispatch('categories/delete', data).then(() => {
          store.dispatch(`categories/fetchList`);
          message.success('Category deleted successfully.', 10);
        }).catch(err => {
          message.error('Unable to delete the category.', 10);
        });
      }
    });
  }

  private handleAdd(e: any) {
    e.preventDefault();

    // Remove editData, if any
    this.$store.dispatch('categories/setEditData', null);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new category',
      component: CATEGORIES_ADD_EDIT_FORM_MODAL
    });
  }
}
</script>
