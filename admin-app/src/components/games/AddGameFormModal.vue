<template>
  <div>
    <a-modal :visible="visible" title="Add new game" :footer="null" @cancel="handleCancel">
      <a-form :form="form" @submit="handleSubmitAction">
        <a-form-item v-if="errorMessage.length">
          <a-alert type="error" :message="errorMessage" />
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
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class AddGameFormModal extends Vue {
  @Prop() private visible!: boolean;
  @Prop() private submitForm!: any;
  @Prop() private handleCancel!: any;
  @Prop() private errorMessage!: string;

  private form: any;

  private beforeCreate() {
    this.form = this.$form.createForm(this);
  }

  private handleSubmitAction(e: any) {
    e.preventDefault();

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        this.submitForm(values);
      }
    });
  }

  private hasErrors(fieldsError: any): boolean {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
}
</script>
