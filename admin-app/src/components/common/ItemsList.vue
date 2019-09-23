<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
  >
    <template slot="actions" slot-scope="record">
      <span>
        <a href="javascript:;" @click="() => handleEdit(record)">Edit</a>
        <a-divider type="vertical" />
        <a href="javascript:;" @click="() => handleDelete(record)">Delete</a>
      </span>
    </template>
    <template slot="avatar" slot-scope="avatar">
      <a-avatar size="large" :src="avatar" icon="user" />
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
}
</script>
