if (localStorage.getItem('content3') !== "0") {

  $("#myUL").html(localStorage.getItem('content'));
  $("#sortable1").html(localStorage.getItem('content1'));
  $("#sortable2").html(localStorage.getItem('content2'));
}

$(document).ready(function () {

  add();
  number()
  function add() {
    var date = new Date();
    var n = date.toLocaleDateString();
    $("li").not(":has('span')").append($("<now>").addClass("daton").html("Date Created:"+ n +
     "<br>" + "Due Date: <input type='text' class='datepicker' class='picker' size='6'> "));
    $("li").not(":has('span')").append($("<span>").addClass("close").append("\u00D7"));
    $(".close").click(function () {
      $(this).parent().remove()
      number()
    });
  };
//.append("<input type='text'>")
  function number() {
    $("li").not(":has('number')").each(function () {
      $(this).prepend($("<number>"))
    });

    $("#sortable0 number").each(function (index) {
      $(this).text(index + ") ");
    })
    $("#sortable1 number").each(function (index) {
      $(this).text(index + ") ");
    })
    $("#sortable2 number").each(function (index) {
      $(this).text(index + ") ");
    })
  };

  $(".addBtn").on("click", function () {
    var inputValue = $(myInput).val();

    if (inputValue === '') {
      alert("You must write something!");
    } else {
      press()
    }
  });

  $("body").keypress(function (event) {
    var inputValue = $(myInput).val();

    if ((event.keyCode === 13) && (inputValue !== "")) {
      press()
    }
  })

  function press() {
    var inputValue = $(myInput).val();
    var li = $("<li>").append(inputValue);

    $("#myUL").append(li);
    $("#myInput").val("");
    number()
    add();

  };

  $("img").click(function () {
    $("li").fadeOut(500, function () {
      $(this).remove()
    });
  })


  window.addEventListener("beforeunload", function () {
    localStorage.setItem('content', $("#sortable0").html());
    localStorage.setItem('content1', $("#sortable1").html());
    localStorage.setItem('content2', $("#sortable2").html());
    localStorage.setItem('content3', $("li").length);

  });

  $("#sortable0, #sortable2, #myUL, #sortable1").sortable({
    connectWith: ".connectedSortable",
    stop: function () {
      number()
    },
  }).disableSelection();

  $( function() {
    $( ".datepicker" ).datepicker({
      showOn: "button",
      buttonImage: "../Images/calendar.png",
      buttonImageOnly: true,
    });
  } );

// color() 
// function color() { 

// // var w = $("li").css("background-color").
// // $("h2").html(w);
// //   ;

//  $("input:nth-child(odd)").css("background-color", "#eee");
// $("input:nth-child(even)").css("background-color", "#f9f9f9");

// }

});


