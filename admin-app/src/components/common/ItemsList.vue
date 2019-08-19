<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="tableData"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="actions">
      <span>
        <a href="javascript:;">Edit</a>
        <a-divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    </template>
  </a-table>
</template>

<script lang="ts">
import { sortBy } from 'lodash';
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class ItemsList extends Vue {
  @Prop() private data!: [];
  @Prop() private loading!: boolean;
  @Prop() private columns!: object[];
  @Prop() private pagination!: object;

  private tableData: any[] = [];

  private updated() {
    this.tableData = this.data;
  }

  private handleTableChange(pagination: any, filters: any, sorter: any) {
    if (sorter) {
      // Clone the original data
      const data = JSON.parse(JSON.stringify(this.data));
      const sortedData = sortBy(data, [sorter.fieldName]);

      this.tableData = sorter.order === 'descend' ? sortedData.reverse() : sortedData;
    }
  }
}
</script>
