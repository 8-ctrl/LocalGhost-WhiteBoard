import React, { createContext } from "react"
import './style.css'
import SetColor from "../container/SetColor";
import Undo from '../container/Undo'
import SetLineWidth from "../container/SetLineWidth"


class Board extends React.Component
{
        constructor(props){
            super(props)
        }
        componentDidMount(){
            this.drawOnCanvas();
        }

        drawOnCanvas(){
        
            const canvas = document.getElementById('board');
            const ctx = canvas.getContext('2d');
            var sketch = document.querySelector('#sketch');
            var sketch_style = getComputedStyle(sketch);
            canvas.width = parseInt(sketch_style.getPropertyValue('width'));            canvas.height=200;
            canvas.height = parseInt(sketch_style.getPropertyValue('height'));
            const undo = document.getElementById('undo');

            // Color change
            var colorel = document.getElementById('setcolor')
            var color = "#000000"
            colorel.addEventListener('input',()=>{
                color = colorel.value
            })
             /* Change Pen Width */
            const buttons = document.getElementsByClassName('btn');
            console.log(buttons);
            for (let x = 0; x < buttons.length; x++) {
                buttons[x].addEventListener('click', () => {
                ctx.lineWidth = parseInt(buttons[x].innerText);
                });
            }

            ctx.lineCap = 'round';
            // ctx.strokeStyle = color;
            let drawing = false;
            let pathsry = [];
            let points = [];
            
            var mouse = {x: 0, y: 0};
            var previous = {x: 0, y: 0};
            
            canvas.addEventListener('mousedown', function(e) {
            drawing = true; 
            previous = {x:mouse.x,y:mouse.y};
            mouse = oMousePos(canvas, e);
            points = [];
            points.push({x:mouse.x,y:mouse.y})
            });
            
            canvas.addEventListener('mousemove', function(e) {
            if(drawing){
            previous = {x:mouse.x,y:mouse.y};
            mouse = oMousePos(canvas, e);
            // saving the points in the points array
            points.push({x:mouse.x,y:mouse.y})
            // drawing a line from the previous point to the current point
            ctx.beginPath();
            ctx.moveTo(previous.x,previous.y);
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
            ctx.strokeStyle=color;
            }
            }, false);
            
            
            canvas.addEventListener('mouseup', function() {
            drawing=false;
            // Adding the path to the array or the paths
            pathsry.push(points);
            }, false);
            
            
            undo.addEventListener("click",Undo);
            
            function drawPaths(){
              // delete everything
              ctx.clearRect(0,0,canvas.width,canvas.height);
              // draw all the paths in the paths array
              pathsry.forEach(path=>{
              ctx.beginPath();
              ctx.moveTo(path[0].x,path[0].y);  
              for(let i = 1; i < path.length; i++){
                ctx.lineTo(path[i].x,path[i].y); 
              }
                ctx.stroke();
              })
            }  
            
            function Undo(){
              // remove the last path from the paths array
              pathsry.splice(-1,1);
              // draw all the paths in the paths array
              drawPaths();
            }
            
            
            // a function to detect the mouse position
            function oMousePos(canvas, evt) {
              var ClientRect = canvas.getBoundingClientRect();
                return { //objeto
                x: Math.round(evt.clientX - ClientRect.left),
                y: Math.round(evt.clientY - ClientRect.top)
            }
            }


};
        

        render(){
            return(
                <div className="sketch" id="sketch">
                    <canvas className="board" id='board'></canvas>
                </div>
            )
        }
}
export default Board