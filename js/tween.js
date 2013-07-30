
// returns a copy of array source
function copyArray(source) {
	var copy = new Array();
	var len = source.length;
	for (var i = 0; i < len; i++) {
		copy[copy.length] = source[i];
	}
	return copy;
}

// returns an array populated with integers 1..n
function integerArray(n) {
	var arr = new Array();
	for (var i=0; i < n; i++) {
		arr[arr.length] = i;
	}
	return arr;
}

// clears the browser page
// note: will fail if page contains no data
function clearPage() {
	document.getElementsByTagName("body")[0].innerHTML = "";
}

// returns a 0 indexed array with one element for every line of data in filepath
function loadFileIntoArray(filepath) {
	if (window.XMLHttpRequest)
	{
		var xhttp = new XMLHttpRequest();
	}
	else // Internet Explorer 5/6
	{
		var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filepath,false);
	xhttp.send("null");
	var data = xhttp.responseText;
	
	var re = new RegExp("^.*$", "mg");
		
	var dataArray = data.match(re);

	return dataArray;
}

// prints an array to the webpage - omits any undefined or null elements 
function writeArray(source) {
	for (var i=0; i < source.length; i++) {
		if (source[i] != undefined && source[i] != null) {
			document.write(i + ": " + source[i] + "<br />");
		}
	}
	
}

// returns an array containing the indices of elements in source and target that differ
// and optionally writes the output to the page
// assumes source.length == target.length
function compareArrays(source, target, print) {
	var diff = new Array();		//document.write(diff.length+" <br/>");
	
	for (var i=0; i < source.length; i++) {
		if (source[i] != target[i]) {
			diff[diff.length] = i;
		}
	}
	
	if (print) {
		var diffPrint = new Array();
		for (var i=0; i < diff.length; i++) {
			diffPrint[diff[i]] = [source[diff[i]], target[diff[i]]];
		}
		writeArray(diffPrint);
	}
	
	return diff; 
	
}

function findAvgDistance(array) {
	var dist_all = new Array();
	for(var i=0; i < array.length; i++) {
		var tmp_dist = 0;
		for(var j=0; j< array.length; j++) {
			var dist = compareArrays(array[i],array[j],false);
			tmp_dist = tmp_dist + dist.length;
		}
		dist_all[dist_all.length] = tmp_dist/600;
	}

	return dist_all;
}

function findSmallest(dist) {
	var smallest = dist[0];
	var smallestIndex = 0;

	for(var i=1; i < dist.length; i++) {
		if(smallest > dist[i]) {
			smallest = dist[i];
			smallestIndex = i;
		}
	}
	alert('found smallest');

	return smallestIndex ;

}

function main() {
	
	
	var relation = new Array(600);

	var offset = new Array(600);

	var avg = new Array();

	var geneticData = loadFileIntoArray('tweens600.txt');

	var avgDistance = findAvgDistance(geneticData);
	writeArray(avgDistance);

	var smallest = findSmallest(avgDistance);

	document.write(" Smallest Index "+smallest+" <br/>");

	
}