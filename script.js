function test() {
	console.log("function called");
	alert("hello");
	console.log("function end");
}

$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});

var data;
var arrays = [];
var not_strings = [];
var result = {};

function array(n) {
	console.log(n);
	var index = arrays.indexOf(n);
	if(index > -1)
		arrays.splice(index, 1);
	else
		arrays.push(n);
}

function not_string(n) {
	console.log(n);
	var index = not_strings.indexOf(n);
	if(index > -1)
		not_strings.splice(index, 1);
	else
		not_strings.push(n);
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function options() {
	//console.log(document.getElementById("data").value);
	/*var data = document.getElementById("data").value.split("\n");
	var keys = data[0].split("|").map(s=>s.trim());
	console.log("Fields detected: "+keys.length);
	console.log("Rows detected: "+data.length);*/
	
	data = document.getElementById("data").value.split("\n").map(row=>row.split("|").map(field=>field.trim())).filter((value, index, arr)=>{arr[index].shift();arr[index].pop();return true;});
	/*for(var i=1;i<data.length;i++) {
		var obj = {};
		for(var j=0;j<data[0].length;j++) {
			obj[data[0][j]] = data[i][j];
		}
		result[i-1] = obj;
	}
	console.log(result);*/
	
	//populate table
	$("#submitdata").hide();
	$("#options").show();
	$("#data").attr('readonly','readonly');
	$.each(["OPTIONS", "array", "not_string"], function(ind, val) {
	var tr = '<tr><th>'+val+'</th>';
	$.each(data[0], function(index, value) {
		if(ind == 0)
			tr += "<th>"+value+"</th>";
		else
			tr += "<td><input type=\"checkbox\" onclick=\""+val+"('"+value+"');\"/></td>";
	});
	tr += "</tr>";
	$('#datatable').append(tr);
	});

}

function reset() {
    $("#datatable").empty();
    $("#submitdata").show();
	$("#options").hide();
	$("#data").attr('readonly',false);
	$("#data").val('');
	$("#name").val('');
	arrays = [];
    not_strings = [];
    result = {};
}

function myParser(field) {
	try {
		return JSON.parse(field);
	} catch(e) {
		return field;
	}
}

function generate() {
	var name = document.getElementById("name").value;
	var keys = name.match(/\[.*?\]/g);
	
	for(var i=1;i<data.length;i++) {
		var obj = {};
		for(var j=0;j<data[0].length;j++) {
			obj[data[0][j]] = data[i][j];
		}
		//result[i-1] = obj;
		var key = name;
		for(j=0;j<keys.length;j++) {
			key = key.replace(keys[j], obj[keys[j].replace(/\[|\]/g,"")]);
		}
		result[key] = obj;
	}
	
	$.each(arrays, function(index, value) {
		$.each(result, function(ind, val){
			result[ind][value] = result[ind][value].split(",").map(field=>field.trim());
		});
	});
	
	$.each(not_strings, function(index, value){
		$.each(result, function(ind, val){
			if(arrays.indexOf(value) > -1) {
				var temp = [];
				$.each(result[ind][value], function(i,v){
					if(v == "")
						temp.push(null);
					else
						temp.push(myParser(v));
				});
				result[ind][value] = temp;
			} else
				if(result[ind][value] == "")
					result[ind][value] = null;
				else
					result[ind][value] = myParser(result[ind][value]);
		});
	});
	/*for(i=0;i<not_strings.length;i++) {
		for(j in result) {
			if(arrays.indexOf(not_strings[i]) > -1) {
				temp = [];
				tmp = result[j][not_strings[i]];
				for(var k=0;k<tmp.length;k++) {
					temp.push(JSON.parse(tmp[k]));
				}
				result[j][not_strings[i]] = temp;
			} else
				result[j][not_strings[i]] = JSON.parse(result[j][not_strings[i]]);
		}
	}*/

	console.log(result);
	
	// download data
	$.each(result, function(index, value){
		download(index+".json", JSON.stringify(value));
	});
	//location.reload();
	reset();
}