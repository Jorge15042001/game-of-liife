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
            noFill();
            rect(c*this.gridSize,r*this.gridSize,this.gridSize);
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
