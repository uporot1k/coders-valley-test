function formatDecimal (time: string): string {
  return +time < 10 ? '0' + time : `${time}`;
}

export function formatTime (time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = (time - minutes * 60);

  return {
    minutes: formatDecimal(minutes.toFixed(0)),
    seconds: formatDecimal(seconds.toFixed(0))
  };
}
