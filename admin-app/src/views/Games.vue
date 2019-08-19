<template>
  <div>
    <h2 class="custom-page-title">GAMES</h2>
    <AddButton buttonText="Add new game" :handleClick="handleAddGame" />
    <ItemsList :data="data" :loading="loading" :pagination="pagination" :columns="columns" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { fetchAllGames } from '@/services/games';
import ItemsList from '@/components/common/ItemsList.vue';
import AddButton from '@/components/common/AddButton.vue';

@Component({
  components: { ItemsList, AddButton }
})
export default class Games extends Vue {
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

  private mounted() {
    this.fetchData();
  }

  private fetchData() {
    fetchAllGames()
      .then(response => {
        this.data = response;
      })
      .catch()
      .then(() => {
        this.loading = false;
      });
  }

  private handleAddGame() {}
}
</script>
