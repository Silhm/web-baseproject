/*
 * 
 * Utils part
 * 
 * 
 * */
 
 
/* Util function to do the same as serializeArray, but generate an Object
*/
 $.fn.serializeObject = function(){
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};


var hasOwnProperty = Object.prototype.hasOwnProperty;
 
function is_empty(obj) {
 
    // null and undefined are empty
    if (obj == null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
 
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key))    return false;
    }
 
    return true;
}


/* Util function to display error (no waaay?)
* @error : the error text to display
*/
function error_display(error){
    console.error(error);
    $('.error-return').html('<div class="alert alert-danger">'+error+'</div>').fadeIn();
}


/* Util function to reset a modal window
* @modal_id : id of the modal
* It will empty the form and remove all error informations of the modal
*/
function modal_reset(modal_id){
    $(modal_id).modal('hide');
    $(modal_id+' form')[0].reset();
    $(modal_id+' form .form-group').removeClass('has-error');
    $(modal_id+' .error-return').hide();
}


/* Util function to display a success notification
* @title : title
* @content : text
*/
function success(title, content){
    $.pnotify({
        title: title,
        text: content,
        cornerclass: 'ui-pnotify-sharp',
        type: "success",
        history: false,
        addclass: "custom-notify",
    });   
}


function dateFromApi(dateapi){
    var timestamp = Date.parse(dateapi);
    var date = new Date(timestamp);
    return date;
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}


/* Console */
// Create object that will be used for 'silhm' namespace if it doesn't already exist.  
if( silhm === undefined ) {  
    var silhm = {};  
}  
  
// Create an object with functions that mimic the window.console object made  
// available by tools like Firebug or the "Dev Tools" add-on in IE8+  
silhm.dummyConsole = {  
    assert : function(){},  
    log : function(){},  
    warn : function(){},  
    error : function(){},  
    debug : function(){},  
    dir : function(){},  
    info : function(){}  
};  
  
// Default: console disabled
silhm.console = silhm.dummyConsole;  
  
// This function can be used to switch the silhm.console variable to use the  
// real window.console object. Note that it does a safety check to ensure that  
// window.console actually exists (it won't in browsers not running Firebug or  
// the IE dev tools).  
silhm.enableConsoleOutput = function(enable) {  
    // Don't enable the console unless it actually exists  
    if (enable && window.console !== undefined) {  
        silhm.console = window.console;  
        console.info('Debug mode Enabled!');
    } else {  
        silhm.console = silhm.dummyConsole;  
        disclaimer = "";
        disclaimer += "*******************************************\n";
        disclaimer += "*Welcome  \n";
        disclaimer += "\n*  ==>  mail@simon-florentin.fr\n";
        disclaimer += "*******************************************\n";
        console.info(disclaimer);
    }  
};  

// function to check if element exists
jQuery.fn.exists = function(){return this.length>0;}
