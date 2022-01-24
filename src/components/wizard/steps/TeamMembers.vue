<template>
  <!--begin::Wrapper-->
  <div class="w-100">
    <!--begin::Heading-->
    <div class="pb-10 pb-lg-12">
      <!--begin::Title-->
      <div class="row">
        <h2 class="fw-bolder text-dark col-md-8">Team Members</h2>
        <a
          href="javascript:void(0)"
          class="btn btn-primary col-md-4"
          @click="addTeamMember"
        >
          Add Member
        </a>
      </div>
    </div>
    <div v-for="(member, index) in teamMembers" :key="`team-member-${index}`">
      <div class="fv-row mb-10 my-5">
        <div class="row mb-6">
          <!--begin::Label-->
          <!--end::Label-->

          <!--begin::Col-->
          <div class="col-lg-8">
            <!--begin::Image input-->
            <div
              class="image-input image-input-outline"
              data-kt-image-input="true"
              style="background-image: url(media/avatars/blank.png)"
            >
              <!--begin::Preview existing avatar-->
              <div
                ref="profilePictureRef"
                class="image-input-wrapper w-125px h-125px"
              ></div>
              <!--end::Preview existing avatar-->

              <!--begin::Label-->
              <label
                class="
                  btn btn-icon btn-circle btn-active-color-primary
                  w-25px
                  h-25px
                  bg-white
                  shadow
                "
                data-kt-image-input-action="change"
                data-bs-toggle="tooltip"
                title="Change avatar"
              >
                <i class="bi bi-pencil-fill fs-7"></i>

                <!--begin::Inputs-->
                <input
                  @input="fileAdded(index, $event)"
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                />
                <input type="hidden" name="avatar_remove" />
                <!--end::Inputs-->
              </label>
              <!--end::Remove-->
            </div>
            <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
            <!--end::Hint-->
          </div>
          <!--end::Col-->
        </div>
        <label class="form-label required">Name</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          v-model="teamMembers[index].name"
          @input="fieldChanged($event)"
          name="name"
          class="form-control form-control-lg form-control-solid"
          value=""
        />
        <ErrorMessage
          name="name"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Job Title</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
          >
          </i>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          v-model="teamMembers[index].jobTitle"
          @input="fieldChanged($event)"
          name="jobTitle"
          class="form-control form-control-lg form-control-solid"
          value=""
        />
        <!--end::Input-->
        <ErrorMessage
          name="jobTitle"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>

        <!--begin::Hint-->
        <div class="form-text">
          Customers will see this shortened version of your statement descriptor
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group-->
      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--end::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">LinkedIn Profile Url</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
          >
          </i>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          v-model="teamMembers[index].linkedInProfileUrl"
          @input="fieldChanged($event)"
          type="text"
          name="linkedInProfileUrl"
          class="form-control form-control-lg form-control-solid"
          rows="3"
        ></Field>
        <ErrorMessage
          name="linkedInProfileUrl"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <!--end::Input group-->
      <div class="fv-row mb-10">
        <!--end::Label-->
        <label class="d-flex align-items-center form-label">
          <span class="required">Single-Line Bio or Introduction</span>

          <i
            class="fas fa-exclamation-circle ms-2 fs-7"
            data-bs-toggle="popover"
            data-bs-trigger="hover"
            data-bs-html="true"
          >
          </i>
        </label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          v-model="teamMembers[index].introduction"
          @input="fieldChanged($event)"
          type="text"
          name="introduction"
          class="form-control form-control-lg form-control-solid"
          rows="3"
        ></Field>
        <ErrorMessage
          name="introduction"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <div class="row float-end">
        <i class="fas fa-trash" @click="removeTeamMember(index)"></i>
      </div>
    </div>
    <!--begin::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Field, ErrorMessage } from "vee-validate";

interface TeamMember {
  name: string;
  profilePicture: string;
  linkedInProfileUrl: string;
  jobTitle: string;
  introduction: string;
}

export default defineComponent({
  name: "PersonalDetails",
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    formDataTemp: {
      type: FormData,
      required: true,
    },
  },
  setup(props, { emit }) {
    const teamMembers = ref<Array<TeamMember>>([]);
    const formData = ref<FormData>(props.formDataTemp);
    const addTeamMember = () => {
      teamMembers.value = [
        ...teamMembers.value,
        {
          name: "",
          profilePicture: "",
          linkedInProfileUrl: "",
          jobTitle: "",
          introduction: "",
        },
      ];
    };
    const removeTeamMember = (index) => {
      teamMembers.value.splice(index, 1);
    };
    const fileAdded = (index, event) => {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = function () {
        teamMembers.value[index].profilePicture = reader.result as string;
      };
    };
    const fieldChanged = () => {
      if (formData.value.get("teamMembers")) {
        formData.value.set("teamMembers", JSON.stringify(teamMembers.value));
      } else
        formData.value.append("teamMembers", JSON.stringify(teamMembers.value));
      emit("form-data", formData.value);
    };
    return {
      fileAdded,
      teamMembers,
      formData,
      fieldChanged,
      addTeamMember,
      removeTeamMember,
    };
  },
});
</script>
