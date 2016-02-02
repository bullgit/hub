window.addEventListener('DOMContentLoaded', function(){
 var interval = setInterval(function() {
  // Check when the document.readyState is complete
  if(document.readyState === 'complete')   {
    // Clear the interval
    clearInterval(interval);
   

  }
}, 100)

})