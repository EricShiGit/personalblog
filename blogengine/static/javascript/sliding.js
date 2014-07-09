$(document).ready(function()
{

    //for navbar
    $(".sidebar .active a").append('&nbsp;&nbsp;<span class="uit-icon icon-arrow-down-circled" aria-hidden="true"></span>');    
    //TODO: add a common event-handler
    // Color changer buttons
    $(".colorpurple").unbind("click").bind("click", function(){ changeColor("purple");  return false;   });
    $(".colorgreen").unbind("click").bind("click", function(){  changeColor("green");   return false;   });
    $(".colorgrey").unbind("click").bind("click", function(){   changeColor("grey");    return false;   });
    
    // grey, green, or purple
    function changeColor(color) {
        // set URL depending on environment and param
        var url = (window.ENV == "DEV" ? "css/" : "//cdn.tsl.telus.com/libs/telus-jquery-ui/1.9.2/css/") + color;

        // point to CDN and minified files if in PRODUCTION
        if(window.ENV == "DEV") {
            // overwrite path to the stylesheets according to chosen theme
            $("link[href$='jquery-ui-1.9.2.custom.css']").attr("href", url + "/jquery-ui-1.9.2.custom.css");
            $("link[href$='uit-jqueryui-custom.css']").attr("href", url + "/uit-jqueryui-custom.css");
        } else {
            $("link[href$='jquery-ui.min.css']").attr("href", url + "/jquery-ui.min.css");
            $("link[href$='uit-jqueryui-custom.min.css']").attr("href", url + "/uit-jqueryui-custom.min.css");
        }

        // overwrite path to correctly-themed stylesheets within code sample
        $("pre:first code").html($("pre:first code").html().replace(/green/g, color).replace(/grey/g, color).replace(/purple/g, color));
    }

    /**
    * Event handler for main feedback button. When clicked it toggles the feedback form down/up.
    */
    $("#feedback_button").unbind("click").bind("click", function(e){
        e.preventDefault();
        $('.feedbk-cont').slideToggle("fast");
        $("#feedback").toggleClass("uit-open");
    });

    /**
    * Event handler for feedback closing button. When clicked it closes the feedback form.
    */
    $("#feedback .feedbk-btn-close").unbind("click").bind("click", function(e){

        $('.feedbk-cont').slideToggle("fast");
        $("#feedback").toggleClass("uit-open");

        // TODO: assess whether need same behaviour as clicking feedback btn again
        //$("#feedbk_clr_btn").click();
    });

    /**
    * Event handler for button that triggers sending feedback to user's email client. 
    * When clicked it collates feedback entered into the form and passes it using href contents and mailto attribute.
    */
    $("#feedbk_send_btn").unbind("click").bind("click", function(e){
        var _this = this;

        //ignore if disabled
        if($(_this).hasClass("disabled")) {
            return false;
        }

        //TODO: use uit-modified class!
        var question_text = $("#feedbk_question textarea.feedbk-input").val();
        if(question_text.length) {
            question_text = '%23 Question %0D' + encodeURIComponent(question_text) + '%0D%0A%0A';
        }

        var idea_text = $("#feedbk_idea textarea.feedbk-input").val();
        if(idea_text.length) {
            idea_text = '%23 Idea %0D' + encodeURIComponent(idea_text) + '%0D%0A%0A';
        }

        var bug_text = $("#feedbk_bug textarea.feedbk-input").val();
        if(bug_text.length) {
            bug_text = '%23 Bug %0D' + encodeURIComponent(bug_text)  + '%0D%0A%0A';
        }

        var kudos_text = $("#feedbk_kudos textarea.feedbk-input").val();
        if(kudos_text.length) {
            kudos_text = '%23 Kudos %0D' + encodeURIComponent(kudos_text)  + '%0D%0A%0A';
        }

        var body = '&body=' + question_text + idea_text + bug_text + kudos_text;

        var href = $(_this).attr('href');
        href += body;
        $(_this).attr('href', href);

        //TODO: check if needing event bubbling or pause/go mechanism
    });

    /**
    * Event handler for button that clears all entered feedback and resets feedback content to feedback splash.
    */
    $("#feedbk_clr_btn").unbind("click").bind("click", function(e){
        // clear all inputs
        $("#feedback textarea.feedbk-input").val("");
        // reset modified class
        $("#feedback .nav-pills li.uit-modified").removeClass("uit-modified");
        
        // deselect any tab
        $("#feedback .tab-content > .tab-pane.active, #feedback .nav-pills li.active").removeClass("active");

        // show intro info
        $("#feedback .tab-content > .tab-pane:first-child").addClass("active");

        //disable send button
        $("#feedbk_send_btn").addClass("disabled");
    });

    /**
    * Event handler for textareas which adds classes to indicate modified feedback portions.
    */
    $("#feedback textarea.feedbk-input").off("keyup").on("keyup", function(e) {
        var $input = $(e.target);
        var $tab = $("#feedback .nav-pills li.active");
        var $send_btn = $("#feedbk_send_btn");
        
        // if editing first time 
        if( $input.val().length > 0 && !( $input.hasClass("uit-modified") ) ) {
            // add class
            $input.addClass("uit-modified");
            // add edited icon
            $tab.addClass("uit-modified");
            // enable send button
            $send_btn.removeClass("disabled");
        }

        //TODO: review if needed
        // if first time editing
        if( $input.val().length > 0 && $input.hasClass("uit-modified") ) {
            //add edited icon
            $tab.addClass("uit-modified");
            // enable send button
            $send_btn.removeClass("disabled");
        }

        //if was modified and now empty
        if( $input.val().length == 0 && $input.hasClass("uit-modified") ) {
            //remove class
            $input.add($tab).removeClass("uit-modified");
            // if all other feedback sections are empty
            if($("#feedback .nav-pills li.uit-modified").length == 0 )
            {
                // disable send button
                $send_btn.addClass("disabled");
            }
        }
    });

    /**
    * Generic keypress event handler.
    * Currently handles:
    *   - Escape key ("27") closes feedback form
    *
    // TODO: assess whether should support keypresses
    $(document).unbind("keyup").bind("keyup", function(e) {
        if (e.keyCode == 27) { // esc
            // test if feedback is visible
            if( $('#feedback').hasClass("uit-open") ) {
                // hide feedback component
                $("#feedback .feedbk-btn-close").click();
            } 
        }
        // add more keypresses as wanted
    });
    */

});