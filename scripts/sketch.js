//required to move in the canvas
let mouse_x_before_pressing;
let mouse_y_before_pressing;


function setup()
{
    ScreenManager.updateScreenData();
    createCanvas(ScreenManager.width , ScreenManager.height);

    GameOfLife.GameState.insert(20,21);
    GameOfLife.GameState.insert(20,22);
    GameOfLife.GameState.insert(20,23);

    frameRate (60);


}


function draw()
{
    clear();
    InfinityGrid.draw();
    GameOfLife.drawGameState();
    GameOfLife.steepGame();

}
//dealing with dragging 
function mousePressed()
{
    mouse_x_before_pressing = mouseX;
    mouse_y_before_pressing = mouseY;
}
function mouseDragged()
{

    const movement_x = mouse_x_before_pressing - mouseX;
    const movement_y = mouse_y_before_pressing - mouseY;
    
    InfinityGrid.translate(-movement_x,-movement_y);

    mouse_x_before_pressing = mouseX;
    mouse_y_before_pressing = mouseY;

}
