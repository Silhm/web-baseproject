/*
 * Wizard tool for IDServer
 * https://www.idserver.eu/
 */

//Overlays modal
$('#change_avatar').parent().on('hide.bs.modal', function () {
    $('.wizard-dialog').parent().css('z-index', 1040); })

$('#change_avatar').on('show.bs.modal', function () {
    $('.wizard-dialog').parent().css('z-index', 1030); })
    
    function wizard_load(){
        var wizard = $('#wizard-confbox').wizard({submitUrl: "/ui/firstlogin/"});
        
        var validated_cards = [];
        wizard.show();

        $('.organisation-name, .organisation-siret, .organisation-public').hide();
        $('#id_organisation_structure').on('change',function(){
            ids.console.log($(this).find(':selected').text());
            if($(this).val() != 3){
                $('.organisation-name, .organisation-siret, .organisation-public').fadeIn();
            }
            else{
                $('.organisation-name, .organisation-siret, .organisation-public').fadeOut();
            }
        });

        // Not the first login anymore!
        wizard.on('submit',function(){
            wizard.hide();
            $.post("/ui/firstlogin/");
            
            success("Bienvenue!", "Vous pouvez dès à présent utiliser votre espace "+SITE_NAME);
            
        });

// *** Steps management

        //password creation
        if( 'password-creation' in wizard.cards ){
            ids.console.log(wizard.cards['password-creation']);
            wizard.cards['password-creation'].on("validate", function(card){
                //pass next button clicked : check the password form');
                var passwordData = $('#password-creation-form').serializeObject();
               
                passwordData['fieldToEdit'] = 'password';
               
                if( validated_cards.indexOf('password-creation') < 0 ){
                    $.ajax({
                        url: "/ui/wizard/",
                        method: "POST",
                        data: passwordData,
                        success: function(data){
                            if(data.errors){
                                wizard.decrementCard();
                                wizard.updateProgressBar(25);
                                wizard.cards['organisation-creation'].unmarkVisited()
                                $('.error-password').html("Vous devez choisir un mot de passe et le retaper pour le verifier").fadeIn();
                            }
                            else{
                                validated_cards.push('password-creation');
                            }
                        },
                        error: function(jqXHR, textStatus){
                            wizard.decrementCard();
                            wizard.updateProgressBar(25);
                            wizard.cards['organisation-creation'].unmarkVisited()
                            $('.error-password').html("Vous devez choisir un mot de passe et le retaper pour le verifier").fadeIn();
                        }
                    });
                }
            });
        }

        //organisation creation
        if('organisation-creation' in wizard.cards){
            wizard.cards['organisation-creation'].on("validate", function(card){
                var organisationData = $('#organisation-creation-form').serializeObject();
                organisationData['fieldToEdit'] = 'organisation';
                
                if( validated_cards.indexOf('organisation-creation') < 0 ){
                    $.ajax({
                        url: "/ui/wizard/",
                        method: "POST",
                        data: organisationData,
                        success: function(data){
                            if(data.errors){
                                //wizard.decrementCard();
                                //wizard.updateProgressBar(50);
                                ids.console.log('success: error');
                                //wizard.cards['organisation-creation'].unmarkVisited()
                                //$('.error-password').html("Vous devez choisir un mot de passe et le retaper pour le verifier").fadeIn();
                            }
                            else{
                                $('#organisation-creation-form').html('<div class="alert alert-success">Vous possédez déjà une organisation</div> ');
                                validated_cards.push('organisation-creation');
                            }
                        },
                        error: function(jqXHR, textStatus){
                            ids.console.log('error');
                            //wizard.decrementCard();
                            //wizard.updateProgressBar(50);
                            //wizard.cards['organisation-creation'].unmarkVisited()
                            //$('.error-password').html("Vous devez choisir un mot de passe et le retaper pour le verifier").fadeIn();
                        }
                    });
                }
            });
        }


    }
