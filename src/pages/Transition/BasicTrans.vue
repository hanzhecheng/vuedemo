<template functional>
    <transition name="basicfade" mode="out-in">
        <slot></slot>
    </transition>
</template>

<script>
export default {
  name: 'BasicTrans',
  props:{

  }
}
</script>

<style>
.basicfade-enter-active,
.basicfade-leave-active {
  transition: all 0.5s ease;
}
.basicfade-enter,
.basicfade-leave-to {
  opacity: 0;
  transform: scale(0.6);
}
</style>
