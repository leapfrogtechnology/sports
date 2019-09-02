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

import GameInterface from '../domains/models/Game';
import ItemsList from '@/components/common/ItemsList.vue';
import AddButton from '@/components/common/AddButton.vue';
import { GAMES_ADD_EDIT_FORM_MODAL } from '@/enums/modals';
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

  private handleEdit(data: GameInterface) {
    this.$store.dispatch('games/setEditData', data);

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new game',
      component: GAMES_ADD_EDIT_FORM_MODAL
    });
  }

  private handleDelete(data: GameInterface) {
    const store = this.$store;
    const message = this.$message;

    this.$confirm({
      title: 'Do you want to delete this game?',
      onOk() {
        store.dispatch('games/delete', data).then(() => {
          store.dispatch(`games/fetchList`);
          message.success('Game deleted successfully.', 10);
        }).catch(err => {
          message.error('Unable to delete the game.', 10);
        });
      }
    });
  }

  private handleAddGame(e: any) {
    e.preventDefault();

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new game',
      component: GAMES_ADD_EDIT_FORM_MODAL
    });
  }
}
</script>
