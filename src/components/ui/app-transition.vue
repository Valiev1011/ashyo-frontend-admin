<template>
  <transition name="app-transition">
    <slot></slot>
  </transition>
</template>

<style lang="scss" scoped>
  .apptransition-enter-active,
  .apptransition-leave-active {
    transition: opacity 0.5s ease;
  }

  .apptransition-enter-from,
  .apptransition-leave-to {
    opacity: 0;
  }
</style>
