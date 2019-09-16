<template>
  <div>
    <a-form :form="form" @submit="handleSubmitAction">
      <a-form-item v-if="errorMessage.length">
        <a-alert type="error" :message="errorMessage" />
      </a-form-item>
      <a-form-item label="Game" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-select
          v-decorator="[
            'gameId',
            {
              initialValue: initialGameId,
              rules: [{ required: true, message: 'Please select a game' }]
            }
          ]"
        >
          <a-select-option
            v-for="(game, gameIndex) in gamesList"
            :key="`tournament-game-${gameIndex}`"
            :value="game.id"
          >{{game.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Name" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: 'Please input the name!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item label="Season" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
            'season',
            {rules: [{ required: true, message: 'Please input the season!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item label="Start Date" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-date-picker
          style="width: 100%"
          v-decorator="[
            'startDate',
            {
              initialValue: initialStartDate,
              rules: [{ required: true, message: 'Please input the start date!' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Finish Date" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-date-picker
          style="width: 100%"
          v-decorator="[
            'finishDate',
            {
              initialValue: initialFinishDate
            }
          ]"
        />
      </a-form-item>
      <a-form-item label="Regirstration Form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="['registrationFormUrl']" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
        <a-button type="primary" html-type="submit">Save</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleCancel">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { mapState } from 'vuex';
import { Vue, Component, Prop } from 'vue-property-decorator';

import TournamentInterface, { TournamentPayloadInterface } from '@/domains/models/Tournament';

@Component({
  computed: mapState('tournaments', ['selectedData', 'initialData'])
})
export default class AddEditTournamentFormModal extends Vue {
  public initialData!: TournamentInterface;
  public selectedData!: TournamentInterface;
  private form: any;
  private errorMessage: string = '';

  private created() {
    this.$store.dispatch(`games/fetchList`);

    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        const { id, name, season, startDate, finishDate, registrationFormUrl, game } =
          this.selectedData || this.initialData;

        return {
          id: this.$form.createFormField({
            value: id
          }),
          game: this.$form.createFormField({
            value: this.initialGameId
          }),
          name: this.$form.createFormField({
            value: name
          }),
          season: this.$form.createFormField({
            value: season
          }),
          startDate: this.$form.createFormField({
            value: this.initialStartDate
          }),
          finishDate: this.$form.createFormField({
            value: this.initialFinishDate
          }),
          registrationFormUrl: this.$form.createFormField({
            value: registrationFormUrl
          })
        };
      }
    });
  }

  private handleSubmitAction(e: any) {
    e.preventDefault();

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        const payload: TournamentPayloadInterface = {
          gameId: values.gameId,
          name: values.name,
          season: values.season,
          startDate: values.startDate.format('YYYY-MM-DD'),
          finishDate: (values.finishDate && values.finishDate.format('YYYY-MM-DD')) || '',
          registrationFormUrl: values.registrationFormUrl || ''
        };

        this.submitForm(payload);
      }
    });
  }

  private handleCancel() {
    this.closeForm();
  }

  private hasErrors(fieldsError: any): boolean {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  private submitForm(payload: TournamentPayloadInterface) {
    let dispatchAction = 'tournaments/create';
    let successMessage = 'New tournament added successfully';

    const isEditAction = !!(this.selectedData && this.selectedData.id);

    // Check if it's an edit or add action
    if (isEditAction) {
      // Edit action
      dispatchAction = 'tournaments/edit';
      successMessage = 'Tournament updated successfully';

      // Append ID to the payload
      Object.assign(payload, { id: this.selectedData.id });
    }

    this.$store
      .dispatch(dispatchAction, payload)
      .then(() => {
        this.$message.success(successMessage, 10);

        if (isEditAction) {
          this.$store.dispatch(`tournaments/fetchOne`, { id: this.selectedData.id });
        } else {
          this.$store.dispatch(`tournaments/fetchList`);
        }

        this.closeForm();
      })
      .catch(err => {
        this.errorMessage = err.toString();
      });
  }

  private closeForm() {
    this.$store.dispatch('modal/hideModal');
  }

  private getFormattedDate(value: string) {
    return moment(value, 'YYYY-MM-dd');
  }

  get gamesList() {
    return this.$store.getters[`games/games`] || [];
  }

  get initialStartDate() {
    if (this.selectedData && this.selectedData.startDate) {
      return this.getFormattedDate(this.selectedData.startDate);
    }

    return moment();
  }

  get initialFinishDate() {
    if (this.selectedData && this.selectedData.finishDate) {
      return this.getFormattedDate(this.selectedData.finishDate);
    }

    return null;
  }

  get initialGameId() {
    if (this.selectedData) {
      return this.selectedData.game.id;
    }

    return null;
  }
}
</script>
