export function playClickSound() {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  // Create a sharp, clicky sound with multiple oscillators
  const oscillator1 = audioContext.createOscillator();
  const oscillator2 = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator1.connect(filter);
  oscillator2.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // High-pass filter for crisp click
  filter.type = "highpass";
  filter.frequency.setValueAtTime(1000, audioContext.currentTime);

  // Sharp frequency drops for click effect
  oscillator1.frequency.setValueAtTime(2000, audioContext.currentTime);
  oscillator1.frequency.exponentialRampToValueAtTime(
    100,
    audioContext.currentTime + 0.02,
  );

  oscillator2.frequency.setValueAtTime(4000, audioContext.currentTime);
  oscillator2.frequency.exponentialRampToValueAtTime(
    150,
    audioContext.currentTime + 0.015,
  );

  // Very sharp attack and quick decay for clicky sound
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.002); // Super fast attack
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.04,
  ); // Quick decay

  oscillator1.start(audioContext.currentTime);
  oscillator1.stop(audioContext.currentTime + 0.04);

  oscillator2.start(audioContext.currentTime);
  oscillator2.stop(audioContext.currentTime + 0.04);
}

export function playBuzzerSound() {
  const audioContext = new (window.AudioContext ||
    (window as any).webkitAudioContext)();

  // Create a harsh buzzer sound
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  // Low-pass filter for harsh buzzer effect
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(400, audioContext.currentTime);

  // Low frequency sawtooth wave for buzzer
  oscillator.type = "sawtooth";
  oscillator.frequency.setValueAtTime(150, audioContext.currentTime);

  // Sharp attack and sustained decay for buzzer
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.3,
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}
