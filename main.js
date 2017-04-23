sources = [ 'ny','wp','wt','fn','cs','bs','ap','bb','nb','cn' ];

r = localStorage.getItem("srcs");
sources.forEach((e,i)=>$('#'+e).prop('checked', r%(2**(i+1))>(2**i)-1))

$("#in").keyup(function (e) {
    if (e.which == 13) {
		performSearch();
    }
 });

$('input[type="checkbox"]').change(function() {
	srcs = getSrcs();
    localStorage.setItem("srcs", srcs);
 });

function getSrcs() {
	srcs = 0;
	sources.forEach((e,i)=>{if (document.getElementById(e).checked) srcs += 2**i;})
	console.log(srcs)
	return srcs
}

function performSearch() {
	val = document.getElementById('in').value;
	srcs = getSrcs();
	window.open(window.location.href.split(/index\.html/g)[0]+'search.html?srcs='+srcs+'&q='+val);
}

