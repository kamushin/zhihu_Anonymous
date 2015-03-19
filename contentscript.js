xsrf = $("input[name='_xsrf']").attr("value")
qid  = $("#zh-question-detail").attr("data-resourceid")
set_anonymous_url = "http://www.zhihu.com/question/set_anonymous"
set_public_url = "http://www.zhihu.com/question/set_public"
data = {'qid': qid, "_xsrf": xsrf}



function set_anonymous(){
	$.post(set_anonymous_url, data)
}
function set_public(){
	$.post(set_public_url, data)
}
