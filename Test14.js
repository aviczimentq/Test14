$("#myUL").html(localStorage.getItem('content'));

$(document).ready(function () {

  $("li").append($("<span>").addClass("close").append("\u00D7"));

  $(".close").click(function () {
    $(this).parent().remove();
  });

  $("li").click(function () {
    $(this).toggleClass("checked");
  });

  $(".addBtn").click(function () {
    var inputValue = $(myInput).val();
    var li = $("<li>").append(inputValue);

    if (inputValue === '') {
      alert("You must write something!");
    } else {
      $("#myUL").append(li);
      $("#myInput").val("");
      li.append($("<span>").addClass("close").append("\u00D7"));
    };

    li.click(function () {
      $(this).toggleClass("checked");
    });

    $(".close").click(function () {
      $(this).parent().remove();
    });
  });
  window.addEventListener("beforeunload", function () {
    localStorage.setItem('content', $("#myUL").html());
  });
});