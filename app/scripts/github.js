function github(options) {

  var options = {
    useLoader: options.useLoader || true,
    loader: options.loader || '[data-js="loader"]',
    output: options.output || '[data-js="repo--output"]',
    data_type: options.data_type || "repos",
    profile_type: options.profile_type || "orgs",
    name: options.name,
    failedText: options.failedText || 'Unable to fetch repos from Github.',
    template: options.template || '<article class="repo">'+
                                        '<hgroup>'+
                                          '<h3><a href="{html_url}">{name}</a></h3>'+
                                        '</hgroup>'+
                                        '<div class="repo--description">'+
                                          '<p>{description}</p>'+
                                        '</div>'+
                                      '</article>',
    resp: options.response || false
    }

var loader = document.querySelector(options.loader), // The loader element
        output = document.querySelector(options.output); // the output area

    // loading a new Ajax Request
    var xml = new XMLHttpRequest();
    
    // opening a connection
    xml.open('GET','https://api.github.com/'+ options.profile_type+'/'+options.name+'/'+ options.data_type, true);
    


    // when the state changed (data received )
    xml.onreadystatechange = function() {
      // waiting until the response is ready
      if (xml.status==200 && xml.readyState==4){
          // removing the loader after we got the repos
          if(!options.useLoader) {
            output.removeChild(loader);
          }
        // we take the response
        var res = xml.responseText;
        document.getElementById(options.resp).innerHTML=res;
        var data = JSON.parse(res);


        // template for featured Project (latest)
        var template = options.template;


        // going through all the received data; reversed because they come oldest to newest
        for(var i = data.length - 1; i >= 0; i--) {
          // asigning var obj to the current repo we're dealing with
          var obj = data[i];


            // replacing the placeholder, e.g. {tilte} with data from the JSON
            var layout = template.replace(/\{(.*?)\}/g, function(match, property) {
              return obj[property];
            });

          // inserting the layout into the output var
          // output.innerHTML += layout;
        } // end of the for loop

    } else {
      // if Github doesn't respond or there's something wrong, loader div
        if(!options.useLoader) {
          // loader.innerHTML = options.failedText;
        } 
    }
  } // end of onreadystatechange

    // sending data
    xml.send();
}