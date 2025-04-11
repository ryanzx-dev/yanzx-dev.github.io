const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const karakter = new Image();
karakter.src = '/character.png';

let karakterX = canvas.width / 2;
let karakterY = canvas.height / 2;
let speed = 2;
let direction = { x: 0, y: 0 };

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(karakter, karakterX, karakterY, 80, 80);
}

function update() {
  karakterX += direction.x * speed;
  karakterY += direction.y * speed;
  draw();
  requestAnimationFrame(update);
}

karakter.onload = () => {
  update();
};

// Joystick logic
const stick = document.getElementById('stick');
const joystick = document.getElementById('joystick');

let startX, startY;

joystick.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

joystick.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;
  stick.style.transform = `translate(${dx}px, ${dy}px)`;

  direction.x = dx / 50;
  direction.y = dy / 50;
});

joystick.addEventListener('touchend', () => {
  stick.style.transform = `translate(0px, 0px)`;
  direction = { x: 0, y: 0 };
});
