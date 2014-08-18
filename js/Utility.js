function DoToAll(div, fn, delay){
	delay = delay == undefined ? 0 : delay;
	$.each(div, function(i){
		var current = $(this);
		//Necessary because even having a setTimeout with 0
		//causes undue delay and ruins the next action
		if(delay == 0){
			fn(current)
		}else{
			setTimeout(function(){
				fn(current)
			}, (i+1)*delay);
		}
	});	
}

function ApplyChildren(div, fn){
	try{
		var children = div.children();
	}catch(err){
		console.log("El can't have children, returning.", div);
		return;
	}

	var i = 0;
	while(i != children.length){
		var childDiv = $(children[i]);
		fn(childDiv)
		ApplyChildren(childDiv, fn);
		i++
	}
}

function RoundToTen(num){
	return Math.round(num/10)*10;
}

function RelativeDistance(parent, child){
	var parentDistance = parent.offset().left;
	var childDistance = child.offset().left;
	return childDistance - parentDistance;
}

function GetMode(data){
	var modeMap = {};
	var maxEl,
	maxCount = 1,
	i = 1;
	while (data[i++] != null){
		var colour = data[i];
		if (modeMap[colour]!=null){
			modeMap[colour] += 1
		}else{
			modeMap[colour] = 1
		}
		if(modeMap[colour] > maxCount && colour != 0){
			maxCount = colour
		}
	}
	return maxCount;
}

function GetAverage(data){
	var i = 1,
	count = 0,
	total = 0
	while(data[i++] != null){
		if(data[i] != 0 && data[i] != undefined){
			total += data[i]
			++count
		}
	}
	return Math.floor(total/count);
}

function stringToHex(s){
	var hex = s.toString(16);
	return hex.length == 1? "0" + hex : hex;
}

function RGBToHex(r,g,b){
	return "#" + stringToHex(r) + stringToHex(g) + stringToHex(b)
}
