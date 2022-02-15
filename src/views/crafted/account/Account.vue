<template>
  <!--begin::Navbar-->
  <div class="card mb-5 mb-xl-10">
    <div class="card-body pt-9 pb-0">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap mb-3">
        <!--begin: Pic-->
        <div class="me-7 mb-4">
          <!-- <div
            class="
              symbol symbol-100px symbol-lg-160px symbol-fixed
              position-relative
            "
          >
            <img :src="op.get(user, 'profileImage', null) ?? require('@/assets/img/150-2.jpg') " alt="image" />
          </div> -->
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
                :style="`background-image: ${
                  newImageAdded
                    ? `url(${tempImage})`
                    : `url(${
                        user.profileImage ?? require('@/assets/img/blank.png')
                      })`
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
                  @change="handleImageUpload($event)"
                  type="file"
                  name="avatar"
                  accept=".png, .jpg, .jpeg"
                />
                <input type="hidden" name="avatar_remove" />
                <!--end::Inputs-->
              </label>
              <!--end::Label-->

              <!--begin::Remove-->
              <!-- <span
                  class="
                    btn btn-icon btn-circle btn-active-color-primary
                    w-25px
                    h-25px
                    bg-white
                    shadow
                  "
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span> -->
              <!--end::Remove-->
            </div>
            <!--end::Image input-->

            <!--begin::Hint-->
            <div class="form-text">Allowed file types: png, jpg, jpeg.</div>
            <!--end::Hint-->
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1">
          <!--begin::Title-->
          <div
            class="
              d-flex
              justify-content-between
              align-items-start
              flex-wrap
              mb-2
            "
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                  >{{
                    `${op.get(user, "firstName", "")} ${op.get(
                      user,
                      "lastName",
                      ""
                    )}`
                  }}</a
                >
                <a href="#">
                  <span class="svg-icon svg-icon-1 svg-icon-primary">
                    <inline-svg src="media/icons/duotune/general/gen026.svg" />
                  </span>
                </a>
              </div>
              <!--end::Name-->

              <!--begin::Info-->
              <div class="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                <a
                  href="#"
                  class="
                    d-flex
                    align-items-center
                    text-gray-400 text-hover-primary
                    me-5
                    mb-2
                  "
                >
                  <span class="svg-icon svg-icon-4 me-1">
                    <inline-svg
                      src="media/icons/duotune/communication/com006.svg"
                    />
                  </span>
                  {{ op.get(user, "jobTitle", "") }}
                </a>
              </div>
              <!--end::Info-->
            </div>
          </div>
          <!--end::Title-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
      <div class="d-flex overflow-auto h-55px">
        <ul
          class="
            nav nav-stretch nav-line-tabs nav-line-tabs-2x
            border-transparent
            fs-5
            fw-bolder
            flex-nowrap
          "
        >
          <!-- begin::Nav item
          <li class="nav-item">
            <router-link
              to="/crafted/account/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Overview
            </router-link>
          </li> -->
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/crafted/account/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
              Settings
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
      <!--begin::Navs-->
    </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from "vue";
import { useStore } from "vuex";
import objectPath from "object-path";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "kt-account",
  setup() {
    const store = useStore();
    const user = computed(() => store.getters.getUser);
    const op = computed(() => objectPath);
    const tempImage = ref<string>("");
    const newImageAdded = ref<boolean>(false);
    let file: File;
    const saveChanges1 = async () => {
      try {
        let fd = new FormData();
        if (file) fd.append("profileImage", file, file.name);
        fd.append("firstName", user.value.firstName);
        fd.append("lastName", user.value.lastName);
        fd.append("linkedInProfileUrl", user.value.linkedInProfileUrl);
        fd.append("jobTitle", user.value.jobTitle);
        fd.append("telephone", user.value.telephone);
        fd.append("introduction", user.value.introduction);
        const response = await store.dispatch(Actions.UPDATE_PROFILE, fd);
        if (response !== true) throw new Error();
        store.dispatch(Actions.AUTH_USER);
        store.commit("setAlert", {
          message: "Profile Picture Updated",
          subMessage: "Profile Picture has been updated successfully",
          variant: "primary",
          duration: 4000,
          show: true,
        });
      } catch (err) {
        const error = store.getters.getErrors;
        store.commit("setAlert", {
          message: "Error",
          subMessage: error,
          variant: "danger",
          duration: 4000,
          show: true,
        });
      }
    };
    const handleImageUpload = (event) => {
      file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        tempImage.value = reader.result as string;
        newImageAdded.value = true;
      };
      nextTick(() => {
        saveChanges1();
      });
    };
    return {
      user,
      op,
      handleImageUpload,
    };
  },
});
</script>
