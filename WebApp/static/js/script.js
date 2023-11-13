var button = document.getElementById('menu_button');
var linea_sopra = document.getElementById('linea_sopra');
var linea_mezzo = document.getElementById('linea_mezzo');
var linea_sotto = document.getElementById('linea_sotto');
var menu_container = document.getElementById('menu_container');
var contenuto = document.getElementById('contenuto');
var menu_list = document.getElementById('menu_list_container');
var contatore = document.getElementById('contatore');
var pagine = document.getElementsByClassName('pagine');
var menu_home = document.getElementById('menu_home');
var menu_opzioni = document.getElementById('menu_opzioni');
var menu_account = document.getElementById('menu_account');
var menu_info = document.getElementById('menu_info');
var home_container = document.getElementById('home_container');
var profile_container = document.getElementById('profile_container'); profile_container.style.display = "none";
var info_container = document.getElementById('info_container'); info_container.style.display = "none";
var setting_container = document.getElementById('setting_container'); setting_container.style.display = "none";

var contenitore = document.getElementById('contenitore');
button.addEventListener('click', function () {
    linea_sopra.classList.toggle('button_active_sopra');
    linea_sotto.classList.toggle('button_active_sotto');
    linea_mezzo.classList.toggle('button_active_mezzo');
    contenuto.classList.toggle('menu_active');
    
    var altezzacont = (contenuto.getBoundingClientRect().y) + "px";
    console.log(altezzacont);
    




    if (menu_list.classList != "menu_active_list") {
        setTimeout(function () { menu_list.classList.toggle('menu_active_list') }, 300);
    } else {
        setTimeout(function () { menu_list.classList.toggle('menu_active_list') }, 0);
    }
})

var home = document.getElementsByClassName("menu_component");
var ind = document.getElementById("indicatore");
var indv = document.getElementById("indicatore_vert");
ind.style.width = home[0].getBoundingClientRect().width + "px";
indv.style.height = home[0].getBoundingClientRect().height - 2 + "px";
console.log(home[0].getBoundingClientRect.height);
var a = document.getElementById("menu_component_container");
ind.style.left = (home[0].getBoundingClientRect().x - a.getBoundingClientRect().x) + "px";
indv.style.top = (home[0].getBoundingClientRect().y - a.getBoundingClientRect().y) + "px";
a.addEventListener('click', function (e) {
   
    if (e.target.tagName == 'DIV') {
        return;
    } else {
        setTimeout(function(){
            function myFunction(x) {
                if (x.matches) { // If media query matches
                  contenuto.classList.toggle('menu_active');
                  linea_sopra.classList.toggle('button_active_sopra');
                  linea_sotto.classList.toggle('button_active_sotto');
                  linea_mezzo.classList.toggle('button_active_mezzo');
                  if (menu_list.classList != "menu_active_list") {
                    setTimeout(function () { menu_list.classList.toggle('menu_active_list') }, 300);
                } else {
                    setTimeout(function () { menu_list.classList.toggle('menu_active_list') }, 0);
                }
                }
              }
              
              var x = window.matchMedia("(max-width: 449px)")
              myFunction(x) // Call listener function at run time
              x.addListener(myFunction);
    },500);

        ind.style.left = (e.target.getBoundingClientRect().x - a.getBoundingClientRect().x) + "px";
        ind.style.width = e.target.getBoundingClientRect().width + "px";

        indv.style.top = (e.target.getBoundingClientRect().y - a.getBoundingClientRect().y) + "px";
        indv.style.height = (e.target.getBoundingClientRect().height) - 2 + "px";
        
        switch(e.target.getAttribute('data-page')){
           case 'home':
            profile_container.style.opacity=0;
            setting_container.style.opacity=0;
            info_container.style.opacity=0;
            setTimeout(function(){profile_container.style.display = "none";
                                  setting_container.style.display = "none";
                                  info_container.style.display = "none";}, 500);
                                 
            setTimeout(function(){home_container.style.display = "flex";}, 510); 
            setTimeout(function(){home_container.style.opacity=1;}, 550);
            break;

            case 'opzioni':
            profile_container.style.opacity=0;
            home_container.style.opacity=0;
            info_container.style.opacity=0;
            setTimeout(function(){profile_container.style.display = "none";
                                  home_container.style.display = "none";
                                  info_container.style.display = "none";}, 500);

            setTimeout(function(){setting_container.style.display = "flex";}, 510); 
            setTimeout(function(){setting_container.style.opacity=1;}, 550);
            break;

            case 'account':
            home_container.style.opacity=0;
            setting_container.style.opacity=0;
            info_container.style.opacity=0;
            setTimeout(function(){home_container.style.display = "none";
                                  setting_container.style.display = "none";
                                  info_container.style.display = "none";}, 500);

            setTimeout(function(){profile_container.style.display = "flex";}, 510); 
            setTimeout(function(){profile_container.style.opacity=1;}, 550);
            break;

            case 'info':
            profile_container.style.opacity=0;
            setting_container.style.opacity=0;
            home_container.style.opacity=0;
            setTimeout(function(){profile_container.style.display = "none";
                                  setting_container.style.display = "none";
                                  home_container.style.display = "none";}, 500);
                              
            setTimeout(function(){info_container.style.display = "flex";}, 510); 
            setTimeout(function(){info_container.style.opacity=1;}, 550);
            break;
        }
        
        
    }

})

/* gaugemeter */
var litri = "{{ litri }}";
contatore.dataset.text = litri;
percent = (litri / 150) * 100;

$(document).ready(function () {
    // Initialize GaugeMeter plugin
    $(".GaugeMeter").gaugeMeter();

    // Bind new handler to init and update gauges.
    ko.bindingHandlers.gaugeValue = {
        init: function (element, valueAccessor) {
            $(element).gaugeMeter({ percent: ko.unwrap(valueAccessor()) });

        },
        update: function (element, valueAccessor) {
            $(element).gaugeMeter({ percent: ko.unwrap(valueAccessor()) });

        }


    };

    // Create view model with inital gauge value 15mph
    // Use observable for easy update.
    var myViewModel = {
        Percent: ko.observable(0)
    };
    ko.applyBindings(myViewModel);
}); 