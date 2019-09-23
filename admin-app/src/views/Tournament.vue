<template>
  <div>
    <a-alert v-if="errorMessage.length" :message="errorMessage" type="error" showIcon />
    <p v-else-if="loadingSelectedData">Loading...</p>
    <div v-else>
      <h2 class="custom-page-title">{{selectedData.game.name}} : {{selectedData.name}}</h2>
      <div>
        <a-card title="Basic Details">
          <a slot="extra" @click="handleEditBasiDetails">Edit</a>
          <p>Game: {{selectedData.game.name}}</p>
          <p>Name: {{selectedData.name}}</p>
          <p>Season: {{selectedData.season}}</p>
          <p>Start Date: {{selectedData.startDate}}</p>
          <p>Finish Date: {{`${selectedData.finishDate || 'NA'}`}}</p>
          <p>Registration Form URL: {{`${selectedData.registrationFormUrl || 'NA'}`}}</p>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex';
import { Vue, Component, Prop } from 'vue-property-decorator';

import { IDInterface } from '@/domains/General';
import ItemsList from '@/components/common/ItemsList.vue';
import TournamentInterface from '@/domains/models/Tournament';
import CustomButton from '@/components/common/CustomButton.vue';
import { TOURNAMENTS_ADD_EDIT_FORM_MODAL } from '@/constants/modals';

@Component({
  components: { CustomButton, ItemsList },
  computed: {
    ...mapState('tournaments', ['selectedData', 'loadingSelectedData', 'errorMessage'])
  }
})
export default class Tournaments extends Vue {
  private selectedData!: TournamentInterface;

  private mounted() {
    this.$store.dispatch(`tournaments/fetchOne`, {
      id: this.$route.params.id
    });
  }

  private handleEditBasiDetails(e: any) {
    e.preventDefault();

    this.$store.dispatch(`modal/showModal`, {
      title: 'Update tournament basic details',
      component: TOURNAMENTS_ADD_EDIT_FORM_MODAL
    });
  }
}
</script>
