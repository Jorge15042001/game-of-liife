const directions = [
    {"dx":-1,"dy":-1},
    {"dx": 0,"dy":-1},
    {"dx": 1,"dy":-1},
    {"dx": 1,"dy": 0},
    {"dx": 1,"dy": 1},
    {"dx": 0,"dy": 1},
    {"dx":-1,"dy": 1},
    {"dx":-1,"dy": 0},
];

class Collony
{
    constructor ()
    {
        this.map = new Object();
    }
    notiffyPrecenceToNeighbors (cell,x,y)
    {
        //making sure up and down rows exists
        if (this.map[x+1]=== undefined ) this.map[x+1] = new Object();
        if (this.map[x-1]=== undefined ) this.map[x-1] = new Object();
        

        for (let dir of directions) 
        {
            const dx = dir.dx;
            const dy = dir.dy;

            let neighborCell = this.map[x+dx][y+dy];
            if (neighborCell === undefined)neighborCell = this.setAware(x+dx, y+dy);
            
            //set connections between neighbors
            cell.neighbors.add(neighborCell);
            neighborCell.neighbors.add(cell);
            
        }
    }
    setAlive (x, y,)
    {
        if (this.map[x] === undefined) this.map[x]= new Object();
        
        const acutalCell = this.map[x][y];
        if (acutalCell === undefined) this.map[x][y] = new Cell(true);//preventens repited entires
        else if (!acutalCell.alive) this.notiffyPrecenceToNeighbors(acutalCell,x,y);

        return this.map[x][y];

        //find the neighbors
    }
    setAware (x, y)
    {
        if (this.map[x] === undefined) this.map[x]= new Object();
        
        const acutalCell = this.map[x][y];
        if (acutalCell === undefined) this.map[x][y] = new Cell(false);//preventens repited entires
        //else if (!acutalCell.alive) this.notiffyPrecenceToNeighbors(acutalCell,x,y);

        return this.map[x][y];
        
    }
    
    
};


class PlanarGraph
{
    constructor()
    {
        this.data = new Object();
    }
    insert ( x, y )
    {
        if ( this.data[x] === undefined) this.data[x] = new Object();

        let acutalCell = this.data[x][y];
        if ( acutalCell === undefined) this.data[x][y]= new Cell(false);

        acutalCell = this.data[x][y];

        if (  !acutalCell.alive ) {

            let neighborsCount = 0;
            //making sure up and down rows exists
            if (this.data[x+1]=== undefined ) this.data[x+1] = new Object();
            if (this.data[x-1]=== undefined ) this.data[x-1] = new Object();
            
            for ( let dir  of directions ){
                const dx = dir.dx;
                const dy = dir.dy;
                if ( this.data[x+dx][y+dy] === undefined ){
                    this.data[x+dx][y+dy] = new Cell();
                }
                const  cell = this.data[x+dx][y+dy];

                if (cell.alive ) neighborsCount +=1;
                cell.neighborsCount += 1;
            }

            acutalCell.neighborsCount = neighborsCount;
            acutalCell.alive = true;
        }
    }
}

