export const worktipTable= {
	//页面，添加弹框，修改弹框名称
	name:"工作提醒",
	//分页相关
	defaultListQuery:{
		pageNum: 1,
		pageSize: 5,
	},
	//添加对象模型
	defaultObj:{
		Tip: "",
		Comment: "",
		TipType: ""
	},
	//修改对象模型
	defaultObj_edit:{
		Id: "",
		Tip: "",
		Comment: "",
		TipType: ""
	},
	//查询参数模型
	defaultSearchMode:{

	},
	//查询参数中文label
	searchName:[],
	//查询参数名
	searchValue:[],
	//表格列名
	cellName:["内容","备注","消息类型"],
	//表格列参数名
	cellValue:["Tip","Comment","TipType"]
} 