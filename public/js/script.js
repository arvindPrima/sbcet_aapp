var str = "The value oF varIAbe C is ";
var c;
var a = 2;
var b = 3;
console.log(a + b);
console.log(str);
if (c == undefined) {
  console.log("c is undefined");
}
console.log(c);

//comments
//this is a comment line
/*
 this is a multiline comment 
this is another line 
*/

//String functions
var len = str.length;
console.log(str.length);

//Get char
console.log(str.at(-1));
console.log(str[len - 1]);

//Uppercase
//lovercase

console.log(str.toUpperCase());
console.log(str.toLowerCase());

//Sub string
console.log(str.substring(11));

//concat
console.log(str + "------------------ " + str);
console.log(`${str}------------------ ${a + b}`);
console.log(`${a}${b}`);

//Trim

console.log(str.trim());

//operators
console.log(a % b);

//assignment

a **= b;
console.log(a);

//comparison
a = 2;
b = 2;
console.log(a == b);
console.log(a === b);
console.log(a != b);

//logical operator

console.log(!a);

//ternary operator
if (title) {
  var title = title;
} else {
  title = "no title";
}
var title = title || "no title";

//switch

switch (title) {
  case undefined:
    title = title;
    break;
  default:
    title = "no title";
}
console.log(title);

//Iteration
//for
var arr = [1, 2, 3];
for (var i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

//objects

var user = {
  usernmae: "arvind007",
  password: "arvind007",
};

var userProfile = {
  name: "Arvind",
  gender: "male",
  degree: ["bca", "mca"],
  "degree years": ["2009", "2014"],
  specialization: {
    fullstack: ["php", "mysql", "html", "css"],
    backend: ["Elasticsearch"],
  },
};

console.log(userProfile.specialization.fullstack[1]);
console.log(userProfile["name"]);
userProfile.age = 50;
userProfile["specialization"].frontend = ["react", "angular"];
console.log(userProfile);
userProfile.age = 40;
console.log(Object.values(userProfile));
console.clear();
//Loop through object
var objKeys = Object.keys(userProfile);
console.log(objKeys);
for (let i = 0; i < objKeys.length; i++) {
  console.log(userProfile[objKeys[i]]);
}

//Array

var arr = [
  1,
  3,
  6,
  "orange",
  "fruits",
  true,
  false,
  userProfile,
  ["sfdf", "asdfd"],
];

console.log(arr[7]);
console.log(arr[8]);

arr[7] = "something";
console.log(arr);

delete arr[7];
console.log(arr);

//pop, push, shift, unshift

//foreach
var narr = [1, 4, 5, 2, 3, 4, 7, 8, 9, 5, 6, 10];
console.clear();

var tablenumb = 56;
var newArray = narr.forEach(function (item) {
  return item ** 2;
});
console.log(newArray);
var newArray1 = narr.map(function (item) {
  return item * tablenumb;
});
console.log(newArray1);

//short

console.log(narr.sort());

//filter array

var newArr = narr.filter(function (item) {
  return item > 5;
});
console.log(newArr);

//try catch

try {
  var a = "something";
  a.filtera(function () {
    return false;
  });
} catch (error) {
  console.log("soemthing is wrong in try");
  //console.log(error);
}

//DOM manipulation

var btn = document.getElementById("add-new-card");

function addCard() {
  var cards = document.getElementById("cards");
  cards.innerHTML += `
    <div class="card">
      <img src="img/logol.jpg" />
      <h3>Product title</h3>
      <p>Product description hereProduct description here</p>
      <div class="card-footer">
        <span class="card-price">Rs 10.00</span>
        <span class="card-price">
          <a class="btn-cart" href="/add-to-cart">Add to cart</a>
        </span>
      </div>
    </div>`;
}

function addPadding() {
  var card = document.getElementsByClassName("card");
  for (let i = 0; i < card.length; i++) {
    card[i].style.padding = "10px";
    card[i].style.width = "400px";
  }
}

addPadding();

var j = 1;
function mousemove() {
  console.log(j);
  j++;
}

function search(val) {
  console.log(val);
}

function callAjaxReqFetch() {
  var ajax = fetch("https://fakestoreapi.com/products");
  ajax.then(function (res) {
    res.json().then(function (body) {
      console.log(body);
      renderCards(body);
    });
    console.log(res);
  });
}
function callAjaxReqjQuery() {
  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "get",
    success: function (response) {
      console.log(response);
      renderCards(response);
    },
    error: function (err) {
      console.log(err);
    },
  });
}

function callAjaxReq() {
  var srchStr = $("#inpt-search").val();
  $("#loader").css("display", "flex");
  var ajax = new XMLHttpRequest();
  ajax.open("get", "http://localhost:3006/get-products?search=" + srchStr);
  ajax.onload = function () {
    var data = JSON.parse(ajax.responseText);
    renderCards(data);

    $("#loader").css("display", "none");
  };
  ajax.send();
}

function renderCards(data) {
  console.log("response data", data);
  var cards = $("#cards");
  cards.html("");
  if (!data.length) {
    console.log("no product found");
    cards.html("<h1>No product found</h1>");
  }
  data.forEach(function (item) {
    console.log(item.title);
    if (item.description.length > 197) {
      var desc = item.description.substring(0, 97) + "...";
    } else {
      var desc = item.description;
    }
    var imgPath;
    if (item.product_image) {
      imgPath = "/uploads/" + item.product_image;
    }
    cards.append(`
            <div class="card m-3" style="width: 18rem;">
              <img class="" src="${
                imgPath || "/img/no_product.png"
              }" alt="${item.product_name}">
              <div class="card-body">
                <h5 class="card-title">${item.product_name.substring(
                  0,
                  20
                )}</h5>
                <p class="card-text">${desc}</p>
                
              </div>
              <div class="card-footer px-3">
                <span class="card-price">Rs ${item.price}</span>
                <a href="/view-product?id=${item.id}" class="btn btn-primary">
                  view product
                </a>
                <a href="#" class="btn btn-warning">
                  <i class="fa fa-cart-shopping"></i>
                </a>
              </div>
            </div>`);
  });
}

function validateForm() {
  ///validatre

  if (/*validation sucuss*/ true) {
  } else {
    //show all form validation erros
    return false;
  }
}

$(document).ready(function () {
  ///rest code would be here
  console.log($("form").html());

  $("#category").before("<li>Common</li>");

  $(document).on("click", ".card", function () {
    console.log("clicked on dynamic content triggered");
  });

  $(document).on("mouseenter", ".card", function () {
    //$(this).css("box-shadow", "0px 0px 9px 4px #ccc");
  });
  $(document).on("mouseout", ".card", function () {
    //$(this).css("box-shadow", "");
  });
  $(".card").click(function () {
    console.log("card click event triggered");
  });

  $("#inpt-search").click(function () {
    console.log("inpu tsearch event triggered");
  });

  $("#inpt-search").keyup(function () {
    console.log("value triggereed");
    if ($(this).val() == "") {
      //$(".autocomplete").slideUp();
    } else {
      //$(".autocomplete").slideDown();
    }
  });

  callAjaxReq();
});
