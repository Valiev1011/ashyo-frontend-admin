<template>
  <div class="app-modal" :class="{ 'app-modal-show': modelValue }">
    <AppTransition>
      <div v-if="modelValue" class="app-modal__body">
        <slot></slot>
      </div>
    </AppTransition>
  </div>
  <AppTransition>
    <span
      @click="$emit('update:modelValue', false)"
      v-if="modelValue"
      class="app-modal-shadow"
    ></span>
  </AppTransition>
</template>

<script setup lang="ts">
  import AppTransition from "../ui/app-transition.vue";

  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  });
</script>

<style lang="scss" scoped>
  .app-modal {
    position: fixed;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 50%;
    max-height: 600px;
    background-color: white;
    z-index: -1;
    opacity: 0;
    overflow: auto;
    border-radius: 0.5rem;
  }
  .app-modal-show {
    opacity: 1;
    z-index: 100;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .app-modal__body {
    padding: 20px;
  }
  .app-modal-shadow {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 990px) {
    .app-modal {
      width: 70%;
    }
  }
  @media (max-width: 768px) {
    .app-modal {
      width: 80%;
    }
  }
  @media (max-width: 576px) {
    .app-modal {
      width: 90%;
    }
  }
</style>
