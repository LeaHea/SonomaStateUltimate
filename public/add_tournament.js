$(document).ready(function () {
    $('#addTournamentBtn').click( function(){
        var payload = {
            tname: $('#tname').val(),
            location: $('#location').val(),
            semester: $('#semester').val(),
            year: $('#year').val(),
            result: $('#result').val(),
        };
        $.ajax({
            url: $("#add_tournament_form").attr("action"),
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