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
class Cell {
    constructor (){
        this.alive = false;
        this.neighborsCount = 0;
    }
}
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
        if ( acutalCell === undefined || !acutalCell.alive) {

            if (acutalCell === undefined) this.data[x][y]= new Cell();
            acutalCell = this.data[x][y];
            

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

