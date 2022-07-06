<template>
  <div class="ui-audio-player-controls">
    <ui-audio-player-volume-bar
      :volume="props.volume"
      :disabled="props.disabled"
      @update:volume="handleUpdateVolumeEvent"
    />
    <button
      class="ui-audio-player-controls__play-button"
      :disabled="props.disabled"
      @click="handlePlayButtonClick"
    >
      <ui-icon :name="isPlaying ? 'pause' : 'play'" size="12" />
    </button>
  </div>
</template>

<script setup lang="ts">
import UiIcon from '@/components/UiIcon.vue';
import UiAudioPlayerVolumeBar from './UiAudioPlayerVolumeBar.vue';

interface Props {
  isPlaying?: boolean;
  disabled?: boolean;
  volume: number;
}

interface Emits {
  (e: 'play', value: boolean): void;
  (e: 'update:volume', value: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

function handlePlayButtonClick () {
  emit('play', !props.isPlaying);
}

function handleUpdateVolumeEvent (volume: number) {
  emit('update:volume', volume);
}
</script>

<style lang="scss">
@import '@/assets/styles/variables.scss';

.ui-audio-player-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 9px;

  &__play-button {
    width: 28px;
    height: 28px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: none;
    background-color: $color-purple;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
}
</style>
