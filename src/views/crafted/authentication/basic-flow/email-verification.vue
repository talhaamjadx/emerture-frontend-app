<template>
  <div class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15 white">
    <!--begin::Logo-->
    <a href="../../demo1/dist/index.html" class="mb-10 pt-lg-10">
      <!-- <img alt="Logo" src="assets/media/logos/logo-1.svg" class="h-40px mb-5" /> -->
    </a>
    <!--end::Logo-->
    <!--begin::Wrapper-->
    <div class="pt-lg-10 mb-10">
      <!--begin::Logo-->
      <h1 class="fw-bolder fs-2qx text-gray-800 mb-7">Verify Your Email</h1>
      <!--end::Logo-->
      <!--begin::Message-->
      <div class="fs-3 fw-bold text-muted mb-10">
        We have sent an email to
        <a href="#" class="link-primary fw-bolder">{{ op.get(user, "email", "") }}</a>
        <br />please enter the verirfication code below to verify your account
      </div>
      <!--end::Message-->
      <!--begin::Action-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        @submit="verify()"
        :validation-schema="emailVerificationSchema"
      >
      <div class="row d-flex justify-content-center">
        <!--begin::Col-->
        <div class="col-lg-6 fv-row">
          <Field
            type="text"
            name="verificationCode"
            class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
            placeholder="Verification Code"
            v-model="verificationCode"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="verificationCode" />
            </div>
          </div>
        </div>
      </div>
      </Form>
      <div class="text-center mb-10">
        <button
          type="submit"
          class="btn btn-lg btn-primary fw-bolder"
          >Submit</button
        >
      </div>
      <!--end::Action-->
      <!--begin::Action-->
      <div class="fs-5">
        <span class="fw-bold text-gray-700">Did’t receive an email?</span>
        <a
          href="../../demo1/dist/authentication/sign-up/basic.html"
          class="link-primary fw-bolder"
          >Resend</a
        >
      </div>
      <!--end::Action-->
    </div>
    <!--end::Wrapper-->
    <!--begin::Illustration-->
    <div
      class="
        d-flex
        flex-row-auto
        bgi-no-repeat
        bgi-position-x-center
        bgi-size-contain
        bgi-position-y-bottom
        min-h-100px min-h-lg-350px
      "
      style="background-image: url(assets/media/illustrations/sketchy-1/17.png"
    ></div>
    <!--end::Illustration-->
  </div>
  <!-- 
<div>
   <img :src="require('../assets/images/Vencasa-Leaf-Top-Border-4K.webp')" />
   <div class="row justify-content-center">
     <div class="col-md-4 text-center">
      <img class="mb-2" style="width:55%" :src="require('../assets/images/payment.png')" />
      <h3 style="font-size:30px">Nearly there</h3>
      <p style="font-size: 23px;">We have just emailed you a confirmation code. Please enter that code below to create your account</p>
        <div class="form-group" style="text-align: -webkit-center;">
              <input @keypress="check($event)"
                
                class="form-control input-button-w"
                type="text"
                v-model="input1"
              />
               <h3 class="mt-3" v-if="!timedOut">Time Remaining: {{ timeLeft }}</h3>
              <p v-else>
            Verification time has expired please resend verification code
          </p>
            </div>
       

 <button style="background: #548f4d;"
            @click="verify()"
            :disabled="disabled"
            type="submit"
            class="btn solent-email-button"
          >
            <span>Verify Account</span>
          </button>
         <div class="mt-2 mb-5">
            <a
              style="cursor: pointer; font-weight: 600; color: #3e4452"
              @click="resendCode()"
              class="  pl-1"
            >
              Resend the Code?</a
            >
           </div>
     </div>
    </div>
  </div> -->
</template>

<script lang="ts">
// import moment from "moment";
import { ErrorMessage, Field, Form } from "vee-validate";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex"
import objectPath from "object-path";
// import KTLoader from "@/components/Loader.vue";
import * as Yup from "yup";

export default defineComponent({
  components:{
    ErrorMessage,
    Field,
    Form
  },
  setup(){
    const store = useStore()
    const verificationCode = ref<string>("")
    const emailVerificationSchema = Yup.object().shape({
      verificationCode: Yup.string().required().label("Verification Code"),
    });
    const op = computed(() => {
      return objectPath
    }) 
    const user = computed(() => {
      return store.getters.getUser
    })
    const verify = () => {
      console.log("ok")
    }
    return{
      verificationCode,
      emailVerificationSchema,
      verify,
      user,
      op,
    }
  }
})

// export default {
  //   data() {
  //     return {
  //       input1: "",
  //       disabled: false,
  //       verificationSendTime: "",
  //       verficationCodeLimit: "",
  //       timeExists: false,
  //       interval: null,
  //       timeLeft: "",
  //       timedOut: false,
  //     };
  //   },
  //   validations:{
  //     input1:{
  //       required,
  //     }
  //   },
  //   computed:{
  //     ...mapGetters({
  //       auth: 'auth'
  //     })
  //   },
  //   methods: {
  //     verificationCodeTime(time) {
  //       let time1 = null;
  //       let time2 = null;
  //       if (this.timeExists) {
  //         time1 = this.verficationCodeLimit.split(":")[0] ?? this.verficationCodeLimit;
  //         time2 = this.verficationCodeLimit.split(":")[1] ?? '00';
  //       }
  //       let sendTime = this.verificationSendTime;
  //       let hours = sendTime.split(":")[0];
  //       let minutes = sendTime.split(":")[1];
  //       let seconds = sendTime.split(":")[2];
  //       let now = moment().set({
  //         hour: hours,
  //         minutes: minutes,
  //         seconds: seconds,
  //       });
  //       let then = null;
  //       if (this.timeExists) {
  //         then = moment()
  //           .set({ hour: hours, minutes: minutes, seconds: seconds })
  //           .add(time1, "minutes").add( time2, "seconds")
  //           // .add(time2, "seconds");
  //       } else {
  //         then = moment()
  //           .set({ hour: hours, minutes: minutes, seconds: seconds })
  //           .add(this.verficationCodeLimit, "minutes");
  //       }
  //       if(this.timeExists) {
  //         clearInterval(this.interval);
  //       }
  //       this.interval = setInterval(() => {
  //         now = now.add("1", "second");
  //         let duration = moment.duration(then.diff(now))
  //         this.timeLeft = duration.minutes() + ":" + (parseInt(duration.seconds()) < 10 ? `0${duration.seconds()}` : duration.seconds());
  //         localStorage.setItem(`verification_code_limit`, this.timeLeft);
  //         if (duration.minutes() == 0 && duration.seconds() == 0) {
  //           clearInterval(this.interval);
  //           this.timedOut = true;
  //         }
  //       }, 1000);
  //       // }
  //     },
  //     async resendCode() {
  //       this.$store.commit('setShowLoader', true)
  //       await this.$store.dispatch("resendVerifyCode").then(res => {
  //         this.$store.commit('setShowLoader', false)
  //         if(res.status == 200){
  //         clearInterval(this.interval)
  //         localStorage.setItem('verification_code_time', res.data.sendTime)
  //         localStorage.setItem('verification_code_limit', res.data.timeLimit)
  //         this.verificationSendTime = localStorage.getItem("verification_code_time") ?? '10:20:00'
  //         this.verficationCodeLimit = localStorage.getItem("verification_code_limit");
  //         this.timeExists = false
  //         this.timedOut = false
  //         this.verificationCodeTime(this.verificationSendTime);
  //         }
  //         else{
  //           alert("error in resending code")
  //         }
  //       });
  //     },
  //     async verify() {
  //       this.$v.$touch()
  //       if(!this.$v.$invalid){
  //       this.$store.commit('setShowLoader', true)
  //       const data = {
  //         code: this.input1
  //       };
  //       await this.$store.dispatch("verifyCode", data).then(res => {
  //         if(res == true){
  //           this.$store.dispatch('getUser').then(res => {
  //             if(res == true){
  //             this.$store.commit('setShowLoader', false)
  //               this.$router.push('/welcome')
  //             }
  //             else{
  //               this.$store.commit('setShowLoader', false)
  //               alert("error in fetching user")
  //             }
  //           })
  //         }
  //         else if(res.data.status == 400){
  //           this.$store.commit('setShowLoader', false)
  //           alert(res.data.message)
  //         }
  //       })
  //       }
  //     },
  //     check(event) {
  //         if (!(event.keyCode >= 48 && event.keyCode <= 57) || this.input1.length > 7) {
  //           event.preventDefault();
  //         }
  //     },
  //   },
  //   async created() {
  //     if(_.isEmpty(this.authUser)){
  //       await this.$store.dispatch('getUser')
  //     }
  //     if (localStorage.getItem("verification_code_time") !== null) {
  //       this.timeExists = true;
  //     }
  //     this.verificationSendTime = localStorage.getItem("verification_code_time") ?? '10:20:00'
  //     this.verficationCodeLimit = localStorage.getItem("verification_code_limit");
  //     this.verificationCodeTime(this.verificationSendTime);
  //   },
// };
</script>

<style scoped>
.white{
  background-color: white;
}
</style>