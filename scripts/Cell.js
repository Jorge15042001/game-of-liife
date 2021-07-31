class Cell {
    constructor (alive=false){
        this.isAlive  = alive; //actual state
        this.wasAlive = false;//last state

        this.neighbors = new Set();//list of neighbors
    }
}
