/*
class linked_list_node


{
    constructor( value )
    {
        this.value = value;
        this.next = null;
        this.prev = null;
    }

}

class linked_list{
    constructor(comratator = function (v1,v2){return v1 == v2 ;}){
        this.size = 0;
        this.header = new linked_list_node ( null );
        this.trailer = new linked_list_node ( null );
        this.header.next = this.trailer;
        this.trailer.prev = this.header;

        this.comratator = comratator;
    }
    add_front ( value )
    {
        const new_node = new ListeningStateChangedEvent( value );
        new_node.next = this.trailer.next;
        new_node.prev = this.trailer;
        this.trailer.next.prev = new_node;
        this.trailer.next = new_node; 
    }
    add ( value , index )
    {
        if (value == null )return;
        const new_node = new linked_list_node( value );
        insert_afeter = this.trailer;
        while ( index > 0 ){ insert_afeter = insert_afeter.next; index --;}
        new_node.prev = insert_afeter;
        new_node.next = insert_afeter.next;
        insert_afeter.next.prev = new_node;
        insert_afeter.nexr = new_node;

    }
    contains (value)
    {
        let iterator = this.header.next;
        for (; iterator.value != null ; iterator = iterator.next)
        {
            if (this.comratator(iterator.value , value))return true;
        }
        return false;
    }
    get_node(value)
    {
        let iterator = this.header.next;
        for (; iterator.value != null ; iterator = iterator.next)
        {
            if (this.comratator(iterator.value , value))return true;
        }
        return false;
    }

    remove( value )
    {
        if ()
        
    }
    
}
*/
class bounds 
{
    constructor ( min_x = Number.POSITIVE_INFINITY,
                  max_x = Number.NEGATIVE_INFINITY,
                  min_y = Number.POSITIVE_INFINITY,
                  max_y = Number.NEGATIVE_INFINITY)
    {
        //NaN will be mapped to POSITIVE_INFINITY or NEGATIVE_INFINITY respectively

        min_x = isNaN ( min_x ) ? Number.NEGATIVE_INFINITY : min_x;
        max_x = isNaN ( max_x ) ? Number.POSITIVE_INFINITY : max_x;
        min_y = isNaN ( min_y ) ? Number.NEGATIVE_INFINITY : min_y;
        max_y = isNaN ( max_y ) ? Number.POSITIVE_INFINITY : max_y;

        this.min_x = min_x;
        this.min_y = min_y;
        this.max_x = max_x;
        this.max_y = max_y;

        this.horizontal_limit = NaN;
        this.vertical_limit   = NaN;

        this.update_horizontal_limit = function () { this.horizontal_limit = ( this.max_y + this.min_y) / 2; }
        this.update_vertical_limit   = function () { this.vertical_limit   = ( this.max_x + this.min_x) / 2; }

        this.width  = function () { return this.max_x - this.min_x;} // either a positive number or positive infinity
        this.height = function () { return this.max_y - this.min_y;} // either a positive number or positive infinity

    }
    update_bounds( dot ){
        
        if (dot.x > this.max_x) this.max_x = dot.x;
        if (dot.x < this.min_x) this.min_x = dot.x;
        if (dot.y > this.max_y) this.max_y = dot.y;
        if (dot.y < this.min_y) this.min_y = dot.y;

        this.update_horizontal_limit();
        this.update_vertical_limit  ();

        
    }
    is_inside ( dot )
    {
        return dot.x <= this.max_x && 
               dot.x >= this.min_x &&
               dot.y <= this.max_y &&
               dot.y >= this.min_x ;
    }
    
    compute_divisions ()
    {
        const up_left    = new bounds
        ( 
            this.min_x ,
            this.min_x + this.width() / 2 ,
            this.min_y + this.height() / 2 ,
            this.max_y 
        );
        const up_rigth   = new bounds
        (
            this.min_x + this.width() / 2 ,
            this.max_x,
            this.min_y + this.height() / 2 ,
            this.max_y 
        );

        const down_left  = new bounds
        (
            this.min_x ,
            this.min_x + this.width() / 2 ,
            this.min_y + this.height() / 2 ,
            this.min_x 
            
        );
        const down_rigth = new bounds
        (
            this.min_x + this.width() / 2 ,
            this.max_x,
            this.min_y + this.height() / 2 ,
            this.min_x 
        );
        return [ up_left , up_rigth, down_left , down_rigth ];
    }

}
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
