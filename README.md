# City Runner
#### Video Demo: https://youtu.be/9yee5QZ_ycc?si=mQRcgSMAT9lJ771r
#### Description:


# CITY RUNNER: AN URBAN SURVIVAL ADVENTURE

## Project Overview
**City Runner** is an endless-runner web application that transforms the classic browser "dino-run" mechanic into a vibrant, urban-themed survival game. Developed as a capstone-style project within the CS50 environment, the game challenges players to navigate a silhouetted skyline while dodging randomized city hazards. The goal was to create a game that felt "weighty" and responsive, using only the core web stack: HTML5, CSS3, and Vanilla JavaScript.

The game is set in a "Midnight Metropolis," where the player controls a pixel-art sprinter across an expanded 960px × 360px cinematic canvas viewport. Unlike traditional runners that rely on pre-built engines, City Runner uses custom-coded logic for movement, state progression, and collision detection, providing a transparent look at how 2D games function at a fundamental level. It is designed to be accessible, addictive, and visually cohesive.

---

## File Documentation

### 1. index.html
The `index.html` file serves as the structural foundation and the "Stage Manager" for the game. It defines the `#gameCanvas`, which acts as the viewport for the entire experience.

* **The Layering System:** I designed the HTML with a depth-first philosophy using explicit `z-index` values. The `#score` tracker and screen overlays are placed cleanly inside the canvas container but are logically separated so they sit safely on top of the action without interfering with the runner’s movement.
* **UI States:** The file contains two primary menu interfaces (`#startScreen` and `#gameOverScreen`). These overlays are dynamically toggled via JavaScript classes to keep the user experience seamless, preventing the need for tedious page refreshes between game sessions.
* **Asset Management:** The HTML explicitly hooks the external style layers and engine scripts together, ensuring that the browser structures fonts and graphic canvas zones smoothly prior to logic deployment.

### 2. style.css
The stylesheet is where the "feeling" and scale of the game are created. It handles viewport dimensions, aesthetic filters, and the core animation loop.

* **Widescreen Frame Scaling:** The main canvas is set to a spacious **960px × 360px** layout, optimizing the game visibility for modern laptop and desktop displays. The background relies on `background-repeat: repeat-x` and `background-size: cover` to cleanly tile the building silhouettes.
* **Hardware-Accelerated Jump Physics:** Player elevation is entirely driven by the `@keyframes jump` rule. By using CSS keyframes rather than calculating heavy gravity equations in JavaScript every millisecond, the game utilizes the computer’s GPU. This preserves a fluid, locked framerate even on lower-power machines.
* **Asset Normalization:** Customized classes like `.dog-size` and `.banana-size` override asset padding dimensions with `!important` declarations. This guarantees that different sprite dimensions scale accurately with the larger canvas frame while remaining fair to the player.

### 3. script.js
The JavaScript file is the "Engine" that drives the gameplay loop, math validation, and memory tracking. It manages three core systems:

* **The Obstacle Factory:** The `createObstacle` function uses pseudo-random distribution (`Math.random()`) to select, render, and push one of the four hazards (trash can, banana peel, fire hydrant, or dog) from the right canvas edge (`960px`) inward.
* **The Absolute Collision Engine:** A high-frequency evaluation loop calculates intersections between elements. By checking the live computed vertical bottom offset of the runner (`window.getComputedStyle`) against the real-time horizontal path coordinates of incoming hazards, it instantly triggers failure sequences if the player is too low.
* **Persistent High Score Memory:** The engine interfaces with browser `localStorage`. When a crash occurs, it automatically records, evaluates, and stores the player's personal record, displaying the high score instantly on the Game Over screen across page refreshes.

---

## Design Choices and Debates

### The "Hitbox" Dilemma
One of the most debated aspects of the design was the **Collision Hitbox**. Initially, the game was "pixel-perfect," meaning if even a single pixel of the runner's hair touched the dog's tail, the game ended. This felt frustrating and unfair because the player visually felt they had cleared the object.
**Decision:** I chose to implement "fudge factors" in the collision logic. By narrowing the hitbox detection values slightly relative to the expanded canvas proportions, I created a "buffer" that rewards players for close calls rather than punishing them for near misses.

### CSS vs. JS Gravity
I debated whether to code a variable velocity-based gravity calculation system in JavaScript. While a JS-based gravity system allows for holding a button down to jump higher, it can cause slight browser stuttering due to the overhead of constant calculation.
**Decision:** I prioritized **performance over complexity**. The CSS jump is an optimized, fixed 0.5s arc. This makes the game more "rhythmic" and easier for the player to learn the exact timing, mimicking classic coin-op arcade machine dynamics.

### Visual Clutter Management
During post-collision testing, having the active live score display remaining in the top right corner alongside the final score on the Game Over overlay created visual redundancy. 
**Decision:** I modified the engine states to hide the top-right `#score` element entirely via CSS classes upon an `endGame()` trigger, bringing it back cleanly during a `startGame()` execution. This ensures the player's focus remains squarely on their final achievements and high score records.

---

## Gameplay Encyclopedia

### The Hazards
* **The Trash Can:** The standard hazard. Requires a baseline jump.
* **The Banana Peel:** A deceptive, low-profile threat that tests ground-level focus.
* **The Fire Hydrant:** A dense, narrow obstacle that requires precise timing.
* **The Dog:** The ultimate challenge. Its expanded bounding size requires an earlier jump initialization to clear safely.

### How to Play
1.  **Launch:** Open `index.html` within your designated CS50 development environment or browser local server.
2.  **Initialize:** Press the **Spacebar** to clear the title overlay and begin the game.
3.  **Maneuver:** Press the **Spacebar** while running to leap over incoming obstacles.
4.  **Survival:** Pass as many obstacles as possible. Each hazard successfully cleared past the left edge increases your current score by **1 Point**.
5.  **Restart:** After a collision, press the **Spacebar** to immediately reset the board and try to beat your saved **High Score**!

---

## Conclusion
City Runner is a project that balances technical constraints with creative solutions. By focusing on "feel" and "rhythm" through optimized CSS hardware processing, persistent browser storage, and forgiving collision boundaries, the project demonstrates that native web tools can create highly addictive and polished gameplay experiences completely from scratch.
