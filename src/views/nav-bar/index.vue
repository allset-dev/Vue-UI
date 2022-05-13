<template>
  <nav class="asv-nav-bar">
    <router-link to="/" class="asv-nav-bar-logo-wrapper">
      <img class="asv-nav-bar-logo" src="@/assets/logo.png" />
    </router-link>
    <ASVDropdown class="asv-nav-bar-bell-wrapper">
      <KIcon class="asv-nav-bar-bell" icon="notificationBell" />
      <template #dropdown>No notification</template>
    </ASVDropdown>
    <ASVDropdown>
      <KIcon class="asv-nav-bar-help" icon="help" />
      <template #dropdown>This is kong coding challange website</template>
    </ASVDropdown>
    <ASVDropdown>
      <KIcon class="asv-nav-bar-setting" icon="gear" />
      <template #dropdown><ThemeChanger /></template>
    </ASVDropdown>
    <ASVDropdown class="asv-nav-bar-user">
      <img class="asv-nav-bar-user-img" :src="userImgUrl" />
      <template #dropdown>Log out</template>
    </ASVDropdown>
  </nav>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";

import { KIcon } from "@kong/kongponents";
import { ASVDropdown } from "@/components";

// @ts-ignore
import ThemeChanger from "@/views/theme-changer";

const store = useStore();

const userImgUrl = computed(() => {
  return store.getters["user/getUserDetails"]?.imgUrl;
});
</script>
<style lang="scss">
.asv-nav-bar {
  height: 60px;
  border-bottom: 1px solid var(--asv-border-normal);
  display: flex;
  align-items: center;

  > * {
    margin-left: $spacing-24;

    &:last-child {
      margin-right: $spacing-24;
    }
  }

  &-bell {
    font-size: $font-size-20;

    &-wrapper {
      margin-left: auto;
    }
  }

  &-help {
    font-size: $font-size-20;
  }

  &-setting {
    font-size: $font-size-20;
  }

  &-user {
    &-img {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}
</style>
