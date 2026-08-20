const emuAudio = new Audio('./assets/audios/emu_voice.mp3');
emuAudio.preload = 'auto';
let audioFadeFrame = null;

function playVoice() {
    const characterImg = document.getElementById('character');
    if (!characterImg || !characterImg.src.endsWith('emu.png')) return;

    cancelAnimationFrame(audioFadeFrame);

    emuAudio.loop = true;
    if (emuAudio.paused) {
        emuAudio.currentTime = 0;
        emuAudio.volume = 0;
        emuAudio.play().catch(err => console.warn('Audio playback is blocked:', err));
    }

    const fadeDuration = 500;
    const startVol = emuAudio.volume;
    const startTime = performance.now();

    function fadeIn(time) {
        const elapsed = time - startTime;
        const progress = elapsed / fadeDuration;

        if (progress >= 1) {
            emuAudio.volume = 1;
        } else {
            const nextVol = startVol + (1 - startVol) * progress;
            emuAudio.volume = Math.max(0, Math.min(1, nextVol));
            audioFadeFrame = requestAnimationFrame(fadeIn);
        }
    }
    audioFadeFrame = requestAnimationFrame(fadeIn);
}

function stopVoice() {
    const characterImg = document.getElementById('character');
    if (!characterImg || !characterImg.src.endsWith('emu.png')) return;

    cancelAnimationFrame(audioFadeFrame);
    emuAudio.loop = false;

    let remainingTime = (emuAudio.duration - emuAudio.currentTime) * 1000;
    if (isNaN(remainingTime) || remainingTime < 100) {
        remainingTime = 500;
    }
    const startVol = emuAudio.volume;
    const startTime = performance.now();
    function fadeOut(time) {
        const elapsed = time - startTime;
        const progress = elapsed / remainingTime;

        if (progress >= 1) {
            emuAudio.volume = 0;
        } else {
            const nextVol = startVol * (1 - progress);
            emuAudio.volume = Math.max(0, Math.min(1, nextVol));
            audioFadeFrame = requestAnimationFrame(fadeOut);
        }
    }
    audioFadeFrame = requestAnimationFrame(fadeOut);
}