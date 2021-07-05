import React from 'react';
import Board from '../board/Board'
import './style.css'
import SetColor from './SetColor';
import Undo from './Undo';
import SetLineWidth from './SetLineWidth'
import LineTool from './LineTool';
import Clear from './Clear';
import Pencil from './Pencil';


class Container extends React.Component
{
    constructor(props){
    super(props)
    }

    render(){
        return(
            <div className="container">
                <div className="adjustments">
                <div className="color-picker-container">
                    <SetColor/>
                    
                </div>

                <div className="Undo-btn">
                    <Undo/>
                </div>
                <div className="Redo-btn">
                    <Pencil/>
                </div>
                <div className="setlinewidth">
                    <SetLineWidth/>
                </div>
                <div className="Clear-btn">
                    <Clear/>
                </div>
                <div className="Line-btn">
                    <LineTool/>
                </div>
                </div>
                <div className="board-container">
                    <Board></Board>
                </div>


            </div>
        )
    }
}

export default Container