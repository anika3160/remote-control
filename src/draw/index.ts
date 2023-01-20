import drawRectangle from './rectangle.js'
import drawCircle from './circle.js'

export enum drawFiguresCommands {
  'square' = 'draw_square',
  'rectangle' = 'draw_rectangle',
  'circle' = 'draw_circle',
}

export { drawCircle, drawRectangle }
