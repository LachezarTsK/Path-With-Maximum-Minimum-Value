
#include <array>
#include <queue>
#include <vector>
using namespace std;

class Solution {

    struct Point {
        int row{};
        int column{};
        int value{};
        Point(int row, int column, int value) : row{row}, column{column}, value{value}{}
    };
    size_t rows;
    size_t columns;
    inline static const array<array<int, 2>, 4> moves{array<int, 2>{-1, 0}/*up*/,{1, 0}/*down*/,{0, -1}/*left*/,{0, 1}/*right*/};

    struct comparatorMaxValueOnTop {
        bool operator()(const Point& first, const Point& second) {
            return second.value > first.value;
        }
    };
    typedef priority_queue<Point, vector<Point>, comparatorMaxValueOnTop> MaxHeap;

public:

    int maximumMinimumPath(vector<vector<int>>& grid) {
        rows = grid.size();
        columns = grid[0].size();

        MaxHeap maxHeap;
        maxHeap.push(Point(0, 0, grid[0][0]));

        vector < vector<bool>> visited(rows, vector<bool>(columns, false));
        visited[0][0] = true;

        int maxMin = grid[0][0];
        while (!maxHeap.empty()) {

            Point current = maxHeap.top();
            maxHeap.pop();
            maxMin = min(maxMin, current.value);
            if (current.row == rows - 1 && current.column == columns - 1) {
                break;
            }

            for (int i = 0; i < moves.size(); i++) {
                int row = current.row + moves[i][0];
                int column = current.column + moves[i][1];

                if (isInGrid(row, column) && visited[row][column] == false) {
                    visited[row][column] = true;
                    maxHeap.push(Point(row, column, grid[row][column]));
                }
            }
        }
        return maxMin;
    }

private:
    bool isInGrid(int row, int column) {
        return row >= 0 && row < rows && column >= 0 && column < columns;
    }
};
