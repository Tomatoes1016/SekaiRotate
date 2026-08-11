const character = document.getElementById('character');

let angle = 0;
let speed = 0;
let isPressing = false;
let targetAngle = 0;

const MAX_SPEED = 30;
const ACCELERATION = 0.3;
const FRICTION = 0.92;
const SPRING = 0.03;

character.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    isPressing = true;
});

function release() {
    if (!isPressing) return;
    isPressing = false;
    const estimatedDist = speed * (FRICTION / (1 - FRICTION));
    const estimatedEndAngle = angle + estimatedDist;
    targetAngle = Math.round(estimatedEndAngle / 360) * 360;
}

window.addEventListener('pointerup', release);
window.addEventListener('pointercancel', release);
character.addEventListener('contextmenu', (e) => e.preventDefault());

function update() {
    if (isPressing) {
        speed = Math.min(speed + ACCELERATION, MAX_SPEED);
        angle += speed;
    } else {
        const pullForce = (targetAngle - angle) * SPRING;
        speed = (speed + pullForce) * FRICTION;
        angle += speed;
    }
    character.style.transform = `rotate(${angle}deg)`;
    requestAnimationFrame(update);
}

update();