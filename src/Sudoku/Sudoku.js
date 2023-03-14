import React, {useState} from "react";
import "./Sudoku.css"
import {SudokuContextProvider} from "./SudokuContext";
import SudokuSolver from "./SudokuSolver";
import SudokuGame from "./SudokuGame";
import SudokuImage from "./Image/SudokuImage";

const Sudoku = () => {
    const [tab, setTab] = useState(1) // 0 for game, 1 for solver

    return (
        <SudokuContextProvider>
            <div className="tabsWrapper">
                <button onClick={() => setTab(0)} className="tab" style={tab === 0 ? {color : "blue", fontWeight: "bold"} : {}}>
                    GAME
                </button>
                <button onClick={() => setTab(1)} className="tab" style={tab === 1 ? {color : "blue", fontWeight: "bold"} : {}}>
                    SOLVER
                </button>
                <button onClick={() => setTab(2)} className="tab" style={tab === 2 ? {color : "blue", fontWeight: "bold"} : {}}>
                    IMAGE
                </button>
            </div>
            {tab === 0 && <SudokuGame/>}
            {tab === 1 && <SudokuSolver/>}
            {tab === 2 && <SudokuImage setTab={setTab}/>}
        </SudokuContextProvider>
    )
}
export default Sudoku
