<template>
  <div class="ui-audio-player-progress-bar">
    <ui-range
      :value="progressInPercent"
      :disabled="props.disabled"
      @update:value="handleProgressChangeEvent"
    />

    <div class="ui-audio-player-progress-bar__duration">
      <div class="ui-audio-player-progress-bar__duration-start">{{ formattedCurrentTime.minutes }}:{{ formattedCurrentTime.seconds }}</div>
      <div class="ui-audio-player-progress-bar__duration-end">{{ formattedDurationTime.minutes }}:{{ formattedDurationTime.seconds }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatTime } from '@/shared/time';
import { computed } from 'vue';
import UiRange from '@/components/UiRange.vue';

interface Props {
  duration: number;
  currentTime: number;
  disabled: boolean;
}

interface Emits {
  (e: 'progress', value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const progressInPercent = computed(() => parseFloat((props.currentTime / props.duration * 100).toFixed(2)));
const formattedDurationTime = computed(() => formatTime(props.duration));
const formattedCurrentTime = computed(() => formatTime(props.currentTime));

function handleProgressChangeEvent (progress: number) {
  emit('progress', progress * props.duration / 100);
}

</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.ui-audio-player-progress-bar {
  &__duration {
    display: flex;
    justify-content: space-between;
    margin-top: 4px;
    font-size: 10px;
    line-height: 15px;
  }
}
</style>
