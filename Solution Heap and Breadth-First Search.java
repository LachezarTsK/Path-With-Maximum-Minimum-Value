
import java.util.PriorityQueue;

public class Solution {

    private record Point(int row, int column, int value) {}
    private int rows;
    private int columns;
    private static final int[][] moves = {{-1, 0}/*up*/, {1, 0}/*down*/, {0, -1}/*left*/, {0, 1}/*right*/};

    public int maximumMinimumPath(int[][] grid) {
        rows = grid.length;
        columns = grid[0].length;

        PriorityQueue<Point> maxHeap = new PriorityQueue<>((first, second) -> comparatorMaxValueOnTop(first, second));
        maxHeap.add(new Point(0, 0, grid[0][0]));

        boolean[][] visited = new boolean[rows][columns];
        visited[0][0] = true;

        int maxMin = grid[0][0];
        while (!maxHeap.isEmpty()) {

            Point current = maxHeap.poll();
            maxMin = Math.min(maxMin, current.value);
            if (current.row == rows - 1 && current.column == columns - 1) {
                break;
            }

            for (int i = 0; i < moves.length; i++) {
                int row = current.row + moves[i][0];
                int column = current.column + moves[i][1];

                if (isInGrid(row, column) && visited[row][column] == false) {
                    visited[row][column] = true;
                    maxHeap.add(new Point(row, column, grid[row][column]));
                }
            }
        }

        return maxMin;
    }

    private int comparatorMaxValueOnTop(Point first, Point second) {
        return second.value - first.value;
    }

    private boolean isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
}
