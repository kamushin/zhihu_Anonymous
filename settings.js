$(document).ready(setup);

function executeScript(v) {
	chrome.tabs.executeScript(null,{code:v})
}

function print(v) {
	executeScript("console.log('" + v +"')");
}

function set_anonymous_or_public(v) {
	if(v == 0) {// 匿名
		executeScript("set_anonymous()");
	}
	else if(v == 1) {
		executeScript("set_public()");
	}
	else{
		print("err")
		print(chrome.runtime.lastError);
	}
}

function setup(){
	chrome.tabs.query({"active":true}, function(tabs) {
		var qid = tabs[0].url.split("/").pop().toString();
		$("#url").html("Qid:" + qid);
	
		chrome.storage.sync.get(function(settings){
			for (var k in settings){
				print(k + ": " + settings[k])
			}
			var setting = settings[qid];
			if(typeof setting === 'undefined'){
				$("#select").val(0);
				set_anonymous_or_public(0);
			}
			else{
				$("#select").val(setting);
				set_anonymous_or_public(setting);
			}
		});

		$("#select").change(function(){
			var select = $("#select").val();
			var obj = {};
			obj[qid] = select;
			chrome.storage.sync.set(obj, function(){
				set_anonymous_or_public(select);
			});
		});
	});
}