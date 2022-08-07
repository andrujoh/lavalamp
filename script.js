const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// ctx.fillStyle = "rgba(100,100,355, 1)";
const fillStyleColor = "whitesmoke";
ctx.fillStyle = fillStyleColor;

function getRandomPositiveOrNegative() {
  return Math.random() - 0.5 > 0 ? Math.random() * 1.5 : Math.random() * 1.5 - 1.5;
}

class Ball {
  static #getDefaultEffectSize(widthOrHeight) {
    return widthOrHeight * 0.5;
  }
  constructor(effect) {
    this.effect = effect;
    this.x = Ball.#getDefaultEffectSize(this.effect.width);
    this.y = Ball.#getDefaultEffectSize(this.effect.height);
    this.radius = Math.random() * 150 + 20;
    this.speedX = getRandomPositiveOrNegative();
    this.speedY = getRandomPositiveOrNegative();
    // this.color = cycleRgb(0, 0, 0);
    // this.r = 0;
    // this.g = 0;
    // this.b = 0;
  }
  update() {
    if (this.x < this.radius || this.x > this.effect.width - this.radius) this.speedX *= -1;
    if (this.y < this.radius || this.y > this.effect.height - this.radius) this.speedY *= -1;
    this.x += this.speedX;
    this.y += this.speedY;
    // if (this.r > 354) {
    //   this.r = 0;
    //   this.g++;
    //   if (this.g > 354) {
    //     this.g = 0;
    //     this.b++;
    //   }
    // }
    // this.r++;
  }
  draw(context) {
    context.beginPath();
    // ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
  reset() {
    this.x = Ball.#getDefaultEffectSize(this.effect.width);
    this.x = Ball.#getDefaultEffectSize(this.effect.height);
  }
}

class MetaballsEffect {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.metaballsArray = [];
  }
  init(numberOfBalls) {
    for (let i = 0; i < numberOfBalls; i++) {
      this.metaballsArray.push(new Ball(this));
    }
  }
  update() {
    this.metaballsArray.forEach(metaball => metaball.update());
  }
  draw(context) {
    this.metaballsArray.forEach(metaball => metaball.draw(context));
  }
  reset(newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
    this.metaballsArray.forEach(metaball => metaball.reset());
  }
}

class BackgroundEffect {
  constructor() {
    this.hueAngle = 0;
  }
  update() {
    if (this.hueAngle > 1800) {
      this.hueAngle = 0;
    }
    this.hueAngle++;
    // console.log("this.hueAngle:", this.hueAngle);
  }
  draw() {
    // canvas.style.filter = `
    // blur(20px) contrast(30)
    // hue-rotate(${this.hueAngle * 0.2}deg)
    // `;
  }
}

const effect = new MetaballsEffect(canvas.width, canvas.height);
const backgroundEffect = new BackgroundEffect();
effect.init(40);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.update();
  effect.draw(ctx);
  backgroundEffect.draw();
  backgroundEffect.update();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = fillStyleColor;
  effect.reset(canvas.width, canvas.height);
});
