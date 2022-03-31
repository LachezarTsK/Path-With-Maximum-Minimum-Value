
public class Solution {

    private int rows;
    private int columns;
    private static final int[][] moves = {{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};

    public int maximumMinimumPath(int[][] grid) {
        rows = grid.length;
        columns = grid[0].length;
        return binarySearch(grid);
    }

    private int binarySearch(int[][] grid) {

        int left = 0;
        int right = Math.min(grid[0][0], grid[rows - 1][columns - 1]);

        while (left < right) {

            int value = (right + left + 1) / 2;
            boolean[][] visited = new boolean[rows][columns];
            boolean pathFoundForCurrentValue = depthFirstSearch(grid, visited, value, 0, 0);

            if (pathFoundForCurrentValue) {
                left = value;
            } else {
                right = value - 1;
            }
        }
        return left;
    }

    private boolean depthFirstSearch(int[][] grid, boolean[][] visited, int value, int row, int column) {
        if (row == rows - 1 && column == columns - 1) {
            return true;
        }
        visited[row][column] = true;
        for (int i = 0; i < moves.length; i++) {
            int r = row + moves[i][0];
            int c = column + moves[i][1];

            if (isInGrid(r, c) && !visited[r][c] && grid[r][c] >= value) {
                if (depthFirstSearch(grid, visited, value, r, c)) {
                    return true;
                }
            }
        }
        return false;
    }

    private boolean isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
