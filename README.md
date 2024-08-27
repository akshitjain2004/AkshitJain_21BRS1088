
# Akshit Jain - 21BRS1088

## Project Structure
- This project is divided into two main parts:
  1. **Server (WebSocket)**
  2. **Client (Frontend)**

## How to Run the Project
1. **Clone the Repository:**
   git clone <repository_url>
   cd <repository_name>

2. **Install Required Dependencies:**
   - For the server:
     cd server
     npm install
   - For the client:
     cd client
     npm install

3. **Tech Stack:**
   - **Client:** Vite, React, JavaScript
   - **Server:** Node.js with WebSockets

4. **Start the Server:**
   cd server
   node index.js

5. **Start the Client:**
   cd client
   npm run dev

## Game Rules
### Characters and Movement
There are three types of characters available:
1. **Pawn:**
   - Moves one block in any direction (Left, Right, Forward, or Backward).
   - Move commands: L (Left), R (Right), F (Forward), B (Backward)
   
2. **Hero1:**
   - Moves two blocks straight in any direction.
   - Kills any opponent's character in its path.
   - Move commands: L (Left), R (Right), F (Forward), B (Backward)

3. **Hero2:**
   - Moves two blocks diagonally in any direction.
   - Kills any opponent's character in its path.
   - Move commands: FL (Forward-Left), FR (Forward-Right), BL (Backward-Left), BR (Backward-Right)

### Winning the Game:
- The game ends when one player eliminates all of their opponent's characters.
- The winning player is announced, and players can choose to start a new game.
