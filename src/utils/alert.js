import Swal from 'sweetalert2'
import { Message } from 'element-ui';

export function swal(option) {
  Swal.fire({
    title: option.title||"",
    text: option.text||"",
    icon: option.icon||"success",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '确认'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '操作成功!',
        'success'
      )
    }
  })
}

export function swalSucess(){
	return Swal.fire({
		title:'操作成功!',
		icon:'success',
		confirmButtonText: '确认'
	})
}

export function swalFail(){
	return Swal.fire({
		title:'操作失败!',
		icon:'error',
		confirmButtonText: '确认'
	})
}

export function swalDel(){
	return Swal.fire({
	  title: "删除信息",
	  text: "是否确认删除？",
	  icon: "warning",
	  showCancelButton: true,
	  confirmButtonColor: '#d33',
	  cancelButtonColor: '#3085d6',
	  confirmButtonText: '确认'
	})
}

export function editSel(arr,obj,callFun){
	if(arr.length===0){
		Message({
			message: '请选择要编辑的某一行',
			type: 'warning',
			center: true,
			offset:100
		});
	}else if(arr.length>1){
		Message({
			message: '最多选择一行',
			type: 'warning',
			center: true,
			offset:100
		});
	}else{
		callFun();
	}
}

export function delSel(arr,callFun){
	if(arr.length===0){
		Message({
			message: '请选择要删除的某一行',
			type: 'warning',
			center: true,
			offset:100
		});
	}else{
		callFun();
	}
}