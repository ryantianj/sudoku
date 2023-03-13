import React, {useContext} from "react";
import "./Sudoku.css"
import SudokuBoard from "./SudokuBoard";
import sudokuContext from "./SudokuContext";
import {solveSudoku} from "./Logic/SudokuLogic"
import Button from "./Button";

const SudokuSolver = () => {
    const TestComponent = () => {
        const sudokuCtx = useContext(sudokuContext)

        const handleClick = () => {
            const solution = solveSudoku(sudokuCtx.board.getBoardString())
            sudokuCtx.setFullBoard(solution)
        }

        const handleClear = () => {
            sudokuCtx.clearBoard()
        }

        return (
            <div>
                <Button onClick={handleClick}>
                    Solve
                </Button>
                <Button onClick={handleClear}>
                    Clear
                </Button>
            </div>
        )
    }

    return (
        <div className="componentWrapper">
            <div className="sudokuWrapper">
                <SudokuBoard />
                <TestComponent />
            </div>
        </div>
    )
}
export default SudokuSolver
