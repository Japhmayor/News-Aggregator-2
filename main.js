//$('input[type="checkbox"]').prop('checked', true);
r = localStorage.getItem("srcs");
$('#ny').prop('checked', r%10);
$('#wp').prop('checked', r%100 > 9);
$('#wt').prop('checked', r%1000 > 99);
$('#fn').prop('checked', r%10000 > 999);
$('#cs').prop('checked', r%100000 > 9999);
$('#bs').prop('checked', r%1000000 > 99999);
$('#ap').prop('checked', r%10000000 > 999999);
$('#bb').prop('checked', r%100000000 > 9999999);
$('#nb').prop('checked', r%1000000000 > 99999999);
$('#cn').prop('checked', r%10000000000 > 999999999);

$("#in").keyup(function (e) {
    if (e.which == 13) {
        // Enter key pressed
		performSearch();
    }
 });

$('input[type="checkbox"]').change(function() {
	srcs = getSrcs();
    localStorage.setItem("srcs", srcs);
 });

function getSrcs() {
	srcs = 0;
	if (document.getElementById('ny').checked) srcs += 1;
	if (document.getElementById('wp').checked) srcs += 10;
	if (document.getElementById('wt').checked) srcs += 100;
	if (document.getElementById('fn').checked) srcs += 1000;
	if (document.getElementById('cs').checked) srcs += 10000;
	if (document.getElementById('bs').checked) srcs += 100000;
	if (document.getElementById('ap').checked) srcs += 1000000;
	if (document.getElementById('bb').checked) srcs += 10000000;
	if (document.getElementById('nb').checked) srcs += 100000000;
	if (document.getElementById('cn').checked) srcs += 1000000000;
	return srcs
}

function performSearch() {
	val = document.getElementById('in').value;
	srcs = getSrcs();
	window.open(window.location.href.split(/index\.html/g)[0]+'search.html?srcs='+srcs+'&q='+val);
}

/*$.ajaxPrefilter( function (options) {
  if (options.crossDomain && jQuery.support.cors) {
    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
  }
});

function printData(data) {
	var html = $(data);
	var re = /g _cy[^(?:href)]*href="https:\/\/([^"]+)"/g;
	matches = data.match(re);
	
	//console.log(matches);
	matches.forEach(function(str){
		var re2 = /href="https:\/\/([^"]+)"/g;
		match = re2.exec(str);
		if (match) {
			console.log(match[1]);
		}
	});
}

$.ajax({
  url: "https://www.google.com/search?q=donald+trump+site:nytimes.com&tbm=nws",
  //url: "https://www.bing.com/",
  success: printData,
  dataType: 'html'
});
*/
