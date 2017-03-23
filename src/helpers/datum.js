module.exports = function() {
	var day = new Date().getDate();
	var month = new Date().getMonth() + 1;
	var year = new Date().getFullYear();
	var weekdays = ['Nedjelja', 'Ponedjeljak', 'Utorak', 'Srijeda', 'Četvrtak', 'Petak', 'Subota'];
	// eg. Četvrtak, 23.3.2017.
	return weekdays[new Date().getDay()] + ', ' + day + '.' + month + '.' + year + '.';
}