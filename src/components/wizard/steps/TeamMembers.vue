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
          class="btn col-md-4"
          @click="addTeamMember"
          style="color: #ffffff; background-color: #236db5"
        >
          Add Another Member
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
              :style="`background-image: ${
                teamMembers[index].profilePicture
                  ? `url(${teamMembers[index].profilePicture})`
                  : 'url(media/avatars/blank.png)'
              }`"
            >
              <!--begin::Preview existing avatar-->
              <div
                ref="profilePictureRef"
                class="image-input-wrapper w-125px h-125px"
                :style="`background-image: ${
                  teamMembers[index].profilePicture
                    ? `url(${teamMembers[index].profilePicture})`
                    : 'url(media/avatars/blank.png)'
                }`"
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
          @blur="createDraft"
          v-model="teamMembers[index].name"
          @input="fieldChanged($event)"
          :name="`team-member-name-${index}`"
          class="form-control form-control-lg form-control-solid"
        />
        <ErrorMessage
          v-show="touched"
          :name="`team-member-name-${index}`"
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
          @blur="createDraft"
          v-model="teamMembers[index].jobTitle"
          @input="fieldChanged($event)"
          :name="`team-member-jobTitle-${index}`"
          class="form-control form-control-lg form-control-solid"
        />
        <!--end::Input-->
        <ErrorMessage
          v-show="touched"
          :name="`team-member-jobTitle-${index}`"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>

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
          @blur="createDraft"
          v-model="teamMembers[index].linkedInProfileUrl"
          @input="fieldChanged($event)"
          type="text"
          :name="`team-member-linkedInProfileUrl-${index}`"
          class="form-control form-control-lg form-control-solid"
          rows="3"
        />
        <ErrorMessage
          v-show="touched"
          :name="`team-member-linkedInProfileUrl-${index}`"
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
          @blur="createDraft"
          v-model="teamMembers[index].introduction"
          @input="fieldChanged($event)"
          type="text"
          :name="`team-member-introduction-${index}`"
          class="form-control form-control-lg form-control-solid"
          rows="3"
        />
        <ErrorMessage
          v-show="touched"
          :name="`team-member-introduction-${index}`"
          class="fv-plugins-message-container invalid-feedback"
        ></ErrorMessage>
        <!--end::Input-->
      </div>
      <div class="row float-end">
        <i
          style="cursor: pointer"
          class="fas fa-trash"
          @click="removeTeamMember(index)"
        ></i>
      </div>
    </div>
    <p v-if="isAnyTeamMemberAdded" style="color: red">
      Kindly add a Team Member to continue
    </p>
    <!--begin::Input group-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from "vue";
import { Field, ErrorMessage } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";

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
    touchedParent: {
      type: Boolean,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const touched = ref<boolean>(false);
    const isAnyTeamMemberAdded = ref<boolean>(false);
    watch(
      () => props.touchedParent,
      (value) => {
        touched.value = value;
        if (value && !teamMembers.value?.length)
          isAnyTeamMemberAdded.value = true;
      }
    );
    const businessDraft = computed(() => store.getters.businessDraftGetter);
    let tempBusinessDraft = { ...businessDraft.value };
    watch(businessDraft, (value) => {
      tempBusinessDraft = { ...value };
      teamMembers.value = [...(businessDraft.value?.teamMembers ?? [])];
      emit("teamMembersLength", teamMembers.value.length);
    });
    const teamMembers = ref<Array<TeamMember>>([]);
    const formData = ref<FormData>(props.formDataTemp);
    const addTeamMember = () => {
      teamMembers.value.unshift({
        name: "",
        profilePicture: "",
        linkedInProfileUrl: "",
        jobTitle: "",
        introduction: "",
      });
      touched.value = false;
      isAnyTeamMemberAdded.value = false
      emit("resetTouch", false);
      emit("teamMembersLength", teamMembers.value.length);
      tempBusinessDraft["teamMembers"] = teamMembers.value;
      createDraft();
    };
    const removeTeamMember = (index) => {
      teamMembers.value.splice(index, 1);
      tempBusinessDraft["teamMembers"] = teamMembers.value;
      touched.value = false;
      emit("resetTouch", false);
      createDraft();
    };
    const fileAdded = async (index, event) => {
      try {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        const response = await store.dispatch(Actions.UPLOAD_FILE, formData);
        if (!response.includes("https://")) throw new Error();
        teamMembers.value[index].profilePicture = response;
        tempBusinessDraft["teamMembers"] = teamMembers.value;
        createDraft();
      } catch (err) {
        //}
      }
    };
    const fieldChanged = async () => {
      tempBusinessDraft["teamMembers"] = teamMembers.value;
      if (formData.value.get("teamMembers")) {
        formData.value.set("teamMembers", JSON.stringify(teamMembers.value));
      } else
        formData.value.append("teamMembers", JSON.stringify(teamMembers.value));
      emit("form-data", formData.value);
    };
    const createDraft = async () => {
      try {
        const res = await store.dispatch(Actions.CREATE_BUSINESS_DRAFT, {
          business: JSON.stringify(tempBusinessDraft),
        });
        if (res !== true) throw new Error("error in API");
        store.dispatch(Actions.GET_BUSINESS_DRAFT);
      } catch (err) {
        console.log({ err });
      }
    };
    return {
      isAnyTeamMemberAdded,
      createDraft,
      fileAdded,
      teamMembers,
      formData,
      fieldChanged,
      addTeamMember,
      removeTeamMember,
      touched,
    };
  },
});
</script>
