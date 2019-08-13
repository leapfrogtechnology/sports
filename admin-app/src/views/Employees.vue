<template>
  <div>
    <h2 class="custom-page-title">EMPLOYEES</h2>
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
