define([
    'postmonger'
], function(
    Postmonger
) {
    'use strict';

    var connection = new Postmonger.Session();
    var payload = {};
    var lastStepEnabled = false;
    var steps = [ // initialize to the same value as what's set in config.json for consistency
        { "label": "Create SMS Message", "key": "step1" }
    ];
    var currentStep = steps[0].key;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    
    connection.on('clickedNext', onClickedNext);
    connection.on('clickedBack', onClickedBack);
    connection.on('gotoStep', onGotoStep);
   // connection.on('clickedNext', save);
    //connection.on('clickedBack', onClickedBack);
    //connection.on('gotoStep', onGotoStep);

    function onRender() {
        // JB will respond the first time 'ready' is called with 'initActivity'
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
    }

  function initialize(data) {
        console.log("Initializing data data: "+ JSON.stringify(data));
        if (data) {
            payload = data;
        }    

        var hasInArguments = Boolean(
            payload['arguments'] &&
            payload['arguments'].execute &&
            payload['arguments'].execute.inArguments &&
            payload['arguments'].execute.inArguments.length > 0
         );

        var inArguments = hasInArguments ? payload['arguments'].execute.inArguments : {};

        console.log('Has In arguments: '+JSON.stringify(inArguments));

        $.each(inArguments, function (index, inArgument) {
            $.each(inArgument, function (key, val) {
                if (key === 'accountSid') {
                                $('#accountSID').val(val);
                            }

                            if (key === 'messagingService') {
                                $('#messagingService').val(val);
                            }

                            if (key === 'ChannelId') {
                                $('#ChannelId').val(val);
                            }

                            if (key === 'authToken') {
                                $('#authToken').val(val);
                            }
                            if (key === 'body') {
                                $('#messageBody').val(val);
                            }  
            })
        });

        connection.trigger('updateButton', {
            button: 'next',
            text: 'Next',
            visible: true
        });

    }
    
    function onClickedNext () {
        var errorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please fill Account SID and Auth Token </h2> </div>';
        var checkboxerrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please select atleast one checkbox</h2> </div>';
        var recipienterrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Please select a recipient.</h2> </div>';
        var messageBodyerrorSlds = '<div class="slds-notify slds-notify_alert slds-theme_alert-texture slds-theme_error" role="alert"><span class="slds-assistive-text">error</span><span class="slds-icon_container slds-icon-utility-error slds-m-right_x-small" title="Description of icon when needed"><svg class="slds-icon slds-icon_x-small" aria-hidden="true"><use xlink:href="/assets/icons/utility-sprite/svg/symbols.svg#error"></use></svg></span><h2>Message body is empty.</h2></div>';

        if((currentStep.key) === 'step1')
        {
            
          var ChannelId = $('#ChannelId').val();
          var authToken = $('#authToken').val();
              
              if(!ChannelId || !authToken )
              { 
                document.getElementById("error").innerHTML= errorSlds;
                connection.trigger('prevStep');
              }
              else
              {
                document.getElementById("error").innerHTML= "";
                connection.trigger('nextStep');
              }

        }

    }

    function onGetTokens (tokens) {
        // Response: tokens = { token: <legacy token>, fuel2token: <fuel api token> }
        console.log("Tokens function: "+JSON.stringify(tokens));
        //authTokens = tokens;
    }

    function onGetEndpoints (endpoints) {
        // Response: endpoints = { restHost: <url> } i.e. "rest.s1.qa1.exacttarget.com"
        console.log("Get End Points function: "+JSON.stringify(endpoints));
    }

    function save() {
        var ChannelId = $('#ChannelId').val();
        var authToken = $('#authToken').val();
        var messagingService = $('#ddlViewBy').val();
        var body = $('#messageBody').val();

        payload['arguments'].execute.inArguments = [{
            "ChannelId": ChannelId,
            "authToken": authToken,
            "messagingService": messagingService,
            "body": body,
            "to": "{{Contact.Attribute.TwilioV1.TwilioNumber}}" //<----This should map to your data extension name and phone number column
        }];

        payload['metaData'].isConfigured = true;

        console.log("Payload on SAVE function: "+JSON.stringify(payload));
        connection.trigger('updateActivity', payload);

    }                    

});
