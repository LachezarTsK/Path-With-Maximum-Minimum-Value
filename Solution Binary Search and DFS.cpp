
#include <array>
#include <vector>
using namespace std;

class Solution {
    
    size_t rows;
    size_t columns;
    inline static const array<array<int, 2>, 4> moves{array<int, 2>{-1, 0}/*up*/,{1, 0}/*down*/,{0, -1}/*left*/,{0, 1}/*right*/};

public:

    int maximumMinimumPath(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();
        return binarySearch(grid);
    }

private:

    int binarySearch(const vector<vector<int>>& grid) {

        int left = 0;
        int right = min(grid[0][0], grid[rows - 1][columns - 1]);

        while (left < right) {

            int value = (right + left + 1) / 2;
            vector < vector<bool>> visited(rows, vector<bool>(columns, false));
            bool pathFoundForCurrentValue = depthFirstSearch(grid, visited, value, 0, 0);

            if (pathFoundForCurrentValue) {
                left = value;
            } else {
                right = value - 1;
            }
        }
        return left;
    }

    bool depthFirstSearch(const vector<vector<int>>& grid, vector<vector<bool>>& visited, int value, int row, int column) {
        if (row == rows - 1 && column == columns - 1) {
            return true;
        }
        visited[row][column] = true;
        for (int i = 0; i < moves.size(); i++) {
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

    bool isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
