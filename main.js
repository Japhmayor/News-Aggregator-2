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
	input = $('<input>').prop('id', e[0]).prop('type', 'checkbox')
		.change(()=>localStorage.setItem("srcs", getSrcs()))
		.prop('checked', (r%(2**(i+1)))>(2**i)-1);
	lbl = $('<label>').prop('id', e[0]+'2').text(e[1]).prepend(input).appendTo('#pick');
});

$("#in").keyup(e => {
    if (e.which == 13) {
		performSearch();
    }
});

function getSrcs() {
	srcs = 0;
	sources.forEach((e,i)=>{if ($('#'+e[0]).prop('checked')) srcs += 2**i;})
	return srcs
}

function performSearch() {
	val = $('#in').val();
	window.open(window.location.href.split(/index\.html/g)[0]+'search.html?srcs='+getSrcs()+'&q='+val);
}

