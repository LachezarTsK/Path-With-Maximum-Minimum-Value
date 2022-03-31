
const {PriorityQueue} = require('@datastructures-js/priority-queue');

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumMinimumPath = function (grid) {

    this.rows = grid.length;
    this.columns = grid[0].length;
    const moves = [[-1, 0]/*up*/, [1, 0]/*down*/, [0, -1]/*left*/, [0, 1]/*right*/];

    const maxHeap = new MaxPriorityQueue({compare: (first, second) => comparatorMaxValueOnTop(first, second)});
    maxHeap.enqueue(new Point(0, 0, grid[0][0]));

    const visited = Array.from(new Array(this.rows), () => new Array(this.columns).fill(false));
    visited[0][0] = true;

    let maxMin = grid[0][0];
    while (!maxHeap.isEmpty()) {

        const current = maxHeap.dequeue();
        maxMin = Math.min(maxMin, current.value);
        if (current.row === this.rows - 1 && current.column === this.columns - 1) {
            break;
        }

        for (let i = 0; i < moves.length; i++) {
            let row = current.row + moves[i][0];
            let column = current.column + moves[i][1];

            if (isInGrid(row, column) && visited[row][column] === false) {
                visited[row][column] = true;
                maxHeap.enqueue(new Point(row, column, grid[row][column]));
            }
        }
    }
    return maxMin;
};

/**
 * @param {number} row
 * @param {number} column
 * @param {number} value
 */
function  Point(row, column, value) {
    this.row = row;
    this.column = column;
    this.value = value;
}

/**
 * @param {number} first
 * @param {number} second
 * @return {number}
 */
function comparatorMaxValueOnTop(first, second) {
    return second.value - first.value;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function isInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
