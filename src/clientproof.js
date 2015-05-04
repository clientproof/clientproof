/**
 * Created with JetBrains PhpStorm.
 * User: SebG
 * Date: 12/06/14
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */


/*******
 *
 *
 *  TO DO'S:
 *      1 - Implement Security Level like 0 = not intrusive, 1 = low intrusive and 2 = intrusive
 *          securityLevel Default = 1
 *
 *      2 - Implement Override Popup with Show / Not Show
 *      3 - Implement a connection to a socket to register all user activity on site
 *      4 - Create a dashboard to see stats and set ClientProof
 *      5 - Write code and explain javascript inside example page.
 *      6 - Merge to example together and put in clientproof.github.io
 *
 *      7 - Fishish the presentation of clientproof in github.
 *
 *
 */



(function ($) {

    /* Global Call */
    ClientProof = function (options) {

        var settings = $.extend( ClientProof.defaultOptions, options );
        var triggerAlert = false;
        this.securityLevel = settings.securityLevel;
        this.className = settings.className;
        this.hPos = settings.hPos;
        this.customMessage = settings.customMessage;
        this.activatePopup = settings.activatePopup;
        this.language = settings.language;

        if($('form').length > 0){
            $('form input').filter(':first').before('<div class="cb"></div><div class="'+((settings.className)?settings.className:'defaultClientProofButton')+'">Vider le formulaire</div><div class="cb"></div>');
            $('form input').filter(':last').after('<div class="cb"></div><div class="'+((settings.className)?settings.className:'defaultClientProofButton')+'">Vider le formulaire</div><div class="cb"></div>');
        }

        LockPageLinks(settings);
        InitBrowserEvents(settings);
    };

    ClientProof.prototype = {
        Connect: function () {
            // TO DO: Creer une connection a un socket sur un serveur distant et enregistrer toute les activiter de l'utilisateur en cour.
        }
    };


    ClientProof.defaultOptions = {
        securityLevel: 1,
        className: '',
        hPos: 'right',
        customMessage: 'Action in a form was detected. You must save or reset the form before proceeding.',
        activatePopup: true,
        language: 'en'
    };



    /* Attach To Jquery Selector Call */
    $.fn.clientProof = function( options ) {
        // This is the easiest way to have default options.
        var settings = $.extend( {
            securityLevel: 1,
            className: '',
            hPos: 'right',
            customMessage: 'Action in a form was detected. You must save or reset the form before proceeding.',
            activatePopup: true,
            language: 'en'
        }, options );

        if($(this).length > 0){
            $('input', this).filter(':first').before('<div class="cb"></div><div class="'+((settings.className)?settings.className:'defaultClientProofButton')+'">Vider le formulaire</div><div class="cb"></div>');
            $('input', this).filter(':last').after('<div class="cb"></div><div class="'+((settings.className)?settings.className:'defaultClientProofButton')+'">Vider le formulaire</div><div class="cb"></div>');
        }

        LockPageLinks(settings);
        InitBrowserEvents(settings);

    };



    function LockPageLinks(settings){
        $.each( $('a'), function( key, value) {
            $(this).click(function(e){
                var triggerAlert = false;
                $(":text, :file, :checkbox, select, textarea").each(function() {
                    if($(this).val() !== ""){
                        triggerAlert = true;
                    }
                });
                if(triggerAlert){
                    e.preventDefault();
                }

                // TO DO: Load Boostrap Modal window with customMessage in it
                //$(this).text('bla');
                $('#modalClientProof').modal('show');
                $('.modal-body').html('<p>'+settings.customMessage+'</p>');

            });
        });
    }

    function InitBrowserEvents(settings){
        /* Handle Click on Back Button And Reload Page */
        jQuery(document).ready(function($) {

            /* Reset Form Event */
            $('.defaultClientProofButton '+((settings.className)?', .'+settings.className:'')).click(function(){
                $('input').not('input[type=submit]').val('');
            });

            /* Place Button Left or Right */
            if($('.defaultClientProofButton').length > 0 || $('.'+settings.className).length > 0){
                if(settings.className){
                    $('.'+settings.className).css('float', settings.hPos);
                }else{
                    $('.defaultClientProofButton').css('float', settings.hPos);
                }
            }

            /* Back Button Event */
            if (window.history && window.history.pushState) {
                $(window).on('popstate', function() {
                    var hashLocation = location.hash;
                    var hashSplit = hashLocation.split("#!/");
                    var hashName = hashSplit[1];

                    if (hashName !== '') {
                        var hash = window.location.hash;
                        if (hash === '') {
                            var triggerAlert = false;
                            $(":text, :file, :checkbox, select, textarea").each(function() {
                                if($(this).val() !== ""){
                                    triggerAlert = true;
                                }
                            });
                            if(triggerAlert){
                                $('#modalClientProof').modal('show');
                                $('.modal-body').html('<p>'+settings.customMessage+'</p>');
                            }
                        }
                    }
                });
                window.history.pushState('forward', null);
            }

            /* Refresh Page Event */
            window.onbeforeunload = function (evt) {
                var triggerAlert = false;
                $(":text, :file, :checkbox, select, textarea").each(function() {
                    if($(this).val() !== ""){
                        triggerAlert = true;
                    }
                });
                if(triggerAlert){
                    var message = settings.customMessage;
                    if (typeof evt == 'undefined') {
                        evt = window.event;
                    }
                    if (evt) {
                        evt.returnValue = message;
                    }
                    return message;
                }
            }
        });
    }

}(jQuery));
