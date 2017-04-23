sources = [
	['ny','New York Times'],
	['wp','Washington Post'],
	['wt','Washington Times'],
	['fn','Fox News'],
	['cn','CNN News'],
	['bs','Baltimore Sun'],
	['ap','Associated Press'],
	['cs','Chicago Sun-Times'],
	['bb','BBC News'],
	['nb','NBC News']
];

r = localStorage.getItem("srcs");
sources.forEach((e,i)=>{
	lbl = document.createElement('label');
	lbl.id = e[0]+'2';
	input = document.createElement('input');
	input.type = 'checkbox';
	input.id = e[0];
	lbl.appendChild(input);
	lbl.innerHTML += e[1];
	document.getElementById('pick').appendChild(lbl);
	document.getElementById('pick').childNodes[i].childNodes[0].checked = (r%(2**(i+1)))>(2**i)-1;
});


$("#in").keyup(function (e) {
    if (e.which == 13) {
		performSearch();
    }
 });

$('input[type="checkbox"]').change(function() {
    localStorage.setItem("srcs", getSrcs());
 });

function getSrcs() {
	srcs = 0;
	sources.forEach((e,i)=>{if (document.getElementById(e[0]).checked) srcs += 2**i;})
	return srcs
}

function performSearch() {
	val = document.getElementById('in').value;
	window.open(window.location.href.split(/index\.html/g)[0]+'search.html?srcs='+getSrcs()+'&q='+val);
}

