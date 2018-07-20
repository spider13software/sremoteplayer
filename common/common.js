$(function () {
  $("a.ajax-button").click(function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.ajax({
      "url": url,
      "dataType": "json",
      "success": function (data) {
      }
    });
  });
  $("a.ajax-volume-button").click(function (event) {
    event.preventDefault();
    var url = $(this).attr("href");
    $.ajax({
      "url": url,
      "dataType": "json",
      "success": function (data) {
        $("#volume").html(data.volume);
      }
    });
  });
});

$(function () {
  $.ajax({
    "url": "/init",
    "dataType": "json",
    "success": function (data) {
      $("#volume").html(data.volume);
    }
  });
});