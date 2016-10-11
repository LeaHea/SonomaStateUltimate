$(document).ready(function () {
    $('#bossid').change( function(event){
        
        event.preventDefault();

        if($('#bossid').val() == "") {
            // the user selected the blank option, so hide the div and return
            $('#output').hide();
            return;
        }

        var payload = {
            bossid: $('#bossid').val()
        };

        console.log(payload);

        $.ajax({
            url: $("#boss_form").attr("action"),
            type: "POST",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(payload),
            complete: function(data) {
                console.log(data.responseText);
                $('#output').html(data.responseText);
                $('#output').show();
            }
        });
    });
});
