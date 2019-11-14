$(document).ready(function () {

  var loc = localStorage.getItem('Storage4');

  if ((loc !== null) && (loc !== "0")) {

    $("li").remove();
    var arr1 = JSON.parse(localStorage.getItem("Storage1"));
    var arr2 = JSON.parse(localStorage.getItem("Storage2"));
    var arr3 = JSON.parse(localStorage.getItem("Storage3"));

    arr1.forEach(function (element) {
      sortable($("#sortable0"), element)
    });

    arr2.forEach(function (element) {
      sortable($("#sortable1"), element)
    });

    arr3.forEach(function (element) {
      sortable($("#sortable2"), element)
    });

    function sortable(param, element) {
      $(param).append($("<li>").append("<text>" + element.A).append("<now>" + element.B).append("<due>" + element.c));
    };
  };

  add();
  color()
  number();
  calendar();

  function add() {
    var date = new Date();
    var n = date.toLocaleDateString();
    li = $("li");
    li.not(":has('now')").append($("<now>").html("Date Created:" + n));
    li.not(":has('due')").append($("<due>").html("<br> Due Date: <input class='datepicker' size='7'> "));
    li.not(":has('span')").append($("<span>").addClass("close").append("\u00D7"));
    $(".close").click(function () {
      $(this).parent().remove()
      number()
    });
  };
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
    press(inputValue);
  });

  $("body").keypress(function (event) {
    var inputValue = $(myInput).val();

    if ((event.keyCode === 13) && (inputValue !== "")) {
      press(inputValue)
    }
  })

  function press(inputValue) {
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      $("#sortable0").append($("<li>").append("<text>" + inputValue));
      $("#myInput").val("");
      add();
      number()
      calendar()
      color()
    }
  };

  $(".image").click(function () {
    $("li").fadeOut(500, function () {
      $(this).remove()
    })
  });

  $("#sortable0, #sortable1,  #sortable2").sortable({
    connectWith: ".connectedSortable",
    stop: function () {
      number()
    },
  }).disableSelection();

  function calendar() {
    $(".datepicker").datepicker({
      showOn: "button",
      buttonImage: "../Images/calendar.png",
      buttonImageOnly: true,
    });
  };
  function color() {
    $(".datepicker").each(function () {
      var a = $(this).parent().css("background-color");
      $(this).css("background-color", a);
    });
  }
  window.addEventListener("beforeunload", function () {

    var arr1 = [];
    var arr2 = [];
    var arr3 = [];

    $("#sortable0 li").each(function () {
      simple($(this), arr1)
    });

    $("#sortable1 li").each(function () {
      simple($(this), arr2)
    });

    $("#sortable2 li").each(function () {
      simple($(this), arr3)
    })

    function simple(param, arr) {
      var duedate = param.find("input").datepicker({ dateFormat: 'dd,MM,yyyy' }).val();;
      if (duedate === undefined) {
        var push = "<br>" + param.find("due").text();
      } else if (duedate.length == 0) {
        var push = "<br> Due Date: <input class='datepicker' size='7'>";
      } else {
        var push = "<br>" + "Due date: " + duedate + "&emsp;" + "&emsp;";
      }

      arr.push(AA = {
        A: param.find("text").text(),
        B: param.find("now").text(),
        c: push
      });
      
    }

    localStorage.setItem("Storage1", JSON.stringify(arr1));
    localStorage.setItem('Storage2', JSON.stringify(arr2));
    localStorage.setItem('Storage3', JSON.stringify(arr3));
    localStorage.setItem('Storage4', $("li").length);

  });
});
