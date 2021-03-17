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
    is_touching(other_cell)
    {
        const manhattan_distance_x = Math.abs ( this.x - other_cell.x );
        const manhattan_distance_y = Math.abs ( this.y - other_cell.y );
        //console.log( "distance: " , manhattan_distance_x , manhattan_distance_y );
        if ( manhattan_distance_x > 1 || manhattan_distance_y >1 ) return false;
        if ( manhattan_distance_x === 1 && manhattan_distance_y === 1) return true;
        if ( manhattan_distance_x !== manhattan_distance_y ) return true;
        return false;
    }
    cell_up         () { return new Cell( this.x     , this.y - 1 ); }
    cell_down       () { return new Cell( this.x     , this.y + 1 ); }
    cell_left       () { return new Cell( this.x - 1 , this.y     ); }
    cell_right      () { return new Cell( this.x + 1 , this.y     ); }
    cell_up_right   () { return new Cell( this.x + 1 , this.y - 1 ); }
    cell_down_right () { return new Cell( this.x + 1 , this.y + 1 ); }
    cell_up_left    () { return new Cell( this.x - 1 , this.y - 1 ); }
    cell_down_left  () { return new Cell( this.x - 1 , this.y + 1 ); }
    
}

function not_contains( cell , set )
{
    for ( var other_cell of set )
    {
        if ( other_cell.x === cell.x && other_cell.y === cell.x )return false;
    }
    return true;
}
class game_of_life
{
    constructor(active_cells =[])
    {
        this.active_cells=active_cells;
    }
    count_alive_neighbors(cell)
    {
        var neighbors_count = 0;
        for (let other_cell of this.active_cells)
        {
            //console.log( "comaring ", cell.x , cell.y, other_cell.x , other_cell.y , cell.is_touching(other_cell) );
            if (cell.is_touching(other_cell))neighbors_count++;

        }
        return neighbors_count;
    }
    cell_survive( cell , alive = true)
    {
        const alive_neigghbors = this.count_alive_neighbors(cell);
        //if ( alive_neigghbors < 2 );// dies as if by under population
        if ( ( alive_neigghbors === 2 || alive_neigghbors === 3 ) && alive)
        {
            //console.log( "logging survive: " , cell.x , cell.y , true , alive_neigghbors);
            return true; 
        }
        if ( alive_neigghbors === 3 && !alive ) 
        {
            //console.log( "logging survive: " , cell.x , cell.y , true , alive_neigghbors);
            return true;
        }
        //if ( alive_neigghbors > 3); //dies 
    
        //console.log( "logging survive: " , cell.x , cell.y , false , alive_neigghbors);
        return false;
    }

    game_iteration()
    {
        const new_active_cells = new Set (); 
        console.log("start length" , this.active_cells.size);
        for (let cell of this.active_cells)
        {
            //console.log( "checking ", cell.x , cell.y );
            if ( this.cell_survive( cell ) )new_active_cells.add( cell );
            //
            // asumption that need to be verified
            // a dead cell that will become a live is always at a distance 1 from a live cell
            // therefore a live 
            let checking_cell = cell.cell_up();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_down();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_left();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_right();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_up_right();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_up_left();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_down_right();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

            checking_cell = cell.cell_down_left();
            if ( not_contains( checking_cell , new_active_cells) && this.cell_survive( checking_cell , false ))  new_active_cells.add( checking_cell );

        }
        this.active_cells = new_active_cells ;
        console.log("end length" , this.active_cells.size);
    }
    


    draw()
    {
        push();
        fill(color(255,0,0));
        noStroke();
        for (let cell of this.active_cells)
        {
            rect(cell.x*grid_size + x_translation , cell.y*grid_size + y_translation , grid_size , grid_size);
                //console.log("pinting " , cell , cell.x , cell.y , i) ;
        }
        pop();
    }

}
//var cells = new Set( [ new Cell( 3 , 3 ) , new Cell( 3 , 2 ) , new Cell( 3 , 1 ) ]);
var cells = new Set( [ new Cell( 3 , 3 ) , new Cell( 2 , 3 ) , new Cell( 1 , 3 ) ]);
var gl = new game_of_life(cells);

function draw_grid()
{
    const start_x = x_translation  - Math.floor( x_translation / grid_size + 1) * grid_size; //  the closet
    const start_y = y_translation  - Math.floor( y_translation / grid_size + 1) * grid_size; //  the closet
    push();
    noFill();
    for (var square_x = start_x; square_x < get_width(); square_x += grid_size)
    {
        for ( var square_y = start_y; square_y < get_height(); square_y += grid_size)
        {
            rect(square_x,square_y,grid_size,grid_size);
        }
    }
    pop();
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

    //setInterval (()=>{gl.game_iteration();} ,500);
    


}


function draw()
{
    clear();
    gl.draw();
    draw_grid();

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
