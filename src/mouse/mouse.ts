import  { mouse, Point } from '@nut-tree/nut-js';
 import { mouseCommands, isValidPosition } from './helpers.js';

 const getMouseMoveResult = async (data: string, x:number, y:number) => {
     if (isValidPosition(x,y)) {
         await mouse.move([new Point(x, y)]);
         return `${data}, done!`;
     } 
     return `Invalid new position`;
 }

 const mouseMoveAction = async (data: string) => {
     const arrayOfData = data.split(' ');
     const command  = arrayOfData[0];
     const currentMousePosition = await mouse.getPosition();

     switch(command){
             case mouseCommands.up: {
                 const step = Number(arrayOfData[1]);
                 const newYPosition =currentMousePosition.y-step;
                 return await getMouseMoveResult(data, currentMousePosition.x, newYPosition);
             }
             case mouseCommands.down: {
                 const step = Number(arrayOfData[1]);
                 const newYPosition =currentMousePosition.y+step;

                 return await getMouseMoveResult(data, currentMousePosition.x, newYPosition);
             }
             case mouseCommands.left: {
                 const step = Number(arrayOfData[1]);
                 const newXPosition = currentMousePosition.x-step;

                 return await getMouseMoveResult(data, newXPosition, currentMousePosition.y);
             }
             case mouseCommands.right: {
                 const step = Number(arrayOfData[1]);
                 const newXPosition = currentMousePosition.x+step;

                 return await getMouseMoveResult(data, newXPosition, currentMousePosition.y);
             }
             case mouseCommands.position: {
                 return `${mouseCommands.position} ${currentMousePosition.x},${currentMousePosition.y}`;
             }
             default: {
                 return 'Unknown command.';
             }
         }
 }


 export default mouseMoveAction;