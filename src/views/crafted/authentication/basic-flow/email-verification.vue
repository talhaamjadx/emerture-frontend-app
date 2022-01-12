<template>
  <div
    class="d-flex flex-column flex-column-fluid text-center p-10 py-lg-15 white"
  >
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
        <a href="#" class="link-primary fw-bolder">{{
          op.get(user, "email", "")
        }}</a>
        <br />please enter the verirfication code below to verify your account
      </div>
      <!--end::Message-->
      <!--begin::Action-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        @submit="verify"
        :validation-schema="emailVerificationSchema"
      >
        <div class="row d-flex justify-content-center">
          <!--begin::Col-->
          <h3 class="mt-3" v-if="!timedOut">Time Remaining: {{ timeLeft }}</h3>
          <div class="col-lg-6 fv-row">
            <Field
              type="text"
              name="verificationCode"
              class="
                form-control form-control-lg form-control-solid
                mb-3 mb-lg-0
              "
              placeholder="Verification Code"
              autocomplete="false"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="verificationCode" />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mb-10">
          <button type="submit" class="btn btn-lg btn-primary fw-bolder">
            Submit
          </button>
        </div>
      </Form>
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
</template>

<script lang="ts">
import moment, { Duration, Moment } from "moment";
import { ErrorMessage, Field, Form } from "vee-validate";
import { defineComponent, ref, computed, onMounted, nextTick } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import objectPath from "object-path";
import { Actions } from "../../../../store/enums/StoreEnums";
import * as Yup from "yup";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const verificationCode = ref<string>("");
    const emailVerificationSchema = Yup.object().shape({
      verificationCode: Yup.string().required().label("Verification Code"),
    });
    const timeExists = ref<boolean>(false);
    const verificationSendTime = ref<string | null>("");
    const verficationCodeLimit = ref<string | null>("");
    const interval = ref<number>(0);
    const timeLeft = ref<string>("");
    const timedOut = ref<boolean>(false);
    const op = computed(() => {
      return objectPath;
    });
    const user = computed(() => {
      return store.getters.getUser;
    });
    const verify = async (values) => {
      try {
        const response = await store.dispatch(Actions.VERIFY_AUTH, {
          code: values.verificationCode,
        });
        if (response[0] !== true) throw new Error();
        Swal.fire({
          text: "Verification Successful!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(async () => {
          await store.dispatch(Actions.AUTH_USER);
          nextTick(() => {
            router.push("/");
          });
        });
      } catch (err) {
        const [error] = Object.keys(store.getters.getErrors);
        Swal.fire({
          text: store.getters.getErrors[error],
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }
    };
    const verificationCodeTime = () => {
      let time1 = "";
      let time2 = "";
      if (timeExists.value) {
        if (typeof verficationCodeLimit.value === "string") {
          time1 =
            verficationCodeLimit.value.split(":")[0] ??
            verficationCodeLimit.value;
          time2 = verficationCodeLimit.value.split(":")[1] ?? "00";
        }
      }
      let sendTime = verificationSendTime.value ?? "";
      let hours: number = parseInt(sendTime.split(":")[0]);
      let minutes: number = parseInt(sendTime?.split(":")[1]);
      let seconds: number = parseInt(sendTime?.split(":")[2]);
      let now = moment().set({
        hour: hours,
        minutes: minutes,
        seconds: seconds,
      });
      let then: Moment;
      if (timeExists.value) {
        then = moment()
          .set({ hour: hours, minutes: minutes, seconds: seconds })
          .add(time1, "minutes")
          .add(time2, "seconds");
      } else {
        then = moment()
          .set({ hour: hours, minutes: minutes, seconds: seconds })
          .add(verficationCodeLimit.value, "minutes");
      }
      if (timeExists.value) {
        clearInterval(interval.value);
      }
      interval.value = setInterval(() => {
        now = now.add("1", "second");
        let duration: Duration = moment.duration(then.diff(now));
        timeLeft.value =
          duration.minutes() +
          ":" +
          (duration.seconds() < 10
            ? `0${duration.seconds()}`
            : duration.seconds());
        localStorage.setItem(`verification_code_limit`, timeLeft.value);
        if (duration.minutes() == 0 && duration.seconds() == 0) {
          clearInterval(interval.value);
          timedOut.value = true;
        }
      }, 1000);
    };
    onMounted(() => {
      if (localStorage.getItem("verification_code_time") !== null) {
        timeExists.value = true;
      }
      verificationSendTime.value =
        localStorage.getItem("verification_code_time") ?? "10:20:00";
      verficationCodeLimit.value = localStorage.getItem(
        "verification_code_limit"
      );
      verificationCodeTime();
    });
    return {
      verificationCode,
      emailVerificationSchema,
      verify,
      user,
      op,
      timedOut,
      timeLeft,
    };
  },
});
</script>

<style scoped>
.white {
  background-color: white;
}
</style>