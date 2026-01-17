// Hien thi button
$( function() {
    $( "#datepicker" ).datepicker({
        showOn: "button",
        buttonImage: "img/calendar-icon.png",
        buttonImageOnly: true,
        buttonText: "Select date",
        dateFormat: "mm/dd/yy"

    });
} );