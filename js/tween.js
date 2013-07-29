
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


function main() {
	
	//alert("hello");
	var relation = new Array(600);

	var gdata = loadFileIntoArray('tweens600.txt');
	//document.write(gdata.length+"<br/>");
	for (var  i = 0; i < gdata.length ; i++)
	{

		var tmp = new Array();
		for (var j = i+1; j< gdata.length ; j++)	//0
		{	
			if(i != j)
			{
			var diff = compareArrays(gdata[i],gdata[j],false);
			//document.write(i +" CMP "+(i+1)+" -> "+ diff+"<br/>");
			//writeArray(diff);
			if(diff.length <= 147)
			{
				//document.write(i +" Differs with "+j+" -> "+ diff.length+"<br/>");

				tmp[tmp.length] = j;
				//document.write(relation[i][j]+" <br/>");
			}
			
			//document.write(relation[i].length+" <br/>");
			}
		}
		relation[i] = tmp;
	}

	//Printing relation list
	document.write(" Relatives <br/>");
	
	for (var i=0; i < relation.length; i++)
	{
		document.write(i+" : "+relation[i]+" <br/>");
	}
	

	//printing orphans
	document.write(" orphans <br/>");
	for (var i=0; i < relation.length ; i++)
	{
		if(relation[i].length === 0)
		{
			document.write(i+" : "+relation[i]+" <br/>");
		}
	}

	//Find Root

}