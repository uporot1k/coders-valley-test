<template>
  <div class="wrapper">
    <input type="text" v-model="audioURL" />
    <ui-audio-player :src="audioURL" style="margin-top: 30px" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import UiAudioPlayer from './components/UiAudioPlayer';

const audioURL = ref<string>('https://www.dofactory.com/media/epic.mp3');
</script>
<style lang="scss">
.wrapper {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
