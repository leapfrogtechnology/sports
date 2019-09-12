<template>
  <div>
    <a-form :form="form" @submit="handleSubmitAction">
      <a-form-item v-if="errorMessage.length">
        <a-alert type="error" :message="errorMessage" />
      </a-form-item>
      <a-form-item label="Game" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-select v-decorator="[ 'gameId', {rules: [ { required: true, message: 'Please select a game' } ]} ]">
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
            { rules: [{ required: true, message: 'Please input the start date!' }] }
          ]"
        />
      </a-form-item>
      <a-form-item label="Finish Date" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-date-picker style="width: 100%" v-decorator="[ 'finishDate' ]" />
      </a-form-item>
      <a-form-item label="Regirstration Form" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="['registrationFormUrl']"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 8 }">
        <a-button type="primary" html-type="submit">Save</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleCancel">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Vue, Component, Prop } from 'vue-property-decorator';

import TournamentInterface, { TournamentPayloadInterface } from '@/domains/models/Tournament';

@Component({
  computed: mapState('tournaments', ['editData'])
})
export default class AddTournamentFormModal extends Vue {
  public editData!: TournamentPayloadInterface;
  private form: any;
  private errorMessage: string = '';

  private created() {
    this.$store.dispatch(`games/fetchList`);

    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        const { id, name, season, startDate, finishDate, registrationFormUrl, gameId } = this.editData;

        return {
          id: this.$form.createFormField({
            value: id
          }),
          game: this.$form.createFormField({
            value: gameId
          }),
          name: this.$form.createFormField({
            value: name
          }),
          season: this.$form.createFormField({
            value: season
          }),
          startDate: this.$form.createFormField({
            value: startDate
          }),
          finishDate: this.$form.createFormField({
            value: finishDate
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
    this.$store
      .dispatch('tournaments/create', payload)
      .then(() => {
        this.$message.success('New tournament added successfully', 10);
        this.$store.dispatch(`tournaments/fetchList`);
        this.closeForm();
      })
      .catch(err => {
        this.errorMessage = err.toString();
      });
  }

  private closeForm() {
    this.$store.dispatch('modal/hideModal');
  }

  get gamesList() {
    return this.$store.getters[`games/games`] || [];
  }
}
</script>
