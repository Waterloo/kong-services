<template>
  <header>
    <div class="nav">
      <div class="nav-left">
        <img
          alt="Konnect Logo"
          src="/public/logo.svg"
        >
      </div>
      <div class="nav-right">
        <button
          class="nav-button"
          title="Organization"
        >
          <PeopleIcon :size="20" />
          <span>Organization</span>
        </button>
        <button
          class="nav-button"
          title="Settings"
        >
          <CogIcon :size="20" />
          <span>Settings</span>
        </button>
        <button
          class="nav-button nav-profile"
          title="Katherine Ellis"
        >
          <ProfileIcon :size="20" />
          <span>Katherine Ellis</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PeopleIcon, CogIcon, ProfileIcon } from '@kong/icons'

</script>

<style lang="scss" scoped>
.nav {
  align-items: center;
  background: linear-gradient(180deg, #09224F 0%, #073382 100%);
  border-bottom: 1px solid #333;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4rem;
  padding: 16px 24px;

  .nav-left {
    align-items: center;
    display: flex;
    gap: 12px;

    img {
      height: 24px;
      width: auto;
    }

    .nav-title {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
  }

  .nav-right {
    align-items: center;
    display: flex;
    gap: 8px;

    .nav-button {
      align-items: center;
      background: transparent;
      border: none;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
      display: flex;
      font-size: 1.4rem;
      gap: 8px;
      padding: 8px 12px;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      &.nav-profile {
        background-color: rgba(255, 255, 255, 0.15);

        &:hover {
          background-color: rgba(255, 255, 255, 0.25);
        }
      }

      span {
        font-weight: 400;
      }
    }
  }

  a {
    color: blue;
    font-weight: 700;

    &.router-link-exact-active {
      color: green;
    }
  }
}
</style>
