<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="tableData"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="actions" slot-scope="record">
      <span>
        <a href="javascript:;" @click="() => handleEdit(record)">Edit</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="() => handleDelete(record)">Delete</a>
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

  @Prop() private handleEdit!: any;
  @Prop() private handleDelete!: any;

  private tableData: any[] = [];
  private tableDataChanged: boolean = false;

  private updated() {
    if (!this.tableDataChanged) {
      this.tableData = this.data;
    }
  }

  private handleTableChange(pagination: any, filters: any, sorter: any) {
    if (sorter) {
      this.tableDataChanged = true;

      // Clone the original data
      const data = JSON.parse(JSON.stringify(this.data));
      const sortedData = sortBy(data, [sorter.fieldName]);

      this.tableData = sorter.order === 'descend' ? sortedData.reverse() : sortedData;
    }
  }
}
</script>
