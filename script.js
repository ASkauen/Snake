const canvas = document.querySelector("#canvas")
const gridSize = 31;
let direction = "";
let borders = [[], [], [], []]
let dead = false;
let foodId;
let trail = 1
document.getElementById("canvas").style.gridTemplateColumns = `repeat(${gridSize}, auto)`
document.getElementById("canvas").style.gridTemplateRows = `repeat(${gridSize}, auto)`

for (let i = 1; i <= (gridSize * gridSize); i++) {
    const pixel = document.createElement("div")
    pixel.setAttribute("id", `${i}`)
    pixel.setAttribute("data-t", "0")
    pixel.classList.add("pixel")
    canvas.appendChild(pixel)
}

const pixels = document.querySelectorAll(".pixel")
const startingPos = Math.ceil((gridSize * gridSize) / 2);


for (let i = 1; i <= gridSize; i++) {
    borders[0].push(i)
}

for (let i = 1 + (gridSize * (gridSize - 1)); i <= gridSize * gridSize; i++) {
    borders[1].push(i)
}

for (let i = 1; i <= gridSize * gridSize; i += gridSize) {
    borders[2].push(i)
}

for (let i = gridSize; i <= gridSize * gridSize; i += gridSize) {
    borders[3].push(i)
}

function isDead(pos, dir){
    (borders[1].includes(pos) && dir == "down") ? dead = true :
    (borders[0].includes(pos) && dir == "up") ? dead = true :
    (borders[2].includes(pos) && dir == "left") ? dead = true :
    (borders[3].includes(pos) && dir == "right") ? dead = true :
    ""

}

document.addEventListener("keydown", event => {
    switch (event.key) {
        case "ArrowUp":
            if (direction != "down") direction = "up"
            break;
        case "ArrowDown":
            if (direction != "up") direction = "down"
            break;
        case "ArrowLeft":
            if (direction != "right") direction = "left"
            break;
        case "ArrowRight":
            if (direction != "left") direction = "right"
            break;
    }
})

function checkCollide(pos) {
    if (Array.from(document.getElementById(`${pos}`).classList).includes("current")) dead = true
}

function move(pos, dir) {
    let currentPixel = document.getElementById(`${pos}`)
    if (dir == "up") {
        pos -= gridSize
        checkCollide(pos)
        currentPixel.classList.add("current")
        currentPixel.setAttribute("data-t", `${trail}`)
    } else if (dir == "down") {
        pos += gridSize
        checkCollide(pos)
        currentPixel.classList.add("current")
        currentPixel.setAttribute("data-t", `${trail}`)
    } else if (dir == "left") {
        pos -= 1
        checkCollide(pos)
        currentPixel.classList.add("current")
        currentPixel.setAttribute("data-t", `${trail}`)
    } else if (dir == "right") {
        pos += 1
        checkCollide(pos)
        currentPixel.classList.add("current")
        currentPixel.setAttribute("data-t", `${trail}`)
    }

    currentPos = pos
    for (let i = 1; i <= gridSize * gridSize; i++) {
        let pixelX = document.getElementById(`${i}`)
        if (pixelX.getAttribute("data-t") == 0) {
            pixelX.classList.remove("current")
        } else {
            let trailId = parseInt(pixelX.getAttribute("data-t"))
            pixelX.setAttribute("data-t", `${trailId - 1}`)

        }

    }
        

    
}

function clearPixel(pixel) {
    pixel.classList.remove("current")
    return "YE"
}

function spawnFood () {
    foodId = Math.floor(Math.random() * (gridSize * gridSize))
    if (currentPos != foodId) {
        document.getElementById(`${foodId}`).classList.add("food")
    } else {
        spawnFood()
    }
}

function addTrail() {
    let lastPixel;
}

function onFood(pos, foodId) {
    if (pos == foodId) {
        trail += 1
        return true
    }
    return false
}

let currentPos = startingPos;

function start() {
    isDead(currentPos, direction)
    if (!dead) {
        move(currentPos, direction)
        if (onFood(currentPos, foodId)) {
            document.getElementById(`${foodId}`).classList.remove("food")
            addTrail()
            spawnFood()
        }
    } else {
        currentPos = startingPos
        document.getElementById(`${foodId}`).classList.remove("food")
        spawnFood()
        direction = ""
        dead = false
        trail = 1
        loop
    }
}

spawnFood()
const loop = setInterval(start, 100)

        






