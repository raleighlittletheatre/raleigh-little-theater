export class Bulletin {

    feedHeight: number;
    containerHeight: number;

    constructor(){
        this.setHeight();
        let ctrl = this; // set context to a variable
        $(window).on('resize', function(){
            ctrl.setHeight(); // using context variable in place of "this"
        });
    }

    // function to get heights of selectors
    getHeight( selector: JQuery ){
        return selector.outerHeight();
    }

    // function to test + set heights dynamically
    setHeight(){

        if( $(window).width() < 800 ){
            $('.bulletin, .bulletin > .feed').css('height', '');
            return false;
        }

        $('.bulletin, .bulletin *').css('height', '');

        // check heights of objects and set variables
        this.feedHeight = this.getHeight( $('.bulletin .feed') );
        this.containerHeight = this.getHeight( $('.bulletin') );

        if( this.feedHeight > this.containerHeight ){

            // if feedheight is larger than the container, adjust container size to fit
            $('.bulletin').css({
                'height': this.feedHeight + 64,
            });
            
        }else{

            // else if container is larger, expand feed to fit
            $('.bulletin > .feed').css('height', ( this.containerHeight ) );
            $('.bulletin').css({
                'height': this.containerHeight + 64,
            });

        }
        
    }

}