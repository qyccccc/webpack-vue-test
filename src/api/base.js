import request from '@/utils/request'

export function paramsReq(url,method) {
  return function(params){
		return request({
		  url: url,
		  method: method,
			params:params
		})
	}
}

export function dataReq(url,method) {
  return function(data){
		return request({
		  url: url,
		  method: method,
			data:data
		})
	}
}

export function baseReq(obj){
	//此处可添加axios三种传值方式判断
	return {
		queryList : paramsReq(obj.QUERY.URL,obj.QUERY.METHOD),
		add : dataReq(obj.ADD.URL,obj.ADD.METHOD),
		edit : dataReq(obj.EDIT.URL,obj.EDIT.METHOD),
		del : dataReq(obj.DEL.URL,obj.DEL.METHOD)
	}
}
