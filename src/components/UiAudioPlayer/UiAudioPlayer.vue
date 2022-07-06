<template>
  <div class="ui-audio-player">
    <ui-audio-player-progress-bar
      v-bind="{ duration, disabled: isLoading || !isAvailable,  currentTime }"
      @progress="handleProgressChangeEvent"
    />
    <ui-audio-player-controls
      v-bind="{ isPlaying, disabled: isLoading || !isAvailable, volume }"
      @play="handleTogglePlayingStateChangeEvent"
      @update:volume="handleUpdateVolumeEvent"
    />
  </div>
</template>

<script setup lang="ts">
import UiAudioPlayerControls from './UiAudioPlayerControls.vue';
import UiAudioPlayerProgressBar from './UiAudioPlayerProgressBar.vue';
import { useAudio } from '../../composables';
import { toRef } from 'vue';

interface Props {
  src: string;
}

const props = defineProps<Props>();

const {
  isPlaying,
  isLoading,
  isAvailable,
  currentTime,
  duration,
  volume,
  play,
  stop,
  setCurrentTime,
  setVolume
} = useAudio(toRef(props, 'src'));

function handleTogglePlayingStateChangeEvent (value: boolean) {
  if (!value) {
    stop();

    return;
  }

  play();
}

function handleProgressChangeEvent (progress: number) {
  setCurrentTime(progress);
}

function handleUpdateVolumeEvent (volume: number) {
  setVolume(volume);
}
</script>

<style lang="scss">
.ui-audio-player {
  min-width: 220px;
}
</style>
