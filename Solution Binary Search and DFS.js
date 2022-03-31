
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumMinimumPath = function (grid) {

    this.rows = grid.length;
    this.columns = grid[0].length;
    this.moves = [[-1, 0]/*up*/, [1, 0]/*down*/, [0, -1]/*left*/, [0, 1]/*right*/];
    return  binarySearch(grid);
};

/**
 * @param {number[][]} grid
 * @return {number}
 */
function  binarySearch(grid) {

    let left = 0;
    let right = Math.min(grid[0][0], grid[this.rows - 1][this.columns - 1]);

    while (left < right) {

        let value = Math.floor((right + left + 1) / 2);
        const visited = Array.from(new Array(this.rows), () => new Array(this.columns).fill(false));
        const pathFoundForCurrentValue = depthFirstSearch(grid, visited, value, 0, 0);

        if (pathFoundForCurrentValue) {
            left = value;
        } else {
            right = value - 1;
        }
    }
    return left;
}

/**
 * @param {number[][]} grid
 * @param {boolean[][]} visited
 * @param {number} value
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function depthFirstSearch(grid, visited, value, row, column) {
    if (row === this.rows - 1 && column === this.columns - 1) {
        return true;
    }

    visited[row][column] = true;
    for (let i = 0; i < this.moves.length; i++) {
        let r = row + this.moves[i][0];
        let c = column + this.moves[i][1];

        if (isInGrid(r, c) && !visited[r][c] && grid[r][c] >= value) {
            if (depthFirstSearch(grid, visited, value, r, c)) {
                return true;
            }
        }
    }
    return false;
}

/**
 * @param {number} row
 * @param {number} column
 * @return {boolean}
 */
function isInGrid(row, column) {
    return row >= 0 && row < this.rows && column >= 0 && column < this.columns;
}
