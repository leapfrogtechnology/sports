<template>
  <a-table
    :columns="columns"
    :rowKey="record => record.empId"
    :dataSource="data"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template slot="avatar" slot-scope="avatar">
      <a-avatar size="large" :src="avatar" icon="user" />
    </template>
  </a-table>
</template>

<script lang="ts">
import { sortBy } from 'lodash';
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class EmployeeList extends Vue {
  private loading: boolean = true;
  private pagination: object = {};
  private data: object[] = [];
  private columns: object[] = [
    {
      title: 'Profile',
      dataIndex: 'avatarUrl',
      scopedSlots: { customRender: 'avatar' }
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      sorter: true
    },
    {
      title: 'Middle Name',
      dataIndex: 'middleName',
      sorter: true
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      sorter: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: true
    },
    {
      title: 'EMS ID',
      dataIndex: 'empId',
      sorter: true
    },
    {
      title: 'Status',
      dataIndex: 'status',
      sorter: true
    }
  ];

  private mounted() {
    this.fetchData();
  }

  private handleTableChange(pagination: any, filters: any, sorter: any) {
    if (sorter) {
      // Clone the original data
      const data = JSON.parse(JSON.stringify(this.data));
      const sortedData = sortBy(data, [sorter.fieldName]);

      this.data = sorter.order === 'descend' ? sortedData.reverse() : sortedData;
    }
  }

  private fetchData() {
    this.data = [
      {
        empId: 1,
        avatarUrl: '',
        firstName: 'Emp1',
        middleName: '',
        lastName: 'Lname1',
        email: 'email1',
        status: 'Permanent'
      },
      {
        empId: 2,
        avatarUrl: '',
        firstName: 'Emp2',
        middleName: '',
        lastName: 'Lname2',
        email: 'email2',
        status: 'Intern'
      }
    ];

    this.loading = false;
  }
}
</script>
