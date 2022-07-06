<template>
  <div class="ui-audio-player-volume-bar">
    <ui-icon name="volume" @click="handleMuteButtonClick"></ui-icon>
    <ui-range
      class="ui-audio-player-volume-bar__range"
      :value="computedVolume"
      :disabled="props.disabled"
      @update:value="handleVolumeChange"
    />
  </div>
</template>

<script setup lang="ts">
import UiIcon from '@/components/UiIcon.vue';
import UiRange from '@/components/UiRange.vue';
import { computed } from 'vue';

interface Props {
  volume: number;
  disabled?: boolean
}

interface Emits {
  (e: 'update:volume', value: number): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const computedVolume = computed(() => props.volume * 100);

function handleMuteButtonClick () {

}

function handleVolumeChange (volume: number) {
  emit('update:volume', volume / 100);
}
</script>

<style lang="scss">
.ui-audio-player-volume-bar {
  display: flex;
  gap: 16px;

  &__range {
    width: 100px;
  }
}
</style>
