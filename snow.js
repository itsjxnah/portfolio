const canvas = document.querySelector("#snow");
const ctx = canvas.getContext("2d");
const flakes = [];
const count = 80;

function resize() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = innerWidth * scale;
    canvas.height = innerHeight * scale;
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
}

for (let i = 0; i < count; i++) {
    flakes.push({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 1.5 + 0.5,
        drift: Math.random() * 0.6 - 0.3,
    });
}

function animate() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (const flake of flakes){
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();

        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > innerHeight) {
            flake.y = -flake.radius;
            flake.x = Math.random() * innerWidth;
        }
        if (flake.x < 0) flake.x =innerWidth;
        if (flake.x > innerWidth) flake.x = 0;
    }

    requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
resize();
animate();