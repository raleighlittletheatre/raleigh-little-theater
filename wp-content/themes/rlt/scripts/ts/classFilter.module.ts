import 'chosen';

export class ClassFilter {

    constructor(){

        let ctrl = this;

        let query = ctrl.parseURI();

        ctrl.updateOptions( query );

        $('.filter select').change( function(){
            ctrl.checkConditionals( '.filter select[name="age-group"]' );
            let selected = ctrl.buildFilterObject();
            ctrl.filterList( selected );
        });


        
        $('select').chosen({disable_search_threshold: 10});


    }

    parseURI(){
        let href = window.location.href;
        let props = href.split('?')[1].split('&');
        let propObject = {};
        for( let i = 0; i < props.length; i++ ){
            let keyValProp = props[i].split('=');
            propObject[keyValProp[0]] = keyValProp[1];
        }
        return propObject;
    }

    updateOptions( propsObj : Object ){

        $.each( propsObj , function(key,val){
            $('[name="' + key + '"]').val([val]).trigger('chosen:updated');
        });


        this.checkConditionals('.filter select[name="age-group"]');
        this.filterList( this.buildFilterObject() );
        

    }

    buildFilterObject(){

        let selected : Object = {};
        
        $('.filter').find('option:selected').each( function(){
            let parent = $(this).closest('select').attr('name');
            if( selected[parent] == undefined ){
                selected[parent] = [];
            }
            selected[parent].push($(this).val());
        });

        console.log( selected );

        return selected;
    }

    filterList(selected : Object ){

        $('.class-listing').each( function(){

            let listing = $(this);

            let locations = true;
            let ageGroup = true;
            let types = true;
            let ages = true;


            $.each( selected, function(key,val){
            
                if( key == 'locations' ){
                    if( val != 'all' ){
                        locations = checkLocation( listing, val);
                    }else{
                        locations = true;
                    }
                }
            
                if( key == 'age-group' ){
                    if( val != 'all' ){
                        ageGroup = checkAgeGroup( listing, val );
                    }else{
                        ageGroup = true;
                    }
                }
            
                if( key == 'types' ){
                    if( val != 'all' ){
                        types = checkTypes( listing, val );
                    }else{
                        types = true;
                    }
                }
            
                if( ( key == 'kids' ) ||( key == 'teens' ) ){
                    if( val != '' ){
                        ages = checkAges( listing, val );
                    }else{
                        ages = true;
                    }
                }
            });

            if( ( ageGroup && locations && ages && types ) != true ){
                $(this).hide();
            }else{
                $(this).show();
            }
        });

        $('.no-listing-msg').remove();

        if( $('.class-listing').length == $('.class-listing[style="display: none;"]').length ){
            $('.page-content').append('<h3 class="no-listing-msg color-bloom-red">No courses match your criteria. Please try another combination of filters.</h3>');
        }

        function checkLocation( object: JQuery, location : string ){
            if( location == object.attr('data-locations') ){
                return true;
            }
            return false;
        }

        function checkTypes( object: JQuery, types: string ){
            if( types == object.attr('data-types') ) {
                return true;
            }
            return false;
        }

        function checkAgeGroup( object: JQuery, ageGroup: string){
            if( object.attr('data-age-group').includes( ageGroup ) ) {
                return true;
            }
            return false;
        }

        function checkAges( object: JQuery, ages: string ){
            if( object.attr('data-ages').includes( ages ) ){
                return true;
            }
            return false;
        }
    }

    checkConditionals( ctrl: string ): void{
        let value = $(ctrl).val();
        let that = this;
        $('.conditional').each( function(){ 
            if( $(this).attr('name') == value ){
                $(this).addClass('is-visible').next('.chosen-container').css('width', '14em');
                $(this).prev('label').addClass('is-visible');
            }else{
                $(this).removeClass('is-visible');
                $(this).prev('label').removeClass('is-visible');
                $(this).val([]).trigger('chosen:updated');
               
            }
        });
        
    }

}