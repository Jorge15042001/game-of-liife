let GameOfLife =
{
    GameState : new PlanarGraph(),

    drawGameState: function ()
    {
        for (let x in this.GameState.data) for (let y in this.GameState.data[x])
        {
            const X = parseInt(x);
            const Y = parseInt(y);
    
            if (this.GameState.data[X][Y].alive )
            {
                fill (0);
            }
            else fill (200);
            rect(X*InfinityGrid.gridSize,Y*InfinityGrid.gridSize,InfinityGrid.gridSize);
        }
    },
            
    steepGame: function ()
    {
        let newGameState = new PlanarGraph();
        for (let x in this.GameState.data) for (let y in this.GameState.data[x])
        {
            const X = parseInt(x);
            const Y = parseInt(y);
            const cell = this.GameState.data[x][y];
            
            if (cell.alive && (cell.neighborsCount === 2 || cell.neighborsCount ===3 ))
            {
                newGameState.insert(X,Y);
            }
            if (!cell.alive && cell.neighborsCount == 3 )
            {
                newGameState.insert (X,Y);
            }
    
        }
        this.GameState = newGameState;
        
    },
}
