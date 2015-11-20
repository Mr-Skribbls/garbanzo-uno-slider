$(document).ready(function() {
    globals = {
        container : '#uno-container',
        image_folder : 'imgs',
        last_slide : null,
        before_last_slide : null,
        cycle_time : 3000,
        slide_speed : 500,
        random_slide : false,
        cycle_paused : false,
        slide_paused : false
    }
    
    img_arrays = {
        img_array : []
    }
    
    init();
    var slider_loop = setInterval(function() {
        if( !globals.slide_paused ) {
            switcher('right');
        }
    }, globals.cycle_time);
    
    $('#left_switch').on({
        click : function() {
            switcher('left');
        },
        mouseover : function() {
            globals.slide_paused = true;
        },
        mouseleave : function() {
            globals.slide_paused = false;
        }
    });
    $('#right_switch').on({
        click : function() {
            switcher('right');
        },
        mouseover : function() {
            globals.slide_paused = true;
        },
        mouseleave : function() {
            globals.slide_paused = false;
        }
    });
    $('.window').on({
        mouseover : function() {
            globals.slide_paused = true;
        },
        mouseout : function() {
            globals.slide_paused = false;
        }
    })
    
    function img_array_init() {
        populate_img_array();
        
        function populate_img_array() {
            // get images from container class
            $.each($(globals.container + ' img'), function() {
                img_arrays.img_array.push($(this).attr('src'));
            });
        }
    }
    
    function init_html() {
        var right_chev = '';
        right_chev += '<svg id="chevron-right" class="custom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" style="height:100%;width:100%;">';
	    right_chev += '    <path class="inner-shape" style="opacity:1;fill:#fff;" transform="translate(25,25) scale(0.5)" d="M46.169,0H3.363l50.464,50.001L3.363,100h42.806l50.468-49.999L46.169,0z"></path>';
        right_chev += '</svg>';
        
        var left_chev = '';
        left_chev += '<svg id="chevron-left" class="custom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" style="height:100%;width:100%;">';
        left_chev += '    <path class="inner-shape" style="opacity:1;fill:#fff;" transform="translate(25,25) scale(0.5)" d="M3.363,50.001L53.831,100h42.806L46.173,50.001L96.637,0H53.831L3.363,50.001z"></path>';
        left_chev += '</svg>';
        
        var right_directional = '';
        right_directional += '<svg id="direction-east" class="custom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" style="height:100%;width:100%;">';
        right_directional += '    <path class="inner-shape" style="opacity:1;fill:#fff;" transform="translate(25,25) scale(0.5)" d="M1.523,83.995L98.477,50L1.523,16.005C12.846,26.898,18.51,38.667,18.51,51.318C18.51,63.089,12.846,73.982,1.523,83.995z "></path>';
        right_directional += '</svg>';

        var left_directional = '';
        left_directional += '<svg id="direction-west" class="custom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" style="height:100%;width:100%;">';
        left_directional += '    <path class="inner-shape" style="opacity:1;fill:#fff;" transform="translate(25,25) scale(0.5)" d="M81.49,48.682c0-11.772,5.664-22.664,16.987-32.678L1.523,50l96.955,33.995C87.154,73.102,81.49,61.333,81.49,48.682z"></path>';
        left_directional += '</svg>';

        var right_round = '';
        right_round += '<svg id="round-right" class="custom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" style="height:100%;width:100%;">';
        right_round += '    <path class="inner-shape" style="opacity:1;fill:#fff;" transform="translate(25,25) scale(0.5)" d="M93.467,37.751L60.302,4.75C57.287,1.586,53.855,0,50,0c-4.02,0-7.538,1.543-10.553,4.625 C36.432,7.711,34.925,11.167,34.925,15c0,3.836,1.508,7.25,4.522,10.25l10.302,10.25H14.573c-4.522,0-8.205,1.5-11.055,4.5 C1.174,42.668,0,46,0,50s1.174,7.336,3.518,9.999c2.85,3,6.533,4.5,11.055,4.5h35.176L39.447,74.75 c-3.015,3-4.522,6.418-4.522,10.25c0,3.836,1.508,7.293,4.522,10.375C42.462,98.461,45.98,100,50,100 c3.855,0,7.286-1.582,10.302-4.75l33.165-33.001c4.358-2.832,6.533-6.915,6.533-12.25C100,44.67,97.825,40.587,93.467,37.751z"></path>';
        right_round += '</svg>';

        var left_round = '';
        left_round += '<svg id="round-left" class="custom-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 100 100" style="height:100%;width:100%;">';
        left_round += '    <path class="inner-shape" style="opacity:1;fill:#fff;" transform="translate(25,25) scale(0.5)" d="M96.482,40.001c-2.85-3-6.533-4.5-11.055-4.5H50.251l10.302-10.25c3.015-3,4.522-6.414,4.522-10.25 c0-3.833-1.508-7.289-4.522-10.375C57.538,1.543,54.019,0.001,50,0.001c-3.855,0-7.286,1.586-10.302,4.75L6.533,37.75 C2.175,40.586,0,44.668,0,50c0,5.335,2.175,9.418,6.533,12.25l33.165,33c3.015,3.168,6.446,4.75,10.302,4.75 c4.02,0,7.538-1.54,10.553-4.625c3.015-3.082,4.522-6.539,4.522-10.375c0-3.833-1.508-7.25-4.522-10.25L50.251,64.5h35.176 c4.522,0,8.205-1.5,11.055-4.5c2.343-2.664,3.518-6,3.518-9.999S98.826,42.668,96.482,40.001z"></path>';
        left_round += '</svg>';
        
        var slide_html = '';
        slide_html += '<div class="window">';
        slide_html += '    <div class="seesaw">';
        slide_html += '        <div class="bg-img" style="background-image: url(\'' + img_arrays.img_array[0] + '\')"></div>';
        slide_html += '    </div>';
        slide_html += '    <div id="left_switch" class="switch">';
        slide_html += left_chev;
        slide_html += '    </div>';
        slide_html += '    <div id="right_switch" class="switch">';
        slide_html += right_chev;
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
        if ( !globals.cycle_paused ) {
            var dir = direction || 'right';
            var old_index = find_current_img_index();
            var new_index = get_next_img_index();
            append_next_img();
            slide();
        }
        
        function find_current_img_index() {
            var old = $('.seesaw div').css('background-image').match(img_RegEx)[0];
            var index = img_arrays.img_array.indexOf(old);
            return index;
        }
        
        function get_next_img_index() {
            if( dir === 'right' ) {
                if ( old_index === (img_arrays.img_array.length - 1)) {
                    var next_index = 0;
                }
                else {
                    var next_index = old_index + 1;
                }
            }
            else {
                if ( old_index === 0 ) {
                    var next_index = img_arrays.img_array.length - 1;
                }
                else {
                    var next_index = old_index - 1;
                }
            }
            return next_index;
        }
        
        function append_next_img() {
            var img_html = '<div class="bg-img" style="background-image: url(\'' + img_arrays.img_array[new_index] + '\');"></div>';
            if( dir === 'right' ) {
                $('.seesaw').append(img_html);
            }
            else {
                var old_img_html = $('.seesaw').html();
                $('.seesaw').html(img_html + old_img_html);
            }
        }
        
        function setup_for_left_slide() {
            $('.seesaw').css('left', '-100%');
        }
        
        function turn_off_old_img() {
            // remove img from html
            $.each($('.seesaw div'), function() {
                if( $(this).css('background-image').match(img_RegEx)[0] === img_arrays.img_array[old_index] ) {
                    $(this).remove();
                }
            })
        }
        
        function reset() {
            $('.seesaw').css('left', '0px');
        }
        
        function slide() {
            globals.cycle_paused = true;
            if( dir === 'right' ) {
                $('.seesaw').animate({
                    left: "-=100%"
                }, globals.slide_speed, function() {
                    turn_off_old_img();
                    reset();
                    globals.cycle_paused = false;
                });
            }
            else {
                setup_for_left_slide();
                $('.seesaw').animate({
                    left: "+=100%"
                }, globals.slide_speed, function() {
                    turn_off_old_img();
                    reset();
                    globals.cycle_paused = false;
                });
            }
        }
        
    }
    
    function init() {
        img_array_init();
        init_html();
        create_img_RegEx(globals.image_folder);
    }
    

});


