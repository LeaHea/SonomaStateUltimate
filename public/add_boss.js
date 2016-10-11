$(document).ready(function () {
    $('#addBossBtn').click( function(){
        var payload = {
            usau_number: $('#usau_number').val(),
            title: $('#title').val(),
        };
        $.ajax({
            url: $("#add_boss_form").attr("action"),
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