import  { screen } from '@nut-tree/nut-js';

 export enum mouseCommands {
     up= 'mouse_up',
     down='mouse_down',
     left='mouse_left',
     right='mouse_right',
     position='mouse_position',
 }

 const maxHeight = await screen.height();
 const maxWidth = await screen.width();

 export const isValidPosition = (x:number, y:number):boolean => {
     return (x>= 0 && x<=maxWidth && y>=0 && y<=maxHeight)
 }