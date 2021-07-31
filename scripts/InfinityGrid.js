let InfinityGrid =
{
    totalOffsetTop : 0,
    totalOffsetLeft : 0,
    relativeOffsetTop :0,
    relativeOffsetLeft : 0,
    gridSize : 30,
    lineBorder :1,

    draw : function ()
    {
        const rows = ScreenManager.height/this.gridSize;
        const cols = ScreenManager.width/this.gridSize;

        for (let r = 0; r< rows;r ++) for (let c = 0; c< cols; c++)
        {
            noFill();
            rect(
                c*this.gridSize + this.relativeOffsetLeft,
                r*this.gridSize + this.relativeOffsetTop,
                this.gridSize);
        }
    },
    translate : function (dx ,dy)
    {
        this.totalOffsetTop += dy;
        this.totalOffsetLeft += dx;

        this.relativeOffsetTop = this.totalOffsetTop - Math.ceil(this.totalOffsetTop / this.gridSize)*this.gridSize;
        this.relativeOffsetLeft = this.totalOffsetLeft - Math.ceil(this.totalOffsetLeft / this.gridSize)*this.gridSize;
        
    },
    drawCellInGrid(r,c,color)
    {
        fill(color);
        rect(
            c*this.gridSize + this.totalOffsetLeft,
            r*this.gridSize + this.totalOffsetTop,
            this.gridSize
        );
    }
    
}
//Object.defineProperty(InfinityGrid,"singleton",
//     { writable: false, configurable: false});
//Object.preventExtensions(InfinityGrid);
//Object.freeze(InfinityGrid);
