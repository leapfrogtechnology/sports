<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="actions" slot-scope="actions">
      <a-button type="default" size="small" icon="edit">Edit</a-button>
      <a-button type="danger" size="small" icon="delete">Delete</a-button>
    </template>
  </a-table>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { fetchAllGames } from '@/services/games';

@Component
export default class GamesList extends Vue {
  private data: [] = [];
  private loading: boolean = true;
  private pagination: object = {};
  private columns: object[] = [
    {
      title: 'S. No.',
      customRender: (text: any, record: any, index: any) => (index + 1)
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
      scopedSlots: { customRender: 'actions' }
    }
  ];

  private mounted() {
    this.fetchData();
  }

  private handleTableChange(pagination: any, filters: any, sorter: any) {
    // if (sorter) {
    //   // Clone the original data
    //   // const data = JSON.parse(JSON.stringify(this.data));
    //   // const sortedData = sortBy(data, [sorter.fieldName]);
    //   // this.data = sorter.order === 'descend' ? sortedData.reverse() : sortedData;
    // }
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
}
</script>
