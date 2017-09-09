$( document ).ready(function(){
	jQuery.support.cors = true;
	
	var loader = '',
		interval = null;
		
	if (document.all && !window.atob) {
		loader = '<div id="loader" class="ie9-only">Loading...</div>';
	} else {
		loader = '<div id="loader" class="loader">Loading...</div>';
	}

	$('#container-fluid-loader').append(loader);
	$('#loader').delay(3000).show();
	interval = setInterval(view_books,3000);

	function view_books() {

		var service = 'https://www.googleapis.com/books/v1/volumes?q=3shape&intitle:3shape&maxResults=8',
			totalResults = 0,
			totalPrice = 0,
			currency = '',
			rowDiv = '',
			rowHTML = '',
			imgSrc = '',
			title = '',
			price = 0,
			hrefUrl = '',
			productID = '',
			N = 4;
			
		
		$.getJSON(service, function (response) {
		
			totalResults = response.totalItems;
			
			for (var i = 0; i < response.items.length; i += N) {	
				
				rowHTML = '';
				for (var j = i; j < i+N; j++) {
				
					if (response.items[j]) {
					
						var item = response.items[j];
						
						productID = item.id;
						hrefUrl = 'bookDetails.html#' + productID;
						
						if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.large) {
							imgSrc = item.volumeInfo.imageLinks.large;
						} else if (item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail) {
							imgSrc = item.volumeInfo.imageLinks.thumbnail;
						} else {
							imgSrc = "https://books.google.com/books/content?id=sMnaAgAAQ%E2%80%A6=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
						}
						
						if (item.volumeInfo.title) {
							title = item.volumeInfo.title;
						}
						
						if (item.saleInfo.retailPrice) {
							price = item.saleInfo.retailPrice.amount;
							totalPrice += price;
							currency = item.saleInfo.retailPrice.currencyCode;
							price = price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1,");
						} else {
							price = 'Free';
							currency = '';
						}
					
						rowHTML += '<div class="col-md-3"><div class="thumbnail"><center><a href="' + hrefUrl + '" id="img' + productID + '"><img src="' + imgSrc + '" alt="' + title + '" height="150" width="auto"></a></center><a href="' + hrefUrl + '"><p><strong>' + title + '</strong></p></a><p>' + price + ' ' + currency +'</p></div></div>';
					}
				}
				
				document.getElementById("container-fluid-loader").innerHTML += '<div class="row text-center">' + rowHTML + '</div><br>';
				$('#loader').hide();
				clearInterval(interval);
			}
			
			totalPrice = totalPrice.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1,");
			document.getElementById("totalResults").innerHTML += response.items.length + ' out of ' + totalResults;
			document.getElementById("totalPrice").innerHTML += totalPrice + ' DKK';
		});
	}
})
