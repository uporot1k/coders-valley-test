import { onMounted, DeepReadonly, onUnmounted, ref, watch, readonly, Ref } from 'vue';

export type UseAudio = {
  isLoading: DeepReadonly<Ref<boolean>>;
  isPlaying: DeepReadonly<Ref<boolean>>;
  isAvailable: DeepReadonly<Ref<boolean>>;
  currentTime: DeepReadonly<Ref<number>>;
  duration: DeepReadonly<Ref<number>>;
  volume: DeepReadonly<Ref<number>>;
  play(): void;
  stop(): void;
  setVolume(rate: number): void;
  setCurrentTime(time: number): void;
}

export function useAudio (src: Ref<string>): UseAudio {
  const audio = ref<HTMLAudioElement | null>(null);
  const isLoading = ref<boolean>(false);
  const isPlaying = ref<boolean>(false);
  const isAvailable = ref<boolean>(false);
  const currentTime = ref<number>(0);
  const duration = ref<number>(0);
  const volume = ref<number>(1);

  watch(
    () => src.value,
    (newSrc) => setup(newSrc)
  );

  onMounted(setup);
  onUnmounted(clear);

  function clear (): void {
    if (!audio.value) {
      return;
    }

    audio.value.removeEventListener('loadstart', handleLoadStartEvent);
    audio.value.removeEventListener('canplay', handleCanPlayEvent);
    audio.value.removeEventListener('timeupdate', handleTimeUpdateEvent);
    audio.value.removeEventListener('load', handleLoadEvent);
    audio.value.removeEventListener('ended', handleEndEvent);
    audio.value.removeEventListener('error', handleErrorEvent);
  };

  function setup (newSrc?: string): void {
    if (audio.value) {
      clear();
      stop();
    }

    audio.value = new Audio(newSrc ?? src.value);

    audio.value.addEventListener('loadstart', handleLoadStartEvent);
    audio.value.addEventListener('canplay', handleCanPlayEvent);
    audio.value.addEventListener('timeupdate', handleTimeUpdateEvent);
    audio.value.addEventListener('load', handleLoadEvent);
    audio.value.addEventListener('ended', handleEndEvent);
    audio.value.addEventListener('error', handleErrorEvent);
  };

  function play (): void {
    if (!audio.value) {
      return;
    }

    audio.value.play();
    isPlaying.value = true;
  };

  function stop (): void {
    if (!audio.value) {
      return;
    }

    audio.value.pause();
    isPlaying.value = false;
  };

  function setVolume (rate: number): void {
    if (!audio.value) {
      return;
    }
    console.log(rate);

    audio.value.volume = rate;
    volume.value = rate;
  };

  function setCurrentTime (time: number): void {
    if (!audio.value) {
      return;
    }

    audio.value.currentTime = time;
  };

  function handleLoadStartEvent (): void {
    if (!audio.value) {
      return;
    }

    currentTime.value = 0;
    isLoading.value = true;
    isPlaying.value = false;
  };

  function handleCanPlayEvent (): void {
    if (!audio.value) {
      return;
    }

    isAvailable.value = true;
    duration.value = audio.value.duration;
    audio.value.volume = volume.value;
    isLoading.value = false;
  };

  function handleLoadEvent (): void {
    if (!audio.value) {
      return;
    }

    volume.value = audio.value.volume;
    duration.value = audio.value.duration;
  };

  function handleTimeUpdateEvent (): void {
    if (!audio.value) {
      return;
    }

    currentTime.value = audio.value.currentTime;
  };

  function handleEndEvent (): void {
    if (!audio.value) {
      return;
    }

    isPlaying.value = false;
  };

  function handleErrorEvent (): void {
    if (!audio.value) {
      return;
    }

    isAvailable.value = false;
    isLoading.value = false;
    duration.value = 0;
  };

  return {
    isLoading: readonly(isLoading),
    isPlaying: readonly(isPlaying),
    isAvailable: readonly(isAvailable),
    currentTime: readonly(currentTime),
    duration: readonly(duration),
    volume,
    play,
    stop,
    setCurrentTime,
    setVolume
  };
}
