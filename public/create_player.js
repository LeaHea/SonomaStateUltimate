$(document).ready(function () {
    $('#createPlayerBtn').click( function(){
        var payload = {
            usau_number: $('#usau_number').val(),
            name: $('#name').val(),
            nickname: $('#nickname').val(),
            year: $('#year').val(),
        };
        $.ajax({
            url: $("#create_player_form").attr("action"),
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