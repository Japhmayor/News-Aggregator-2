resultBox = document.getElementById('resultBox');
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
	
function saveData(data) {
	data.value.forEach(function(elem){
		addResult(elem);
	})
}

function addResult(elem) {
	d = document.createElement('div');
	d.className = 'result';
	a = document.createElement('a');
	d.innerHTML = elem.name+'<br>';
	a.href = elem.url;
	span = document.createElement('span');
	span.innerHTML = elem.description;
	d.appendChild(span);
	possibleURLs.forEach((e,i)=>{
		if (elem.url.includes(e[0])) d.style.backgroundColor = e[1];
	});
	a.appendChild(d);
	resultBox.appendChild(a);
	br = document.createElement('br');
	resultBox.appendChild(br);
}

var re = /srcs=([0-9]+)&q=(.*)/g;
match = re.exec(window.location.href);
srcs = parseInt(match[1]);
query = match[2];
websites = [];
possibleURLs.forEach((e,i)=>{
	if (srcs%(2**(i+1))>(2**i)-1) {
		websites = websites.concat(e[0]);
	}
});
websites.forEach(function(elem,i,arr){arr[i] = 'site:"'+elem+'"';});
search();
	
function search() {
	$.ajax({
	  url: "https://api.cognitive.microsoft.com/bing/v5.0/news/search?q="+query+' AND ('+websites.join(' OR ')+')',
	  success: saveData,
	  type: "GET",
	  dataType: 'json',
	  beforeSend: function(xhrObj){
		xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d398752ad064467c819a9e531beb6ad8");
		}
	});
}

