<template>
  <div>
    <h2 class="custom-page-title">TOURNAMENTS</h2>
    <AddButton buttonText="Add new tournament" :handleClick="handleAdd" />
    <a-alert v-if="errorMessage.length" :message="errorMessage" type="error" showIcon />
    <a-list bordered :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="getTournamentDescription(item)">
          <a slot="title" :href="item.href"> {{item.game.name}} : {{item.name}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex';
import { Vue, Component } from 'vue-property-decorator';

import { IDInterface } from '@/domains/General';
import AddButton from '@/components/common/AddButton.vue';
import ItemsList from '@/components/common/ItemsList.vue';
import TournamentInterface from '@/domains/models/Tournament';
import { TOURNAMENTS_ADD_FORM_MODAL } from '../constants/modals';

@Component({
  components: { AddButton, ItemsList },
  computed: {
    ...mapState('tournaments', ['data', 'loading', 'errorMessage'])
  }
})
export default class Tournaments extends Vue {
  private mounted() {
    this.$store.dispatch(`tournaments/fetchList`);
  }

  private handleAdd(e: any) {
    e.preventDefault();

    this.$store.dispatch(`modal/showModal`, {
      title: 'Add a new tournament',
      component: TOURNAMENTS_ADD_FORM_MODAL
    });
  }

  private getTournamentDescription(tournament: TournamentInterface): string {
    let description = '';

    if (tournament.finishDate && tournament.finishDate.length) {
      description = `Finished on ${tournament.finishDate}`;
    } else {
      description = `Starting from ${tournament.startDate}`;
    }

    return description;
  }
}
</script>
