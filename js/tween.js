
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

// calculates and returns array of total distance values 
function findAvgDistance(array) {
	var dist_all = new Array();
	for(var i=0; i < array.length; i++) {
		var tmp_dist = 0;
		for(var j=0; j< array.length; j++) {
			var dist = compareArrays(array[i],array[j],false);
			tmp_dist = tmp_dist + dist.length;
		}
		dist_all[dist_all.length] = tmp_dist; ///600
	}

	return dist_all;
}

// returns index of smallest value in array
function findSmallest(dist) {
	var smallest = dist[0];
	var smallestIndex = 0;

	for(var i=1; i < dist.length; i++) {
		if(smallest > dist[i]) {
			smallest = dist[i];
			smallestIndex = i;
		}
	}

	return smallestIndex ;

}

// creates and returns array of terminal nodes 
function findTerminals(relation) {
	var terminals = new Array();
    //document.write(" Terminals <br/>");
    for (var i=0; i < relation.length ; i++){
        if(relation[i].length === 1){
           	//document.write(i+" : "+relation[i]+" <br/>");
           	terminals[terminals.length] = i ;
         }
    }
    return terminals;
}

// returns genetically nearest node with distance
function findParent(geneticData, orphan, index) {
	var nearestDist = compareArrays(orphan[index], geneticData[0],false).length;;
	var nearestIndex = 0;
	for(i= 1; i< geneticData.length && orphan.indexOf(i) < 0; i++) {
		var dist = compareArrays(orphan[index], geneticData[i],false).length;
		if(nearestDist > dist) {
			nearestDist = dist;
			nearestIndex = i;
		}
	}
	var near = new Array();
	near[0] = nearestDist;
	near[1] = nearestIndex;
	return near;
}


function main() {
	
	
	var relation = new Array();

	var offset = new Array();

	var avg = new Array();

	var geneticData = loadFileIntoArray('tweens600.txt');
	//document.write("geneticData size"+geneticData.length+"<br/>");

	
	var avgDistance = findAvgDistance(geneticData);
	//writeArray(avgDistance);
	var smallest = findSmallest(avgDistance);
	document.write("By least average genetic difference method  Root Node --> "+smallest+" <br/>");
	

	
    	for (var  i = 0; i < geneticData.length ; i++) {
 
        	var tmp = new Array();
        	for (var j = 0; j< geneticData.length ; j++) {   //i+1

	        		var offsettmp = new Array();
	             	if(i != j){
	             		var diff = compareArrays(geneticData[i],geneticData[j],false);
	             		
	                 		if(diff.length <= 147){ //147
	                     	
	                     		tmp[tmp.length] = j;
	                     		offsettmp[offsettmp.length] = diff.length - 120;
	                     	}
	                 
	                 		
	             	}
 			}
 			relation[i] = tmp;
	        offset[i] = offsettmp;
		}
	
     //calculate average distance
     for(var i=0; i< offset.length; i++)
     {
         if(offset[i].length!=0)
        {
             var total=0;
            for(var j=0; j< offset[i].length; j++)
                total+= offset[i][j];
 
             avg[i] = total/offset[i].length;
         }
     }
 
 	

    var population = integerArray(600);
    var parent = new Array();
    //document.write(population+"<br/>");

    while(population.length > 1) {
    	//finding terminals
	    var terminals = new Array();
	    terminals = findTerminals(relation);
	    //document.write("<br/> Terminals "+terminals.length+"->"+terminals+" <br/>");

	 	// Deleting terminals from relation

	 	for(var i=0; i < relation.length; i++) {
	 		if(relation[i].length > 0) {
	 			for(var j=0; j < relation[i].length; j++) {
	 				if(terminals.indexOf(relation[i][j]) >= 0) {
	 					//population.splice(relation[i][j],1);
	 					relation[i].splice(j,1);
	 				}
	 			}
	 		}
	 	}

	 	for(var i=0; i<terminals.length; i++) {

	 		if(isNaN(parent[terminals[i]]))
		 		parent[terminals[i]] = relation[terminals[i]][0];

	 		var index = population.indexOf(terminals[i]);
	 		if( index >= 0) {
	 			population.splice(index,1);
	 		}
	 	}
	 	
    }

    parent[population[0]] = -1;		// -1 means it is root of tree

    
    //check for any node without parent
    var orphan = new Array();
    for(var i=0; i < parent.length; i++) {
    	if(isNaN(parent[i])) {
    		orphan[orphan.length] = i;
    		parent[i] = -2;
    	}
    }
    /*
    //Find nearest distance of each orphan in with rest rest of nodes
    var nearNode_dist = new Array();
    for(var i=0; i< orphan.length; i++) {
    	nearNode_dist[nearNode_dist.length] = findParent(geneticData,orphan,i);
    }
    document.write(" for orphans"+nearNode_dist+" <br/>");
    */

    document.write("By successiver terminal node elimination method Root Node ->"+ population[0] +"<br/>");
    document.write("Child Parent Relationship <br/>");
    document.write("Child : Parent <br/>");
    writeArray(parent);

    //drawGraph();

 }