import { Maze } from './Maze.js';

export let maze = null;


export function loadMaze(json){
    console.log('loading maze from JSON')

    const { alto, ancho, inicio, fin, paredes } = json;
    maze = new Maze(alto, ancho, inicio, fin, paredes);
    //console.log('maze loaded', maze)
}

