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
            {rules: [{ required: true, message: 'Please input the name of the category!' }]}
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

import CategoryInterface from '@/domains/models/Category';

@Component({
  computed: mapState('categories', ['editData'])
})
export default class AddEditCategoryFormModal extends Vue {
  public editData!: CategoryInterface;
  private form: any;
  private errorMessage: string = '';

  private created() {
    this.form = this.$form.createForm(this, {
      mapPropsToFields: () => {
        let id = 0;
        let name = '';

        if (this.editData) {
          id = this.editData.id;
          name = this.editData.name;
        }

        return {
          id: this.$form.createFormField({
            value: id
          }),
          name: this.$form.createFormField({
            value: name
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

  private submitForm(payload: CategoryInterface) {
    let dispatchAction = 'categories/create';
    let successMessage = 'New category added successfully';

    // Check if it's an edit or add action
    if (this.editData && this.editData.id) {
      // Edit action
      dispatchAction = 'categories/edit';
      successMessage = 'Category updated successfully';
    }

    this.$store
      .dispatch(dispatchAction, payload)
      .then(() => {
        this.$message.success(successMessage, 10);
        this.$store.dispatch(`categories/fetchList`);
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
