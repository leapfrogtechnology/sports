<template>
  <div>
    <a-form :form="form" @submit="handleSubmitAction">
      <a-form-item v-if="errorMessage.length">
        <a-alert type="error" :message="errorMessage" />
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="[
            'id'
          ]" hidden />
      </a-form-item>
      <a-form-item label="Name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
            'name',
            {rules: [{ required: true, message: 'Please input the name of the game!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item label="Short name" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input
          v-decorator="[
            'shortName',
            {rules: [{ required: true, message: 'Please input the short name of the game!' }]}
          ]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">Save</a-button>
        <a-button :style="{ marginLeft: '8px' }" @click="handleCancel">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { mapState } from 'vuex';
import { Vue, Component, Prop } from 'vue-property-decorator';

import { createGame } from '@/services/games';
import GameInterface from '@/domains/models/Game';

@Component({
  computed: mapState('games', ['editData'])
})
export default class AddEditGameFormModal extends Vue {
  public editData!: GameInterface;
  private form: any;
  private errorMessage: string = '';

  private created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        let id = 0;
        let name = '';
        let shortName = '';

        if (this.editData) {
          id = this.editData.id;
          name = this.editData.name;
          shortName = this.editData.shortName;
        }

        return {
          id: this.$form.createFormField({
            value: id
          }),
          name: this.$form.createFormField({
            value: name
          }),
          shortName: this.$form.createFormField({
            value: shortName
          })
        };
      }
    });
  }

  private handleSubmitAction(e: any) {
    e.preventDefault();

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.submitForm(values);
      }
    });
  }

  private handleCancel() {
    this.closeForm();
  }

  private hasErrors(fieldsError: any): boolean {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  private submitForm(payload: GameInterface) {
    let dispatchAction = 'games/create';
    let successMessage = 'New game added successfully';

    // Check if it's an edit or add action
    if (this.editData && this.editData.id) {
      // Edit action
      dispatchAction = 'games/edit';
      successMessage = 'Game updated successfully';
    }

    this.$store
      .dispatch(dispatchAction, payload)
      .then(() => {
        this.$message.success(successMessage, 10);
        this.$store.dispatch(`games/fetchList`);
        this.closeForm();
      })
      .catch(err => {
        this.errorMessage = err.toString();
      });
  }

  private closeForm() {
    this.$store.dispatch('modal/hideModal');
  }
}
</script>
