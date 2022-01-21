<template>
  <div class="d-flex flex-column">
    <!--begin::Heading-->
    <div class="mb-13 text-center">
      <h1 class="fs-2hx fw-bolder mb-5">Select Your Profile Type</h1>
      <div class="text-gray-400 fw-bold fs-5">
        Access a curated ecosystem of Investors, industry experts and investee
        businesses.
      </div>
    </div>
    <!--end::Heading-->
    <!--begin::Nav group-->
    <!--end::Nav group-->
    <!--begin::Row-->

    <div class="row g-10">
      <div v-for="role in roles" :key="role.id" class="col-xl-4">
        <div class="card card-stretch card-bordered mb-5">
          <div class="card-header">
            <h3 class="card-title">
              <div class="mb-7 mt-7 text-center">
                <!--begin::Title-->
                <h1 class="text-dark mb-5 fw-boldest">{{ role.name }}</h1>
                <!--end::Title-->
                <!--begin::Description-->
                <div style="font-size:13px;" class="text-gray-400 fw-bold ">
                  {{ role.description }}
                </div>
                <!--end::Description-->
                <!--begin::Price-->
                <!--end::Price-->
              </div>
            </h3>
          </div>
          <div class="card-body">
            <div
              v-for="feature in op.get(role, 'roleFeatures', [])"
              :key="feature.id"
              class="w-100 mb-10"
            >
              <!--begin::Item-->
              <div class="d-flex align-items-center mb-5">
                <span class="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">{{
                  feature.name
                }}</span>
                <!--begin::Svg Icon | path: icons/duotune/general/gen043.svg-->
                <span class="svg-icon svg-icon-1 svg-icon-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.3"
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="10"
                      fill="black"
                    />
                    <path
                      d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                      fill="black"
                    />
                  </svg>
                </span>
                <!--end::Svg Icon-->
              </div>
            </div>
          </div>
          <div class="card-footer text-center">
            <button
              :disabled="
                isRoleAttached(role.id) == 0 ||
                isRoleAttached(role.id) == 1 ||
                isRoleAttached(role.id) == 2
                  ? true
                  : false
              "
              :class="[
                'btn',
                'btn-sm',
                isRoleAttached(role.id) == 0
                  ? 'btn-secondary'
                  : isRoleAttached(role.id) == 1
                  ? 'btn-primary'
                  : isRoleAttached(role.id) == 2
                  ? 'btn-danger'
                  : 'btn-primary',
              ]"
              @click="attachRole(role.id)"
            >
              {{
                isRoleAttached(role.id) == 0
                  ? "Awaiting Approval"
                  : isRoleAttached(role.id) == 1
                  ? "Approved"
                  : isRoleAttached(role.id) == 2
                  ? "Rejected"
                  : "Get Started"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="row g-10">
      <div v-for="role in roles" :key="role.id" class="col-xl-4">
        <div class="h-100 align-items-center">
          <div
            style="justify-content: space-between; align-items: center"
            class="
              h-100
              w-100
              d-flex
              flex-column
              rounded-3
              bg-light bg-opacity-75
              py-5
              px-10
            "
          >
            <div class="mb-7 text-center">
              <h1 class="text-dark mb-5 fw-boldest">{{ role.name }}</h1>

              <div class="text-gray-400 fw-bold mb-5">
                {{ role.description }}
              </div>
            </div>

            <div
              v-for="feature in op.get(role, 'roleFeatures', [])"
              :key="feature.id"
              class="w-100 mb-10"
            >
            
              <div class="d-flex align-items-center mb-5">
                <span class="fw-bold fs-6 text-gray-800 flex-grow-1 pe-3">{{
                  feature.name
                }}</span>

                <span class="svg-icon svg-icon-1 svg-icon-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <rect
                      opacity="0.3"
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="10"
                      fill="black"
                    />
                    <path
                      d="M10.4343 12.4343L8.75 10.75C8.33579 10.3358 7.66421 10.3358 7.25 10.75C6.83579 11.1642 6.83579 11.8358 7.25 12.25L10.2929 15.2929C10.6834 15.6834 11.3166 15.6834 11.7071 15.2929L17.25 9.75C17.6642 9.33579 17.6642 8.66421 17.25 8.25C16.8358 7.83579 16.1642 7.83579 15.75 8.25L11.5657 12.4343C11.2533 12.7467 10.7467 12.7467 10.4343 12.4343Z"
                      fill="black"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              :disabled="
                isRoleAttached(role.id) == 0 ||
                isRoleAttached(role.id) == 1 ||
                isRoleAttached(role.id) == 2
                  ? true
                  : false
              "
              :class="[
                'btn',
                'btn-sm',
                isRoleAttached(role.id) == 0
                  ? 'btn-secondary'
                  : isRoleAttached(role.id) == 1
                  ? 'btn-primary'
                  : isRoleAttached(role.id) == 2
                  ? 'btn-danger'
                  : 'btn-primary',
              ]"
              @click="attachRole(role.id)"
            >
              {{
                isRoleAttached(role.id) == 0
                  ? "Awaiting Approval"
                  : isRoleAttached(role.id) == 1
                  ? "Approved"
                  : isRoleAttached(role.id) == 2
                  ? "Rejected"
                  : "Get Started"
              }}
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import objectPath from "object-path";
import Swal from "sweetalert2";

interface RoleRequest {
  status: number;
}

export default defineComponent({
  setup() {
    const store = useStore();
    const roles = computed(() => {
      return store.getters.getRolesData;
    });
    const op = computed(() => objectPath);
    const user = computed(() => store.getters.getUser);

    const isRoleAttached = (id) => {
      const roleRequest: RoleRequest = objectPath
        .get(user.value, "userRoleRequests", [])
        .find((roleRequest) => {
          return objectPath.get(roleRequest, "role.id") == id;
        })!;
      return roleRequest?.status;
    };
    const attachRole = async (id) => {
      try {
        const response = await store.dispatch(Actions.ATTACH_ROLE, {
          id: id,
        });
        if (response !== true) throw new Error();
        await store.dispatch(Actions.AUTH_USER);
        Swal.fire({
          text: "Role is pending for approval",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          customClass: {
            confirmButton: "btn btn-primary",
          },
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
    onMounted(async () => {
      try {
        if (!roles.value.length) {
          const response = await store.dispatch(Actions.GET_ROLES);
          if (response !== true) throw new Error();
        }
      } catch (err) {
        console.log("error in fetching roles");
      }
    });
    return {
      isRoleAttached,
      user,
      roles,
      op,
      attachRole,
    };
  },
});
</script>
