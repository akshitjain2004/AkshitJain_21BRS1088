import { useState, useEffect } from 'react';
import '../styles/GameBoard.css';

const GameBoard = () => {
    const initialBoard = () => Array(5).fill(null).map(() => Array(5).fill(null));

    const [board, setBoard] = useState(initialBoard());
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState('A');
    const [message, setMessage] = useState('');
    const [winner, setWinner] = useState(null);

    const initializeBoard = () => {
        const newBoard = initialBoard();
        //assiging a on top row and b on bottom and also fixing intiial places in the matrix
        newBoard[0][0] = { player: 'A', piece: 'P1' };
        newBoard[0][1] = { player: 'A', piece: 'P2' };
        newBoard[0][2] = { player: 'A', piece: 'H1' };
        newBoard[0][3] = { player: 'A', piece: 'H2' };
        newBoard[0][4] = { player: 'A', piece: 'P3' };
        newBoard[4][0] = { player: 'B', piece: 'P1' };
        newBoard[4][1] = { player: 'B', piece: 'P2' };
        newBoard[4][2] = { player: 'B', piece: 'H1' };
        newBoard[4][3] = { player: 'B', piece: 'H2' };
        newBoard[4][4] = { player: 'B', piece: 'P3' };
        setBoard(newBoard);
    };

    useEffect(() => {
        initializeBoard();
    }, []);

    //checking for pieces whther they are selected for the right player chance
    const handlePieceSelect = (x, y) => {
        const piece = board[x][y];
        if (piece && piece.player === currentPlayer) {
            setSelectedPiece({ x, y, piece });
            setMessage('');
        } else {
            setMessage('Invalid selection. Please select your own piece.');
        }
    };

    const handleMove = (direction) => {
        if (!selectedPiece) {
            setMessage('Please select a piece first.');
            return;
        }
        const { x, y, piece } = selectedPiece;
        const [dx, dy] = getMovementDelta(piece.piece, direction, currentPlayer);

        const newX = x + dx;
        const newY = y + dy;

        if (newX < 0 || newX >= 5 || newY < 0 || newY >= 5) {
            setMessage('Invalid move. Out of bounds.');
            return;
        }

        const newBoard = [...board];
        const targetPiece = newBoard[newX][newY];
        if (targetPiece && targetPiece.player === currentPlayer) {
            setMessage('Invalid move. Cannot capture your own piece.');
            return;
        }
        newBoard[x][y] = null;
        newBoard[newX][newY] = piece;
        setBoard(newBoard);
        setSelectedPiece(null);
        checkForWin(newBoard);
        setCurrentPlayer(currentPlayer === 'A' ? 'B' : 'A');
        setMessage('');
    };

    const getMovementDelta = (pieceType, direction, player) => {
        const forward = player === 'A' ? 1 : -1;
        const backward = -forward;

        switch (pieceType) {
            case 'P1': 
            case 'P2':
            case 'P3':
                switch (direction) {
                    case 'L': return [0, -1];
                    case 'R': return [0, 1];
                    case 'F': return [forward, 0];
                    case 'B': return [backward, 0];
                    default: return [0, 0];
                }
            case 'H1': 
                switch (direction) {
                    case 'L': return [0, -2];
                    case 'R': return [0, 2];
                    case 'F': return [forward * 2, 0];
                    case 'B': return [backward * 2, 0];
                    default: return [0, 0];
                }
            case 'H2': 
                switch (direction) {
                    case 'FL': return [forward * 2, -2];
                    case 'FR': return [forward * 2, 2];
                    case 'BL': return [backward * 2, -2];
                    case 'BR': return [backward * 2, 2];
                    default: return [0, 0];
                }
            default: return [0, 0];
        }
    };

    const checkForWin = (newBoard) => {
        const playerAPieces = newBoard.flat().filter(cell => cell?.player === 'A').length;
        const playerBPieces = newBoard.flat().filter(cell => cell?.player === 'B').length;

        if (playerAPieces === 0) {
            setWinner('B');
        } else if (playerBPieces === 0) {
            setWinner('A');
        }
    };

    const resetGame = () => {
        initializeBoard();
        setCurrentPlayer('A');
        setMessage('');
        setWinner(null);
    };

    return (
        <center>
        <div>
            <h2>Current Player: {currentPlayer} <hr /> Click on your piece to select it</h2>
            {message && <p className="message">{message}</p>}
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, colIndex) => (
                            <div
                                key={colIndex}
                                className={`cell ${cell ? 'occupied' : ''}`}
                                onClick={() => handlePieceSelect(rowIndex, colIndex)}
                            >
                                {cell ? `${cell.player}-${cell.piece}` : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {selectedPiece && (
                <div className="controls">
                    {['L', 'R', 'F', 'B'].map((direction) => (
                        <button key={direction} onClick={() => handleMove(direction)}>
                            {direction}
                        </button>
                    ))}
                    {selectedPiece.piece.piece === 'H2' && (
                        <>
                            <button onClick={() => handleMove('FL')}>FL</button>
                            <button onClick={() => handleMove('FR')}>FR</button>
                            <button onClick={() => handleMove('BL')}>BL</button>
                            <button onClick={() => handleMove('BR')}>BR</button>
                        </>
                    )}
                </div>
            )}
            {winner && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Player {winner} Wins!</h2>
                        <button onClick={resetGame}>Reset Game</button>
                    </div>
                </div>
            )}
        </div>
        </center>
    );
};

export default GameBoard;
