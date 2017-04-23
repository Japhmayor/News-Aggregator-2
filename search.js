resultBox = document.getElementById('resultBox');
possibleURLs = {
	'nytimes.com': ['gray',1],
	'washingtonpost.com': ['sienna',2],
	'washingtontimes.com': ['midnightblue',3],
	'foxnews.com': ['maroon',4],
	'chicago.suntimes.com': ['orangered',5],
	'baltimoresun.com': ['purple',6],
	'ap.org': ['mediumorchid',7],
	'bbc.com': ['darkslateblue',8],
	'nbcnews.com': ['darkgreen',9],
	'cnn.com': ['crimson',10]
}
	
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
	for (url in possibleURLs) {
		if (elem.url.includes(url)) d.style.backgroundColor = possibleURLs[url][0];
	}
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
for (url in possibleURLs) {
	if (srcs%(2**possibleURLs[url][1]) > (2**(possibleURLs[url][1]-1))-1) {
		websites = websites.concat(url);
	}
}

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

