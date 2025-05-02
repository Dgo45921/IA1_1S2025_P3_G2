export class Maze {
    constructor(height, width, start, end, walls) {
        this.height = height;
        this.width = width;
        this.start = start;
        this.end = end;
        this.walls = walls;
        this.grid = this.createGrid();
      
    }

    createGrid() {
        const grid = Array.from({ length: this.height }, () => Array(this.width).fill(0));
        for (const wall of this.walls) {
            grid[wall[0]][wall[1]] = 1; // Mark walls with 1
        }
        return grid;
    }
  }