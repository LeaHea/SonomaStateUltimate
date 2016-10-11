$(document).ready(function () {
    $('#usau_number').change( function(event){
        
        event.preventDefault();

        if($('#usau_number').val() == "") {
            // the user selected the blank option, so hide the div and return
            $('#output').hide();
            return;
        }

        var payload = {
            usau_number: $('#usau_number').val()
        };

        console.log(payload);

        $.ajax({
            url: $("#player_form").attr("action"),
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
