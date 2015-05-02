/**
 * Created with JetBrains PhpStorm.
 * User: SebG
 * Date: 12/06/14
 * Time: 10:43 AM
 * To change this template use File | Settings | File Templates.
 */


(function ($) {
    ClientProof = function (options) {

        var settings = $.extend( ClientProof.defaultOptions, options );

        this.securityLevel = settings.securityLevel;
        this.className = settings.className;
        this.hPos = settings.hPos;
        this.customMessage = settings.customMessage;
        this.activatePopup = settings.activatePopup;

        if($('form').length > 0){
            $('form input').filter(':first').before('<div class="cb"></div><div class="'+((settings.className)?settings.className:'defaultClientProofButton')+'">Vider le formulaire</div><div class="cb"></div>');
            $('form input').filter(':last').after('<div class="cb"></div><div class="'+((settings.className)?settings.className:'defaultClientProofButton')+'">Vider le formulaire</div><div class="cb"></div>');
        }
        if($('.defaultClientProofButton').length > 0 || $('.'+settings.className).length > 0){
            $('.defaultClientProofButton '+((settings.className)?', .'+settings.className:'')).css('float', settings.hPos);
        }

        $('.defaultClientProofButton '+((settings.className)?', .'+settings.className:'')).click(function(){
            $('input').not('input[type=submit]').val('');
        });

        $.each( $('a'), function( key, value) {
            $(this).click(function(e){
                if($('input').val() != ''){
                    e.preventDefault();
                }

                // TO DO: Load Boostrap Modal window with customMessage in it
                $(this).text('bla');
            });
        });
    };

    ClientProof.prototype = {
        Load: function () {
            if($('form').length > 0){
                $('form').filter(':last').prepend('<div >');
            }
        }
    };

    $.fn.clientProof = function( options ) {
        // This is the easiest way to have default options.
        var settings = $.extend( {
            securityLevel: 1,
            className: '',
            hPos: 'right',
            customMessage: 'Une action dans un formulaire a été détecté. Vous devez enregistrer ou vider le formulaire avant de continuer.',
            activatePopup: true
        }, options );

        // Greenify the collection based on the settings variable.
        return this.prepend('<div >'+settings.customMessage+'</div>');

    };

    ClientProof.defaultOptions = {
        securityLevel: 1,
        className: '',
        hPos: 'right',
        customMessage: 'Une action dans un formulaire a été détecté. Vous devez enregistrer ou vider le formulaire avant de continuer.',
        activatePopup: true
    };

}(jQuery));
