class QuadTree
{
    static allowed_width   = 3;
    static allowed_hieght  = 3;

    constructor(data = [] , boundary = new bounds())
    {
       this.boundary = boundary; 


        this.divided  = false ;
        this.contained_data = data;

        this.contained_data.forEach( dot => this.insert( dot ) );
        
        this.up_left    = null;
        this.up_rigth   = null;
        this.down_left  = null;
        this.down_rigth = null;
    }
    insert( dot ){
        if (this.boundary.is_inside( dot )) 
        {
            this.contained_data.push(point);
            this.boundary.update_bounds( dot )();
        }

        if ( this.divided ) // insert dot to the corresponding division 
        {
            if ( this.up_left.boundary.is_inside    ( dot ) ) this.up_left.insert    ( dot );
            if ( this.up_rigth.boundary.is_inside   ( dot ) ) this.up_rigth.insert   ( dot );
            if ( this.down_left.boundary.is_inside  ( dot ) ) this.down_left.insert  ( dot );
            if ( this.down_rigth.boundary.is_inside ( dot ) ) this.down_rigth.insert ( dot );
        }
        if ( this.contained_data.length >= 2 && (
             this.boundary.width()  >= this.allowed_width ||
             this.boundary.height() >= this.allowed_hieght ) )
        {
            this.divide();
        }
    }
    divide ()
    {
        divisions = this.boundary. compute_divisions();

        this.up_left    = new QuadTree (this.contained_data , divisions [0] );
        this.up_rigth   = new QuadTree (this.contained_data , divisions [1] );
        this.down_left  = new QuadTree (this.contained_data , divisions [2] );
        this.down_rigth = new QuadTree (this.contained_data , divisions [3] );

        this.divided = true;
    }

    draw ()
    {
        if ( ! this.divided )
        {
            push()

            let color = color(0,255,0,);

                

            pop()
        }
    }
}
