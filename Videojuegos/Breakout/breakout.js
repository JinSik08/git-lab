/*
* Implementation of the game of breakout
*
* JinSik Yoon
* 2025-02-25
*/

"use strict";

// Vvariables
const canvasWidth = 800;
const canvasHeight = 600;
let oldTime;
const paddleVelocity = 8;
const speedIncrease = 1.05;
const initialSpeed = 0.5;

// Context of the Canvas
let ctx;
let life = 3;
let startGame = false;
let bloques = [];
let rompiste = 0;
let balls = [];
let powerUps = [];

// Clases for Breakout game
class Ball extends GameObject{
    constructor(position, width, height, color){
        super(position, width, height, color, "ball");
        this.initVelocity();
    }

    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
        // Rebote en paredes laterales
        if (this.position.x <= 0 || this.position.x + this.width >= canvasWidth) {
            this.velocity.x *= -1;
        }
        // Rebote en la parte superior
        if (this.position.y <= 0) {
            this.velocity.y *= -1;
        }
    }

    initVelocity(){
        this.position = new Vec(canvasWidth / 2 - 7, canvasHeight / 2 + 90);
        let angle = (Math.random() * Math.PI) - (Math.PI / 2);
        let direction = Math.random() < 0.5 ? -1 : 1;
        this.velocity = new Vec(Math.cos(angle) * direction, -Math.abs(Math.sin(angle))).times(initialSpeed);
    }
}

class Paddle extends GameObject{
    constructor(position, width, height, color, velocity){
        super(position, width, height, color, "paddle");
        this.velocity = new Vec(0.0, 0.0);
    }

    update(deltaTime){
        let newPosition = this.position.plus(this.velocity);
        newPosition.x = Math.max(0, Math.min(canvasWidth - this.width, newPosition.x));
        this.position = newPosition;
    }
}

class PowerUp extends GameObject{
    constructor(position, width, height, color, type){
        super(position, width, height, color, type);
        this.velocity = new Vec(0, 2);
    }
    update(){
        this.position = this.position.plus(this.velocity);
    }
}

function creaBloque(){
    let colors = ["orange", "yellow", "lime"];
    let filas = 8, columnas = 8, bloqueWidth = 75, bloqueHeight = 20, gap = 20;
    bloques = [];
    rompiste = [];
    for (let fila = 0; fila < filas; fila++){
        for (let columna = 0; columna < columnas; columna++){
            let x = columna * (bloqueWidth + gap) + 30;
            let y = fila * (bloqueHeight + gap) + 50;
            bloques.push(new GameObject(new Vec(x, y), bloqueWidth, bloqueHeight, colors[fila % colors.length], "block"));
        }
    }
}

function resetBall(){
    startGame = false;
    balls = [new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 15, 15, "red")];
}

function resetGame(){
    life = 3;
    rompiste = 0; 
    creaBloque();
    resetBall();
}

// An object to represent the box to be displayed
const box = new Ball(new Vec(canvasWidth / 2, canvasHeight / 2), 15, 15, "red");
const paddle = new Paddle(new Vec(canvasWidth / 2 - 75, canvasHeight - 30), 150, 20, "white");
const topBar = new GameObject(new Vec(0, 0), canvasWidth, 5, "white", "obstacle");
const leftBar = new GameObject(new Vec(0, 0), 5, canvasHeight, "white", "obstacle");
const rightBar = new GameObject(new Vec(canvasWidth, 0), -5, canvasHeight, "white", "obstacle");

function main(){
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');

    creaBloque();
    createEventListeners();
    resetBall();

    drawScene(0);
}

function createEventListeners(){
    window.addEventListener('keydown', (event) => {
        if (event.key == ' ' && !startGame) {
            startGame = true;
        }
        if (event.key == 'ArrowLeft'){
            paddle.velocity = new Vec(-paddleVelocity, 0);
        } else if (event.key == 'ArrowRight'){
            paddle.velocity = new Vec(paddleVelocity, 0);
        }
    });
    
    window.addEventListener('keyup', (event) => {
        if (event.key == 'ArrowLeft'){
            paddle.velocity = new Vec(0, 0);
        } else if (event.key == 'ArrowRight'){
            paddle.velocity = new Vec(0, 0);
        }
    });
}

function drawScene(newTime){
    if (oldTime == undefined){
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;
    
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Draw a square
    paddle.draw(ctx);
    balls.forEach(ball => ball.draw(ctx));
    bloques.forEach(bloque => bloque.draw(ctx));
    powerUps.forEach(powerUp => powerUp.draw(ctx));
    topBar.draw(ctx);
    leftBar.draw(ctx);
    rightBar.draw(ctx);

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Vidas: ${life}`, 20, 30);
    ctx.fillText(`Bloques destruidos: ${rompiste}`, 200, 30);

    // Update the properties of the object
    if (startGame){
        balls.forEach(ball => ball.update(deltaTime));
        powerUps.forEach(powerUp => powerUp.update());
    }
    paddle.update();
    
    // Colisión con el paddle
    balls.forEach(ball => {
        if (boxOverlap(ball, paddle)){
            ball.velocity.y *= -1.05;
        }
    });
    
    // Colisión con los bloques
    bloques = bloques.filter(bloque => {
        let golpea = balls.find(ball => boxOverlap(ball, bloque));
        if (golpea){
            let leftBall = golpea.position.x;
            let rightBall = golpea.position.x + golpea.width;
            let leftBloque = bloque.position.x;
            let rightBloque = bloque.position.x + bloque.width;

            if (rightBall > leftBloque && leftBall < leftBloque){
                golpea.velocity.x = -Math.abs(golpea.velocity.x);
            } else if (leftBall < rightBloque && rightBall > rightBloque){
                golpea.velocity.x = Math.abs(golpea.velocity.x);
            } else{
                golpea.velocity.y *= -1;
            }

            if (Math.random() < 0.03){
                powerUps.push(new PowerUp(new Vec(bloque.position.x + bloque.width / 2, bloque.position.y + bloque.height), 20, 20, "gold", "extraBall"));
            }
            rompiste++;
            return false;
        }
        return true;
    });
    
    // Manejo de los power-ups
    powerUps = powerUps.filter(powerUp => {
        if (boxOverlap(powerUp, paddle)){
            if (powerUp.type === "extraBall"){
                balls.push(new Ball(new Vec(paddle.position.x + paddle.width / 2, paddle.position.y - 20), 15, 15, "red"));
            }
            return false;
        }
        return powerUp.position.y < canvasHeight;
    });

    balls = balls.filter(ball => ball.position.y <= canvasHeight);
    if (balls.length === 0){
        life--;
        if (life > 0){
            resetBall();
        } else {
            alert("GAME OVER!");
            resetGame();
        }
    }

    if (bloques.length === 0){
        alert("Ganaste la partida!");
        resetGame();
    }

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}