const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let mouse = {
    x: 0,
    y: 0
};

canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});


let x = 0;
let angle = 0;
let scale = 1;
let growing = true;
 
let bubbles = [];
 
// criar bolhas iniciais
for (let i = 0; i < 20; i++) {
    bubbles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 5 + 2,
        speed: Math.random() * 1 + 0.5
    });
}
 
// loop
function animar() {
    
    ctx.setTransform(1, 0, 0, 1, 0, 0);
 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
 
    desenharPlantas();  
    desenharBolhas();  
 
    desenharPeixe();
    desenharBaiacu();
    desenharLataGirando();
 
    requestAnimationFrame(animar);
}
 

// plantas - interação com o mouse
function desenharPlantas() {
    ctx.save();

    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;

    for (let i = 50; i < canvas.width; i += 100) {

        let baseX = i;
        let baseY = canvas.height;

        let dx = mouse.x - baseX;
        let dy = mouse.y - (canvas.height - 150);
        let distance = Math.sqrt(dx * dx + dy * dy);

        let influence = 0;
        if (distance < 150) {
            influence = (150 - distance) / 150;
        }

        let bend = dx * 0.3 * influence;

        ctx.beginPath();
        ctx.moveTo(baseX, baseY);

        ctx.quadraticCurveTo(
            baseX + 20 + bend,
            canvas.height - 100,
            baseX + bend,
            canvas.height - 200
        );

        ctx.stroke();
    }

    ctx.restore();
}
 
// bolhas
function desenharBolhas() {
    ctx.save();
 
    ctx.fillStyle = "rgba(173, 216, 230, 0.6)";
 
    bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
 
        b.y -= b.speed;
 
        if (b.y < -10) {
            b.y = canvas.height + 10;
            b.x = Math.random() * canvas.width;
        }
    });
 
    ctx.restore();
}
 
// peixe - translação
function desenharPeixe() {
    ctx.save();
 
    ctx.translate(x, 200);
 
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.ellipse(0, 0, 40, 20, 0, 0, Math.PI * 2);
    ctx.fill();
 
    ctx.beginPath();
    ctx.moveTo(-40, 0);
    ctx.lineTo(-70, -20);
    ctx.lineTo(-70, 20);
    ctx.closePath();
    ctx.fill();
 
    ctx.restore();
 
    x += 2;
    if (x > canvas.width + 100) x = -100;
}
 
// baiacu - escala em ponto fixo
function desenharBaiacu() {
    ctx.save();
 
    let px = 400;
    let py = 300;
 
    ctx.translate(px, py);
    ctx.scale(scale, scale);
    ctx.translate(-px, -py);
 
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(px, py, 30, 0, Math.PI * 2);
    ctx.fill();
 
    ctx.restore();
 
    if (growing) {
        scale += 0.01;
        if (scale > 1.5) growing = false;
    } else {
        scale -= 0.01;
        if (scale < 0.8) growing = true;
    }
}
 
// "peixe" que virou uma lata de coca - rotação + translação
function desenharLataGirando() {
    ctx.save();
 
    let px = 200;
    let py = 100;
 
    ctx.translate(px, py);
    ctx.rotate(angle);
 
    ctx.fillStyle = "red";
    ctx.fillRect(-20, -10, 40, 20);
 
    ctx.restore();
 
    angle += 0.05;
}
 
animar();