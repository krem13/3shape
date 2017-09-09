$( document ).ready(

	function bookDetails() {
		var bookID = window.location.hash.substring(1),
			service = 'https://www.googleapis.com/books/v1/volumes?q=' + bookID,
			imgSrc = '',
			title ='',
			authors = '',
			descr ='',
			price = 0,
			currency = '';

		$.getJSON(service, function (response) {
			
			for (var i = 0; i < response.items.length; i++) {	
				var item = response.items[i];
					
				if (item.volumeInfo.imageLinks) {
					imgSrc = item.volumeInfo.imageLinks.thumbnail;
				} else {
					imgSrc = "https://books.google.com/books/content?id=sMnaAgAAQ%E2%80%A6=frontcover&img=1&zoom=1&edge=curl&source=gbs_api";
				}
				
				if (item.volumeInfo.title) {
					title = item.volumeInfo.title;
				}
				
				if (item.volumeInfo.authors) {
					authors = item.volumeInfo.authors[0];
					
					for (var i = 1; i < item.volumeInfo.authors.length; i++)
					authors += ', ' + item.volumeInfo.authors[i];
				}
				
				if (item.volumeInfo.description) {
					descr = item.volumeInfo.description;
				} else {
					descr = 'No description.';
				}
				
				if (item.saleInfo.retailPrice) {
					price = item.saleInfo.retailPrice.amount;
					currency = item.saleInfo.retailPrice.currencyCode;
					price = price.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "1,");
				} else {
					price = 'Free';
					currency = '';
				}
				
			}
			
			document.getElementById("breadcrumb-item-last").innerHTML += title;
			document.getElementsByClassName("service-image-left")[0].innerHTML += '<center><img id="item-display" src="' + imgSrc + '" alt="' + title + '"></img></center>';
			document.getElementsByClassName("product-title")[0].innerHTML += title;
			document.getElementsByClassName("product-author")[0].innerHTML += authors;
			document.getElementsByClassName("product-desc")[0].innerHTML += descr;
			document.getElementsByClassName("product-price")[0].innerHTML += price + ' ' + currency;
			
		});
		
	}
)
