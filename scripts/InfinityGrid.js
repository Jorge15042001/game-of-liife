let InfinityGrid =
{
    top : 0,
    left : 0,
    gridSize : 30,
    lineBorder :1,
    rows : 0,
    cols : 0,

    draw : function ()
    {
        const rows = ScreenManager.height/this.gridSize;
        const cols = ScreenManager.width/this.gridSize;

        for (let r = 0; r< rows;r ++) for (let c = 0; c< cols; c++)
        {
            const y_offset = this.top - Math.ceil(this.top / this.gridSize)*this.gridSize;
            const x_offset = this.left - Math.ceil(this.left / this.gridSize)*this.gridSize;
            noFill();
            rect(
                c*this.gridSize + x_offset,
                r*this.gridSize + y_offset,
                this.gridSize);
        }
    },
    translate : function (dx ,dy)
    {
        this.top += dy;
        this.left += dx;
    },
    
}
//Object.defineProperty(InfinityGrid,"singleton",
//     { writable: false, configurable: false});
//Object.preventExtensions(InfinityGrid);
//Object.freeze(InfinityGrid);
