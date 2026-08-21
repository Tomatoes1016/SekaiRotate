const audioMap = {
    'emu.png': new Audio('./assets/audios/emu_voice.mp3'),
    'aris.png': new Audio('./assets/audios/aris_voice.mp3')
};

Object.values(audioMap).forEach(audio => {
    audio.preload = 'auto';
});

let currentAudio = null;
let audioFadeFrame = null;


function getCurrentAudio() {
    const characterImg = document.getElementById('character');
    if (!characterImg) return null;

    for (const [imgName, audio] of Object.entries(audioMap)) {
        if (characterImg.src.endsWith('emu.png')) {
            return audio
        }
    }
    return null
}

function playVoice() {
    const audio = getCurrentAudio();
    if (!audio) return;

    if (currentAudio && currentAudio != audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = audio

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
            audio.volume = 1;
        } else {
            const nextVol = startVol + (1 - startVol) * progress;
            audio.volume = Math.max(0, Math.min(1, nextVol));
            audioFadeFrame = requestAnimationFrame(fadeIn);
        }
    }
    audioFadeFrame = requestAnimationFrame(fadeIn);
}

function stopVoice() {
    const audio = currentAudio || getCurrentAudio();
    if (!audio) return;

    cancelAnimationFrame(audioFadeFrame);
    emuAudio.loop = false;

    let remainingTime = (emuAudio.duration - emuAudio.currentTime) * 1000;
    if (isNaN(remainingTime) || remainingTime < 100) {
        remainingTime = 500;
    }
    const startVol = audio.volume;
    const startTime = performance.now();
    function fadeOut(time) {
        const elapsed = time - startTime;
        const progress = elapsed / remainingTime;

        if (progress >= 1) {
            emuAudio.volume = 0;
        } else {
            const nextVol = startVol * (1 - progress);
            audio.volume = Math.max(0, Math.min(1, nextVol));
            audioFadeFrame = requestAnimationFrame(fadeOut);
        }
    }
    audioFadeFrame = requestAnimationFrame(fadeOut);
}