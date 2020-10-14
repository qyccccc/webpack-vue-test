import {swalSucess, swalFail} from '@/utils/alert';

export function eventHandle(fun,callFun,cond){
	fun.then(response=>{
		const flag = cond.reduce(function(prev, cur, index){
			return prev[cur]
		},response)
		if(flag){
			callFun&&callFun();
			// swalSucess().then((result)=>{
			// 	callFun&&callFun();
			// });
		}else{
			swalFail();
		}
	}).catch(err=>{
		console.log(err)
		swalFail();
	});
}