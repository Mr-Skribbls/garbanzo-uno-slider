$(document).ready(function() {
    globals = {
        container : '#uno-container',
        image_folder : 'imgs',
        last_slide : null,
        before_last_slide : null,
        cycle_time : 3000,
        slide_speed : 500,
        random_slide : false,
        paused : false
    }
    
    img_arrays = {
        img_array : [],
        img_array_on : [],
        img_array_off : []
    }
    
    init();
    setInterval(function() {
        if( !globals.paused ) {
            switcher();
        }
    }, globals.cycle_time);
    
    $('#left_switch').on({
        click : function() {
            switcher('left');
        },
        mouseenter: function() {
            globals.paused = true;
        },
        mouseleave: function() {
            globals.paused = false;
        }
    });
    $('#right_switch').on({
        click : function() {
            switcher('right');
        },
        mouseenter: function() {
            globals.paused = true;
        },
        mouseleave: function() {
            globals.paused = false;
        }
    });
    
    function img_array_init() {
        populate_img_array();
        populate_img_array_on();
        populate_img_array_off();
        
        function populate_img_array() {
            // get images from container class
            $.each($(globals.container + ' img'), function() {
                img_arrays.img_array.push($(this).attr('src'));
            });
        }
        function populate_img_array_on() {
            if( globals.random_slide ) {
                var random = Math.floor(Math.random() * (img_arrays.img_array.length - 1));
                img_arrays.img_array_on.push(img_arrays.img_array[random]);
            }
            else {
                img_arrays.img_array_on.push(img_arrays.img_array[0]);
            }
        }
        function populate_img_array_off() {
            for( var i = 0; i < img_arrays.img_array.length; i++ ) {
                if( ($.inArray(img_arrays.img_array[i], img_arrays.img_array_on)) === -1 ) img_arrays.img_array_off.push(img_arrays.img_array[i]);
            }
        }
    }
    
    function init_html() {
        var slide_html = '';
        slide_html += '<div class="window">';
        slide_html += '    <div class="seesaw">';
//        slide_html += '        <div class="box">';
        slide_html += '            <div class="bg-img" style="background-image: url(\'' + img_arrays.img_array_on[0] + '\')"></div>';
//        slide_html += '        </div>';
        slide_html += '    </div>';
        slide_html += '</div>';
        
        $(globals.container).html(slide_html);
        $(globals.container).removeClass('hidden');
        $('.no-JS').addClass('hidden');
    }
    
    // build RegEx to filter image src
    function create_img_RegEx(folder) {
        folder = '(' + folder + '\/)(.*)(jpg|JPG|jpeg|gif|png)';
        img_RegEx = new RegExp(folder)
    }
    
    function switcher(direction) {
        var dir = direction || 'right';
        
        append_next_img(choose_next_img());
        slide();
        
        function choose_next_img() {
            if(globals.random_slide) {
                var random = Math.floor(Math.random() * (img_arrays.img_array_off.length - 1));

                while(random === globals.last_slide || random === globals.before_last_slide) {
                    random = Math.floor(Math.random() * 5);
                }
                globals.before_last_slide = globals.last_slide;
                globals.last_slide = random;

                var new_img = img_arrays.img_array_off.splice(random, 1);
                img_arrays.img_array_on.push(new_img[0]);
            }
            else {
                if( dir === 'right' ) {
                    var new_img = img_arrays.img_array_off.splice(0, 1);
                }
                else {
                    var new_img = img_arrays.img_array_off.splice(img_arrays.img_array_off.length - 1, 1);
                }
                img_arrays.img_array_on.push(new_img[0]);
            }
            return new_img;
        }
        
        function append_next_img(img) {
            var img_html = '';
//            img_html += '<div class="box">';
            img_html += '    <div class="bg-img" style="background-image: url(\'' + img[0] + '\');"></div>';
//            img_html += '</div>';
            $('.seesaw').append(img_html);
        }
        
        function slide() {
            $('.seesaw').animate({
                left: "-=100%",
            }, globals.slide_speed, function() {
                turn_off_old_img();
                reset();
            });
        }
        
        function turn_off_old_img() {
            var el_to_remove_img = $('.seesaw div').css('background-image').match(img_RegEx);
            
            // remove img from bg_array_on to bg_array_off
            img_arrays.img_array_on.splice(img_arrays.img_array_on.indexOf(el_to_remove_img[0]), 1);
            if( dir === 'right' ) {
                img_arrays.img_array_off.push(el_to_remove_img[0]);
            }
            else {
                img_arrays.img_array_off.unshift(el_to_remove_img[0]);
            }
            
            // remove img from html
            $.each($('.seesaw div'), function() {
                if( $(this).css('background-image').match(img_RegEx)[0] === el_to_remove_img[0] ) {
                    $(this).remove();
                }
            })
        }
        
        function reset() {
            $('.seesaw').css('left', '0px');
        }
        
    }
    
    function init() {
        img_array_init();
        init_html();
        create_img_RegEx(globals.image_folder);
    }
    

});


