<template>
  <div>
    <h2 class="custom-page-title">GAMES</h2>
    <AddButton buttonText="Add new game" :handleClick="handleAddGame" />
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

import { GAMES_ADD_FORM_MODAL } from '@/enums/modals';
import ItemsList from '@/components/common/ItemsList.vue';
import AddButton from '@/components/common/AddButton.vue';
import { fetchAllGames, createGame } from '@/services/games';

@Component({
  components: { ItemsList, AddButton },
  computed: mapState('games', ['data', 'loading', 'errorMessage'])
})
export default class Games extends Vue {
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
      title: 'Short/route name',
      dataIndex: 'shortName'
    },
    {
      title: 'Actions',
      width: '250px',
      scopedSlots: { customRender: 'actions' }
    }
  ];

  private mounted() {
    this.$store.dispatch(`games/fetchList`);
  }

  private handleEdit(a: any) {
    //tslint:disable
    console.log(`Edit form`, a);
  }

  private handleDelete(a: any) {
    //tslint:disable
    console.log(`Delete record`, a);
  }

  private handleAddGame(e: any) {
    e.preventDefault();

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new game',
      component: GAMES_ADD_FORM_MODAL
    });
  }
}
</script>
