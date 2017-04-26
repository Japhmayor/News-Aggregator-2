sources = [
	['New York Times','white'],
	['Washington Post','tan'],
	['Washington Times','cyan'],
	['Fox News','tomato'],
	['CNN News','red'],
	['Baltimore Sun','violet'],
	['Associated Press','pink'],
	['Chicago Sun-Times','orange'],
	['BBC News','lightblue'],
	['NBC News','lightgreen']
];

r = localStorage.getItem("srcs");
sources.forEach((e,i)=>{
	input = $('<input>').prop('type', 'checkbox')
		.change(()=>localStorage.setItem("srcs", getSrcs()))
		.prop('checked', (r%(2**(i+1)))>(2**i)-1);
	lbl = $('<label>').css('color', e[1]).text(e[0]).prepend(input).appendTo('#pick');
});

$("#in").keyup(e => {
    if (e.which == 13) {
		performSearch();
    }
});

getSrcs = () => Array.from($('#pick input')).reduce((a,e,i) => a+(e.checked?2**i:0),0);
performSearch = () => window.open(window.location.href.split(/index\.html/g)[0]+'search.html?srcs='+getSrcs()+'&q='+$('#in').val());
