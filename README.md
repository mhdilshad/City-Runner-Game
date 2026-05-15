# City Runner
#### Video Demo: https://youtu.be/eCs90OsksYA?si=djK_z2QcpVh3P-7M
#### Description:


# CITY RUNNER: AN URBAN SURVIVAL ADVENTURE

## Project Overview
**City Runner** is an endless-runner web application that transforms the classic browser "dino-run" mechanic into a vibrant, urban-themed survival game. Developed as a capstone-style project within the CS50 environment, the game challenges players to navigate a silhouetted skyline while dodging randomized city hazards. The goal was to create a game that felt "weighty" and responsive, using only the core web stack: HTML5, CSS3, and Vanilla JavaScript.

The game is set in a "Midnight Metropolis," where the player controls a pixel-art sprinter. Unlike traditional runners that rely on pre-built engines, City Runner uses custom-coded logic for movement and collision detection, providing a transparent look at how 2D games function at a fundamental level. It is designed to be accessible, addictive, and visually cohesive.

---

## File Documentation

### 1. index.html
The `index.html` file serves as the structural foundation and the "Stage Manager" for the game. It defines the `gameCanvas`, which acts as the viewport for the entire experience.

* **The Layering System:** I designed the HTML with a depth-first philosophy. The `score` and `overlay` screens are placed inside the canvas but are logically separated so they can sit on top of the action without interfering with the runner’s movement.
* **UI States:** The file contains two primary "Overlays" (`startScreen` and `gameOverScreen`). These are toggled via JavaScript classes to keep the user experience seamless, preventing the need for page refreshes between game sessions.
* **Asset Management:** The HTML explicitly links the CSS and JS files, ensuring that the browser loads the styling and logic in the correct order to prevent "flashes" of unstyled content.

### 2. style.css
The stylesheet is where the "feeling" of the game is created. It doesn't just handle colors; it handles the animation engine.

* **The Parallax Background:** Using the `background-repeat: repeat-x` property on the `gameCanvas`, I created an infinite city loop. By manipulating the `background-position` in the script, the CSS makes the city feel like a massive, moving world.
* **Jump Physics:** The `@keyframes jump` rule is the heart of the gameplay. I debated between using JavaScript-based gravity (calculating velocity every millisecond) versus CSS animations. I chose CSS animations because they are hardware-accelerated, ensuring the man’s jump remains smooth even on lower-end devices.

* **Special Sizing:** I implemented specific classes like `.dog-size` and `.banana-size`. This was necessary because different image files have different amounts of "padding." These classes ensure that, visually, the obstacles look consistent and fair to the player.

### 3. script.js
The JavaScript file is the "Engine" that drives the game logic. It manages three core systems:

* **The Obstacle Factory:** The `createObstacle` function uses `Math.random()` to determine which of the four hazards (trash can, banana, fire-hydrant, or dog) will appear. This ensures no two runs are the same.
* **The Collision Engine:** I spent significant time on the math inside the `moveTimer`. It checks the runner's bottom position against the obstacle's left and right edges.
* **State Management:** The script tracks whether the game has started, if it’s currently over, and the player’s score. It ensures that inputs (like the Spacebar) perform different actions depending on the state—jumping during the game versus restarting after a crash.

---

## Design Choices and Debates

### The "Hitbox" Dilemma
One of the most debated aspects of the design was the **Collision Hitbox**. Initially, the game was "pixel-perfect," meaning if even a single pixel of the runner's hair touched the dog's tail, the game ended. This felt frustrating and unfair because the player visually felt they had cleared the object.
**Decision:** I chose to implement "fudge factors" in the collision logic. By narrowing the hitbox detection slightly, I created a "buffer" that rewards players for close calls rather than punishing them for "near misses." This makes the game feel more forgiving and significantly improves the "fun factor."

### CSS vs. JS Gravity
I debated whether to code a "Gravity Constant" in JavaScript. While a JS-based gravity system allows for variable jump heights (jumping higher if you hold the button), it often leads to "stuttering" in the browser due to the overhead of constant calculation.
**Decision:** I prioritized **performance over complexity**. The CSS jump is a fixed 0.5s arc. This makes the game more "rhythmic" and easier for the player to learn the timing, similar to classic rhythm-based arcade games.

### Sprite Sizing and Visual Hierarchy
When I added the `dog.png`, it initially appeared much smaller than the `banana.png` due to the file's resolution. I debated resizing the raw images in a photo editor.
**Decision:** I decided to handle scaling entirely through the CSS `.dog-size` and `.banana-size` classes. This choice allows the game to be easily "modded" in the future. If a player wants to replace the dog with a giant monster, they only need to change one line of CSS rather than re-editing the entire image asset.

---

## Gameplay Encyclopedia

### The Hazards
* **The Trash Can:** The standard hazard. Requires a baseline jump.
* **The Banana Peel:** A low-profile threat that tests ground-level focus.
* **The Fire Hydrant:** A dense, narrow obstacle that requires precise timing.
* **The Dog:** The ultimate challenge. Its comparative large size requires an earlier jump to clear safely.

### How to Play
1.  **Launch:** Open `index.html` in your CS50 environment.
2.  **Initialize:** Press the **Spacebar** to start the game.
3.  **Maneuver:** Use the **Spacebar** to jump.
4.  **Survival:** Pass as many obstacles as possible to build your score. Try not to crash into obstacles.
5.  **Restart:** After a collision, press **Spacebar** to try again!

## Conclusion
City Runner is a project that balances technical constraints with creative solutions. By focusing on "feel" and "rhythm" through CSS animations and forgiving collision math, the project demonstrates that simple tools can create highly addictive and polished gameplay experiences.
