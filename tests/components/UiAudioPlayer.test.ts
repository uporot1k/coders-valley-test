import { mount } from '@vue/test-utils';
import { describe, it, vi, expect } from 'vitest';
import { readonly, ref } from 'vue';
import UiAudioPlayer from '../../src/components/UiAudioPlayer';
import * as moduleApi from './../../src/composables/use-audio';
import type { UseAudio } from './../../src/composables/use-audio';

const useAudioMock = (props?: Partial<UseAudio>) => {
  return {
    isPlaying: ref(false),
    isLoading: ref(false),
    isAvailable: ref(false),
    currentTime: ref(0),
    duration: readonly(ref(0)),
    volume: ref(1),
    play: vi.fn(),
    stop: vi.fn(),
    pause: vi.fn(),
    speed: vi.fn(),
    setCurrentTime: vi.fn(),
    setVolume: vi.fn(),
    ...props
  };
};

describe('UiAudioPlayer', () => {
  it('UiAudioPlayer call useAudio composable', () => {
    const spy = vi.spyOn(moduleApi, 'useAudio').mockReturnValue(useAudioMock());
    mount(UiAudioPlayer, { props: { src: 'test.mp3' } });

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('contorls disabled when audio not loaded', () => {
    vi.spyOn(moduleApi, 'useAudio').mockReturnValue(useAudioMock());
    const wrapper = mount(UiAudioPlayer, { props: { src: 'test.mp3' } });

    expect(wrapper.findComponent({ name: 'UiAudioPlayerControls' }).props()).toEqual({ volume: 1, disabled: true, isPlaying: false });
  });

  it('contorls active when audio loaded', () => {
    vi.spyOn(moduleApi, 'useAudio').mockReturnValue(useAudioMock({
      isAvailable: ref(true),
      isLoading: ref(false)
    }));

    const wrapper = mount(UiAudioPlayer, { props: { src: 'test.mp3' } });

    expect(wrapper.findComponent({ name: 'UiAudioPlayerControls' }).props()).toEqual({ volume: 1, disabled: false, isPlaying: false });
  });

  it('progress bar work"s', () => {
    vi.spyOn(moduleApi, 'useAudio').mockReturnValue(useAudioMock({
      isAvailable: ref(true),
      isLoading: ref(false),
      duration: ref(10),
      currentTime: ref(5)
    }));

    const wrapper = mount(UiAudioPlayer, { props: { src: 'test.mp3' } });

    expect(wrapper.findComponent({ name: 'UiAudioPlayerProgressBar' }).props()).toEqual({ duration: 10, currentTime: 5, disabled: false });
  });

  it('volume bar work"s', () => {
    vi.spyOn(moduleApi, 'useAudio').mockReturnValue(useAudioMock({
      isAvailable: ref(true),
      isLoading: ref(false),
      duration: ref(10),
      currentTime: ref(5),
      volume: ref(1)
    }));

    const wrapper = mount(UiAudioPlayer, { props: { src: 'test.mp3' } });

    expect(wrapper.findComponent({ name: 'UiAudioPlayerVolumeBar' }).props()).toEqual({ volume: 1, disabled: false });
  });
});
