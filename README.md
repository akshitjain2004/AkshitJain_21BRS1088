
# Akshit Jain - 21BRS1088

## Project Structure
- This project is divided into two main parts:
  1. **Server (WebSocket)**
  2. **Client (Frontend)**

## How to Run the Project
1. **Clone the Repository:**
   \`\`\`bash
   git clone <repository_url>
   cd <repository_name>
   \`\`\`

2. **Install Required Dependencies:**
   - For the server:
     \`\`\`bash
     cd server
     npm install
     \`\`\`
   - For the client:
     \`\`\`bash
     cd client
     npm install
     \`\`\`

3. **Tech Stack:**
   - **Client:** Vite, React, JavaScript
   - **Server:** Node.js with WebSockets

4. **Start the Server:**
   \`\`\`bash
   cd server
   node start
   \`\`\`

5. **Start the Client:**
   \`\`\`bash
   cd client
   npm run dev
   \`\`\`

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

*All moves are relative to the player's perspective.*

### Winning the Game:
- The game ends when one player eliminates all of their opponent's characters.
- The winning player is announced, and players can choose to start a new game.
