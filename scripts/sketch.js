let get_width = function (){return document.documentElement.clientWidth;}
let get_height = function (){return document.documentElement.clientHeight;}

var line_border = 1 ;
var grid_size = 30;

const rows = get_height() / grid_size;
const cols = get_width() / grid_size;

//manage tranlation around the canvas 
var x_translation = 0;
var y_translation = 0;

//required to move in the canvas
var mouse_x_before_pressing;
var mouse_y_before_pressing;


class Cell
{
    constructor (x , y)
    {
        this.x = x;
        this.y = y;
    }
}
class game_of_life
{
    constructor(active_cells =[])
    {
        this.active_cells=active_cells;
    }
    


    draw()
    {
        console.log(this.active_cells);
        for (var i =0; i<this.active_cells.length; i ++)
        {
            const  cell=this.active_cells[i];
            push();
                fill(color(255,0,0));
                noStroke();
                rect(cell.x*grid_size + x_translation , cell.y*grid_size + y_translation , grid_size , grid_size);
                //console.log("pinting " , cell , cell.x , cell.y , i) ;
            pop();
        }
    }

}
var cells = [new Cell(5,5), new Cell(20,16)];
var gl = new game_of_life(cells);

function draw_grid()
{
    const start_x = x_translation  - Math.floor( x_translation / grid_size + 1) * grid_size; //  the closet
    const start_y = y_translation  - Math.floor( y_translation / grid_size + 1) * grid_size; //  the closet
    for (var square_x = start_x; square_x < get_width(); square_x += grid_size)
    {
        for ( var square_y = start_y; square_y < get_height(); square_y += grid_size)
        {
            rect(square_x,square_y,grid_size,grid_size);
        }
    }
}

function setup()
{
    const width = get_width();
    const height = get_height();
    createCanvas(width , height);

    //manage windows resize 
    addEventListener("resize", ()=>
        {
            resizeCanvas(get_width() , get_height() ); 
            clear();
        });
    


}


function draw()
{
    clear();
    draw_grid();
    gl.draw();

}
 
function mousePressed()
{
    mouse_x_before_pressing = mouseX;
    mouse_y_before_pressing = mouseY;
}
function mouseDragged()
{
    const movement_x = mouse_x_before_pressing - mouseX;
    const movement_y = mouse_y_before_pressing - mouseY;
    
    x_translation -= movement_x;
    y_translation -= movement_y;

    mouse_x_before_pressing = mouseX;
    mouse_y_before_pressing = mouseY;

}
