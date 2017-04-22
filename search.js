resultBox = document.getElementById('resultBox');

function saveData(data) {
	data.value.forEach(function(elem){
		addResult(elem);
	})
	console.log(data);
}

function addResult(elem) {
	d = document.createElement('div');
	d.className = 'result';
	console.log(elem);
	a = document.createElement('a');
	d.innerHTML = elem.name+'<br>';
	a.href = elem.url;
	span = document.createElement('span');
	span.innerHTML = elem.description;
	d.appendChild(span);
	if (elem.url.includes('nytimes.com')) d.style.backgroundColor = 'gray';
	else if (elem.url.includes('washingtonpost.com')) d.style.backgroundColor = 'sienna';
	else if (elem.url.includes('washingtontimes.com')) d.style.backgroundColor = 'midnightblue';
	else if (elem.url.includes('foxnews.com')) d.style.backgroundColor = 'maroon';
	else if (elem.url.includes('chicago.suntimes.com')) d.style.backgroundColor = 'orangered';
	else if (elem.url.includes('baltimoresun.com')) d.style.backgroundColor = 'purple';
	else if (elem.url.includes('ap.org')) d.style.backgroundColor = 'mediumorchid';
	else if (elem.url.includes('bbc.com')) d.style.backgroundColor = 'darkslateblue';
	else if (elem.url.includes('nbcnews.com')) d.style.backgroundColor = 'darkgreen';
	else if (elem.url.includes('cnn.com')) d.style.backgroundColor = 'crimson';
	a.appendChild(d);
	resultBox.appendChild(a);
	br = document.createElement('br');
	resultBox.appendChild(br);;
}

var re = /srcs=([01]+)&q=(.*)/g;
match = re.exec(window.location.href);
srcs = parseInt(match[1]);
query = match[2];
websites = [];
if (srcs%10) websites = websites.concat('nytimes.com');
if (srcs%100 > 9) websites = websites.concat('washingtonpost.com');
if (srcs%1000 > 99) websites = websites.concat('washingtontimes.com');
if (srcs%10000 > 999) websites = websites.concat('foxnews.com');
if (srcs%100000 > 9999) websites = websites.concat('chicago.suntimes.com');
if (srcs%1000000 > 99999) websites = websites.concat('baltimoresun.com');
if (srcs%10000000 > 999999) websites = websites.concat('ap.org');
if (srcs%100000000 > 9999999) websites = websites.concat('bbc.com');
if (srcs%1000000000 > 99999999) websites = websites.concat('nbcnews.com');
if (srcs%10000000000 > 999999999) websites = websites.concat('cnn.com');

websites.forEach(function(elem,i,arr){arr[i] = 'site:"'+elem+'"';});
console.log(websites);
console.log("news/search?q="+query+' AND ('+websites.join(' OR ')+')');
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

