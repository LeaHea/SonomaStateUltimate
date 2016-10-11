$(document).ready(function () {
    $('#tournamentid').change( function(event){
        
        event.preventDefault();

        if($('#tournamentid').val() == "") {
            // the user selected the blank option, so hide the div and return
            $('#output').hide();
            return;
        }

        var payload = {
            tournamentid: $('#tournamentid').val()
        };

        console.log(payload);

        $.ajax({
            url: $("#tournament_form").attr("action"),
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
