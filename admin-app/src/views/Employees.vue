<template>
  <div>
    <h3>List of employees</h3>
    <EmployeeList />
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

import EmployeeList from '@/components/employees/EmployeesList.vue';

@Component({
  components: { EmployeeList }
})
export default class Employees extends Vue {

}
</script>
