<template>
  <div
    class="ui-range"
    :class="{ 'ui-range_disabled': props.disabled }"
    @click="handleProgressBarClick"
  >
    <div class="ui-range__line">
      <div class="ui-range__track" />
      <div class="ui-range__progress" :style="{ width: `${props.value}%` }" />
    </div>
    </div>
</template>

<script setup lang="ts">
interface Props {
  value: number;
  disabled?: boolean;
}

interface Emits {
  (e: 'update:value', value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handleProgressBarClick (e: MouseEvent) {
  const { offsetX, currentTarget } = e as MouseEvent & { currentTarget: HTMLElement };

  const progress = offsetX / currentTarget.clientWidth * 100;

  emit('update:value', progress);
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
  .ui-range {
    --track-height: 4px;
    --tack-save-area-height: 5px;
    cursor: pointer;
    padding: var(--tack-save-area-height) 0;

    &_disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }

    &__line {
      position: relative;
      border-radius: 3px;
    }

    &__track {
      width: 100%;
      height: var(--track-height);
      background-color: $color-gray;
    }

    &__progress {
      height: var(--track-height);
      background-color: $color-purple;
      position: absolute;
      border-radius: 3px;
      left: 0;
      top: 0;
    }
  }
</style>
