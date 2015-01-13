$(document).on("ready",function(e){
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
});

