$(document).on("ready",function(e){
    
    resize();
    $(window).on("resize",function(e){
        resize();
    })
    /*
    $(".socialLinks a").on("click",function(e){
        e.preventDefault();
        var app = $(this).data("app")
        var link = $(this).attr("href")
        var url=""
        switch (app) {
            case 'facebook':
                // code
                url="fb://page/529480637197227"
                break;
            case 'twitter':
                // code
                url="twitter://user?screen_name=noumads"
                break;
            case 'instagram':
                // code
                url="instagram://user?username=noumads"
                break;
            
            default:
                url="#"
                // code
        }
        console.log(url)
        console.log(link)

        var now = new Date().valueOf();
        setTimeout(function () {
            if (new Date().valueOf() - now > 100) return;
            window.open(app,"'_blank");
        }, 700);
        
        window.open(app,"'_blank");
        

    });
    
    */
   
    
    $(".saveMail").on("click",function(e){
        e.preventDefault();
        var elinput = $(this).parents(".form-group").find("input.email")
        var elemail = $(this).parents(".form-group").find("input.email").val();

        $.ajax({
            url:"/api/sendmail",
            data:{email:elemail},
            type:"POST",
            success:function(data){
                console.log(data)
                if(data){
                    notificacionExito()
                }else{
                    notificacionError();
                }
                elinput.val("")
                
            },
            error:function(data){
                notificacionError();
            }
        })
    })
    function notificacionExito(){
        $.amaran({
            content:{
                bgcolor:'#27ae60',
                color:'#fff',
                message:'<h4>Genial!</h4><p>Hemos guardado tu correo.</p><p> Te informaremos en cuanto tengamos noticias </p>'
               },
            theme:'colorful',
            inEffect:'slideBottom',
            outEffect:'slideTop',
            delay:6000
        });

    }
    function notificacionError(){
        $.amaran({
            content:{
                bgcolor:'#D82222',
                color:'#fff',
                message:'<h4>Houston!</h4><p>No hemos podido guardar tu correo. </p><p>Intenta más tarde, o contáctanos en nuestras redes sociales</p>'
               },
            theme:'colorful',
            inEffect:'slideBottom',
            outEffect:'slideTop',
            delay:6000
        });
    }
    
    function resize(){
        console.log("resizing")
        var mayor = 0
        var extras = 0;
        $.each($(".landing"),function(k,v){
            var paddingBottom = parseInt($(v).css("margin-bottom").substring(0,$(v).css("margin-bottom").length-2))
            var paddingTop = parseInt($(v).css("margin-top").substring(0,$(v).css("margin-top").length-2))
            var laAlturaTotal = $(".vertical-align").height() + paddingBottom + paddingTop; 
            if(laAlturaTotal>mayor){
                mayor=laAlturaTotal;
                extras = paddingTop + paddingBottom;
            }
        })
        
        
        console.log($("#notcarrousel").height())
        console.log(mayor+extras)
        
        
        
        if($("#notcarrousel").height() < mayor+extras){
            $("#notcarrousel").height(mayor+extras+50)    
        }
        
    }
});

