/* Called when the user pushes the "submit" button */
/* Sends a request to the API using the JSONp protocol */

function changeBigTitle(){
	document.getElementById("bigTitle").className = "changeBigTitle";
}

var lastSearch = {string: " "};
var lastTitle = "Title";
var lastAuthor = "Author";
var lastISBN = "000-0-00-000000-0";


function doSearch() {
	count.Value = 0;
	
	var author = document.getElementById("byAuthor").value;
	author = author.trim();
	author = author.replace(" ","+");
	if (author.length != 0){
		
		lastAuthor = author;
	}
	var title = document.getElementById("byTitle").value;
	title = title.trim();
	title = title.replace(" ","+");
	if (title.length != 0){
		lastTitle = title;
	}
	var isbn = document.getElementById("byISBN").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");
	if (isbn.length != 0){
		
		lastISBN = isbn;
	}
	// Connects possible query parts with pluses
	var query = ["",author,title,isbn].reduce(fancyJoin);
	// The JSONp part.  Query is executed by appending a request for a new
	// Javascript library to the DOM.  It's URL is the URL for the query. 
	// The library returned just calls the callback function we specify, with
	// the JSON data we want as an argument. 
	if (query != "" /*&& lastSearch.string != query*/) {
		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback	
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);	
		if(document.getElementById("body")){
			document.getElementById("body").id = "changeBody";
		}
		document.getElementById("overlay").style.display = "flex";
		document.getElementById("header").style.display = "none";
		document.getElementById("anotherHeader").style.display = "flex";
		document.getElementById("rightarrow").style.display = "initial";
	}
	
	
	lastSearch.string = query;
}
/* Used above, for joining possibly empty strings with pluses */
function fancyJoin(a,b) {
    if (a == "") { return b; }	
    else if (b == "") { return a; }
    else { return a+"+"+b; }
}

function AnotherdoSearch() {
	count.Value = 0;
	
	var author = document.getElementById("byAuthor2").value;
	author = author.trim();
	author = author.replace(" ","+");
	if (author.length != 0){
		lastAuthor = author;
	}
	var title = document.getElementById("byTitle2").value;
	title = title.trim();
	title = title.replace(" ","+");
	if (title.length != 0){
		lastTitle = title;
	}
	var isbn = document.getElementById("byISBN2").value;
	isbn = isbn.trim();
	isbn = isbn.replace("-","");
	if (isbn.length != 0){
		
		lastISBN = isbn;
	}
	// Connects possible query parts with pluses
	var query = ["",author,title,isbn].reduce(fancyJoin);
	// The JSONp part.  Query is executed by appending a request for a new
	// Javascript library to the DOM.  It's URL is the URL for the query. 
	// The library returned just calls the callback function we specify, with
	// the JSON data we want as an argument. 
	if (query != "" /*&& lastSearch.string != query*/) {
		// remove old script
		var oldScript = document.getElementById("jsonpCall");
		if (oldScript != null) {
			document.body.removeChild(oldScript);
		}
		// make a new script element
		var script = document.createElement('script');

		// build up complicated request URL
		var beginning = "https://www.googleapis.com/books/v1/volumes?q="
		var callback = "&callback=handleResponse"

		script.src = beginning+query+callback	
		script.id = "jsonpCall";

		// put new script into DOM at bottom of body
		document.body.appendChild(script);

		if(document.getElementById("body")){
		document.getElementById("body").id = "changeBody";
		}

		document.getElementById("overlay").style.display = "flex";
		document.getElementById("header").style.display = "none";
		document.getElementById("anotherHeader").style.display = "flex";
		document.getElementById("rightarrow").style.display = "initial";	
	}
	lastSearch.string = query;
}

/* The callback function, which gets run when the API returns the result of our query */
/* Replace with your code! */
var bookList = [];
var rightarrow;
var leftarrow;

var bookNameNum1 = [];
var bookAuthorNum1 = [];
var bookDesNum1 = [];
var bookImage1 = [];
var bookExist = [];

var bookNameNum2 = [];
var bookAuthorNum2 = [];
var bookDesNum2 = [];
var bookImage2 = [];

function handleResponse(bookListObj) {
	bookList = bookListObj.items;
	if (bookList != null){
	var bookDisplay = document.getElementById("bookDisplay");
	var cover = document.getElementById("cover");
	for (i=0; i<bookList.length; i++) {
		var book = bookList[i];
		var title = book.volumeInfo.title;
		var author = book.volumeInfo.authors;

		var old_description = new String(book.volumeInfo.description);

		if(old_description.split(" ").length-1 > 30){
			var a = old_description.indexOf(" ");
			var b = old_description.indexOf(" ",a+1);
			var tempStr = old_description.substring(0,a);
			var new_description = tempStr;

			while(new_description.split(" ").length-1 < 30){
				
				tempStr = old_description.substring(a,b);
				a = b;
				b = old_description.indexOf(" ",b+1);
				new_description += tempStr;
			}
			new_description += "...";
		}
		var image;
		if(book.volumeInfo.imageLinks == undefined){
			image = "NotFound";
			bookImage1[i] = document.createElement("div");
			bookImage2[i] = document.createElement("div");
			bookImage1[i].textContent = "No Image";
			bookImage1[i].id = "innerimage";
			bookImage2[i].textContent = "No Image";
			bookImage2[i].id = "outerimage";
		}else{
			image = book.volumeInfo.imageLinks.thumbnail;
			bookImage1[i] = document.createElement("img");
			bookImage2[i] = document.createElement("img");
			bookImage1[i].src = image;
			bookImage1[i].id = "innerimage";
			bookImage2[i].src = image;
			bookImage2[i].id = "outerimage";
		}

		bookNameNum1[i] = document.createElement("div");
		bookAuthorNum1[i] = document.createElement("div");
		bookDesNum1[i] = document.createElement("div");

		bookNameNum2[i] = document.createElement("div");
		bookAuthorNum2[i] = document.createElement("div");
		bookDesNum2[i] = document.createElement("div");
		
		bookNameNum1[i].textContent = title;
		bookNameNum1[i].id = "innerName";
		bookNameNum1[i].className = "inner";
		bookAuthorNum1[i].textContent = "by "+author;
		bookAuthorNum1[i].id = "innerAuthor";
		bookAuthorNum1[i].className = "inner";
		bookDesNum1[i].textContent = new_description;
		bookDesNum1[i].id = "innerDes";
		bookDesNum1[i].className = "inner";

		bookNameNum2[i].textContent = title;
		bookNameNum2[i].id = "outerbook";
		bookAuthorNum2[i].textContent = "by "+author;
		bookAuthorNum2[i].id = "outerbook";
		bookDesNum2[i].textContent = new_description;
		bookDesNum2[i].id = "outerbook";
		
		cover.append(bookImage1[i]);
		bookDisplay.append(bookNameNum1[i]);
		bookDisplay.append(bookAuthorNum1[i]);
		bookDisplay.append(bookDesNum1[i]);
		bookExist[i] = 0;

	bookImage1[0].style.display = "flex";
	bookNameNum1[0].style.display = "flex";
	bookAuthorNum1[0].style.display = "flex";
	bookDesNum1[0].style.display = "flex";

	rightArrow = document.getElementById("rightArrow");
	rightArrow.onclick = function(){right(count);} 

	leftArrow = document.getElementById("leftArrow");
	leftArrow.onclick = function(){left(count);}
	}
	}else{
		document.getElementById("overlay").style.display = "none";
		document.getElementById("notFound").style.display = "flex";
		notFoundText1 = document.getElementById("notFoundText1");
		notFoundText2 = document.getElementById("notFoundText2");
		notFoundText3 = document.getElementById("notFoundText3");
		notFoundText4 = document.getElementById("notFoundText4");
		notFoundText1.textContent = "The Book "+lastTitle+" by "+lastAuthor+" or";
		notFoundText2.textContent = "ISBN number " +lastISBN;
		notFoundText3.textContent = "Could not be found.";
		notFoundText4.textContent = "Try another search";
	}
}

var count = {Value: 0};
function add1(obj){
	obj.Value++;
}

function minus1(obj){
	obj.Value--;
}

function quit(){
	document.getElementById("overlay").style = "none";
	var leftarrow = document.getElementById("leftarrow");
	var rightarrow = document.getElementById("rightarrow");
	leftarrow.style.display = "none";
	rightarrow.style.display = "none";
	document.getElementById("notFound").style = "none";

	bookNameNum1 = [];
	bookAuthorNum1 = [];
	bookDesNum1 = [];
	bookImage1 = [];
	bookExist = [];

	var bookDisplay = document.getElementById("bookDisplay");
	var cover = document.getElementById("cover");
	
	while (bookDisplay.firstChild){
		bookDisplay.removeChild(bookDisplay.firstChild);
	}
	while (cover.firstChild){
		cover.removeChild(cover.firstChild);
	}
	var x = document.getElementById("severalBooks").childElementCount;
	if(x == 0){
		document.getElementById("header").style.display = "initial";
		document.getElementById("anotherHeader").style.display = "none";
		document.getElementById("changeBody").id = "body";
	}
}

function right(count){
	bookImage1[count.Value].style.display = "none";
	bookNameNum1[count.Value].style.display = "none";
	bookAuthorNum1[count.Value].style.display = "none";
	bookDesNum1[count.Value].style.display = "none";
	add1(count);
	if (count.Value == bookList.length-1){
		document.getElementById("rightarrow").style.display = "none";
		document.getElementById("leftarrow").style.display = "initial";
	}else if(count.Value == 0){
		document.getElementById("rightarrow").style.display = "initial";
		document.getElementById("leftarrow").style.display = "none";
	}else{
		document.getElementById("rightarrow").style.display = "initial";
		document.getElementById("leftarrow").style.display = "initial";
	}

	bookImage1[count.Value].style.display = "flex";
	bookNameNum1[count.Value].style.display = "flex";
	bookAuthorNum1[count.Value].style.display = "flex";
	bookDesNum1[count.Value].style.display = "flex";	
}

function left(count){
	bookImage1[count.Value].style.display = "none";
	bookNameNum1[count.Value].style.display = "none";
	bookAuthorNum1[count.Value].style.display = "none";
	bookDesNum1[count.Value].style.display = "none";
	minus1(count);
	if (count.Value == 0){
		document.getElementById("leftarrow").style.display = "none";
		document.getElementById("rightarrow").style.display = "initial";
	}else if(count.Value == bookList.length){
		document.getElementById("leftarrow").style.display = "initial";
		document.getElementById("rightarrow").style.display = "none";
	}else{
		document.getElementById("rightarrow").style.display = "initial";
		document.getElementById("leftarrow").style.display = "initial";
	}
	bookImage1[count.Value].style.display = "flex";
	bookNameNum1[count.Value].style.display = "flex";
	bookAuthorNum1[count.Value].style.display = "flex";
	bookDesNum1[count.Value].style.display = "flex";	
}

function keep(){	
	if (bookExist[count.Value] == 0){
	var severalBooks = document.getElementById("severalBooks");

	var oneBook = document.createElement("div");
	oneBook.id = "oneBook";

	var oneBookImage = document.createElement("div");
	oneBookImage.id = "oneBookImage";
	oneBook.appendChild(oneBookImage);

	var oneBookContent = document.createElement("div");
	oneBookContent.id = "oneBookContent"; 
	oneBook.appendChild(oneBookContent);

	severalBooks.append(oneBook);
	
	var newbookCover = document.createElement("img");
	var newbookTitle = document.createElement("p");
	var newbookAuthor = document.createElement("p");
	var newbookDes = document.createElement("p");
	
	newbookCover = bookImage2[count.Value];
	newbookCover.id = "newbookCover";
	newbookTitle = bookNameNum2[count.Value];
	newbookTitle.id = "newbookTitle";
	newbookAuthor = bookAuthorNum2[count.Value];
	newbookAuthor.id = "newbookAuthor";
	newbookDes = bookDesNum2[count.Value];
	newbookDes.id = "newbookDes";

	var newDeleteButton = document.createElement("button");
	newDeleteButton.type = "button";
	newDeleteButton.textContent = "X";
	newDeleteButton.className = "book"+ count.Value;
	newDeleteButton.id = "deleteButton";

	oneBookImage.appendChild(newbookCover);
	oneBookContent.appendChild(newDeleteButton);
	oneBookContent.appendChild(newbookTitle);
	oneBookContent.appendChild(newbookAuthor);
	oneBookContent.appendChild(newbookDes);

	newDeleteButton.onclick = function(){
		severalBooks.removeChild(oneBook);
		bookExist[count.Value] = 0;
		var x = document.getElementById("severalBooks").childElementCount;
		if(x == 0){
			document.getElementById("header").style.display = "initial";
			document.getElementById("anotherHeader").style.display = "none";
			document.getElementById("changeBody").id = "body";
		}
	};
	bookExist[count.Value] = 1;
	}
}

