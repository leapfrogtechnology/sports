<template>
  <div>
    <h2 class="custom-page-title">GAMES</h2>
    <AddButton buttonText="Add new game" :handleClick="handleAddGame" />
    <ItemsList
      :data="data"
      :loading="loading"
      :pagination="pagination"
      :columns="columns"
      :handleEdit="handleEdit"
      :handleDelete="handleDelete"
    />
    <AddGameFormModal
      v-if="isAddModalVisible"
      :visible="isAddModalVisible"
      :submitForm="submitForm"
      :handleCancel="handleFormCancel"
      :errorMessage="addFormErrorMessage"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import ItemsList from '@/components/common/ItemsList.vue';
import AddButton from '@/components/common/AddButton.vue';
import { fetchAllGames, createGame } from '@/services/games';
import AddGameFormModal from '@/components/games/AddGameFormModal.vue';

@Component({
  components: { ItemsList, AddButton, AddGameFormModal }
})
export default class Games extends Vue {
  // Form
  private isAddModalVisible: boolean = false;
  private addFormErrorMessage: string = '';

  // Table
  private data: [] = [];
  private loading: boolean = true;
  private pagination: object = {};
  private columns: object[] = [
    {
      title: 'S. No.',
      width: '100px',
      customRender: (text: any, record: any, index: any) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: true
    },
    {
      title: 'Short/route name',
      dataIndex: 'shortName',
      sorter: true
    },
    {
      title: 'Actions',
      width: '250px',
      scopedSlots: { customRender: 'actions' }
    }
  ];

  protected submitForm(payload: { name: string; shortName: string }) {
    createGame(payload)
      .then(() => {
        this.fetchData();

        this.isAddModalVisible = false;

        this.$message.success('New game added successfully.');
      })
      .catch(err => {
        this.addFormErrorMessage = err.toString();
      });
  }

  protected handleFormCancel(e: any) {
    e.preventDefault();

    this.isAddModalVisible = false;
  }

  protected handleEdit(a: any) {
    //tslint:disable
    console.log(`Edit form`, a);
  }

  protected handleDelete(a: any) {
    //tslint:disable
    console.log(`Delete record`, a);
  }

  private mounted() {
    this.fetchData();
  }

  private fetchData() {
    this.loading = true;

    fetchAllGames()
      .then(response => {
        this.data = response;
      })
      .catch()
      .then(() => {
        this.loading = false;
      });
  }

  private handleAddGame(e: any) {
    e.preventDefault();

    this.isAddModalVisible = true;
  }
}
</script>
