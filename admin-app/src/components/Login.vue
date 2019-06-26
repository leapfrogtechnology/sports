<template>
<div class="header">
  <div class="header-image">
    <img src="../assets/images/logo-inverted.svg" width="300px">
  </div>
    <a-form @submit.prevent="handleSubmit">
      <a-form-item
        :validate-status = 'validatestatus' 
        :help = help
        class="input-box"
      >
        <a-input
          v-decorator="[{rules: [{required: true, message: 'Please enter your name'}]}]"
          placeholder= 'Username'
          size="large"
          v-model=userName
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color:rgba(0,0,0,.25)"
           />
        </a-input>
      </a-form-item>

      <a-form-item
        class="input-box"
      >
        <a-input
          v-decorator="[{rules: [{required: true, message: 'Please enter your name'}]}]"
          placeholder= 'Password'
          size="large"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color:rgba(0,0,0,.25)"
           />
        </a-input>
      </a-form-item>

      <a-form-item class="checkbox" >
        <a-checkbox class="checkbox-item">Remember Me</a-checkbox>
      </a-form-item>

      <a-form-item class="button">
        <a-button
          type="primary"
          html-type="submit"
        >
        Log in  
      </a-button>
    </a-form-item>

    </a-form>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Antd from 'ant-design-vue';  
Vue.use(Antd);

@Component
export default class Header extends Vue {
  userName: any = null
  checkUserNameStatus: boolean = true
  validatestatus: string = " "
  help: string = " "

  handleSubmit() {
    (!isNaN(this.userName)) ? ( this.validatestatus = "error", this.help = "Cannot use number or special characters in username"): 
    (this.validatestatus = " ",   this.help =  ' ')
  }
}
</script>


<style scoped>

  * {
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
  }

 .header-image {
   text-align: center;
   margin-top: 89px;
   margin-bottom: 90px;
 }

 .ant-input-affix-wrapper  {
   width: 370px;
 }

.input-box{
  text-align: center;
  margin-bottom: 25px; 
}

 .checkbox-item {
   color: white;
 }

 .checkbox {
   text-align: center;
   margin-bottom: 5px;
 }

 .ant-btn-primary {
  width: 370px;
 }

 .button {
  text-align: center;
 }


</style>
