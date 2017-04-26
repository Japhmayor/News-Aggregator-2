resultBox = $('#resultBox').get(0);
possibleURLs = [
	['nytimes.com','gray'],
	['washingtonpost.com','sienna'],
	['washingtontimes.com','midnightblue'],
	['foxnews.com','maroon'],
	['cnn.com','crimson'],
	['baltimoresun.com','purple'],
	['ap.org','mediumorchid'],
	['chicago.suntimes.com','orangered'],
	['bbc.com','darkslateblue'],
	['nbcnews.com','darkgreen']
]
	
saveData = data => data.value.forEach(elem => addResult(elem));

function addResult(elem) {
	d = $('<div>').addClass('result').html(elem.name+'<br>');
	span = $('<span>').html(elem.description).appendTo(d);
	possibleURLs.map(e =>{ if (elem.url.includes(e[0])) d.css('background-color',e[1]); });
	$('<a>').prop('href',elem.url).append(d).append($('<br>')).appendTo(resultBox);
}

var re = /srcs=([0-9]+)&q=(.*)/g;
match = re.exec(window.location.href);
srcs = parseInt(match[1]);
query = match[2];
websites = [];
possibleURLs.forEach((e,i)=>{
	if (srcs%(2**(i+1))>(2**i)-1) {
		websites.push('site:"'+e[0]+'"');
	}
});
search();
	
function search() {
	$.ajax({
	  url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q="+query+' AND ('+websites.join(' OR ')+')',
	  success: saveData,
	  type: "GET",
	  dataType: 'json',
	  headers: {
		"Ocp-Apim-Subscription-Key":"d398752ad064467c819a9e531beb6ad8"
	  }
	});
}

