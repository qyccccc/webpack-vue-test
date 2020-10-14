<template>
	<div class="app-container">
		<component 
		  v-bind:is="search"
			v-bind:searchName="searchName"
			v-bind:searchValue="searchValue"
			v-bind:searchMode="searchMode"
			v-bind:getList="getList"
			v-bind:handleResetSearch="handleResetSearch"
		></component >
		
		<qyc-operate-button
			v-bind:handleDel="handleDel"
			v-bind:handleEdit="handleEdit"
			v-bind:handleAdd="handleAdd"
		></qyc-operate-button>
		
		<QycTable
			v-bind:list="list"
			v-bind:listLoading="listLoading"
			v-bind:handleSelectionChange="handleSelectionChange"
			v-bind:cellName="cellName"
			v-bind:cellValue="cellValue"
		></QycTable>
		
		<qyc-pagination
			v-bind:getList="getList"
			v-on:page-change="listQuery.pageNum=$event;"
			v-on:size-change="listQuery.pageSize=$event;"
			v-bind:total="total"
		></qyc-pagination>
		
		<qyc-add
			v-bind:title="title"
			v-bind:cellName="cellName"
			v-bind:cellValue="cellValue"
			v-bind:addDialogVisible="addDialogVisible"
			v-on:add-confirm="handleAddConfirm"
			v-bind:obj="obj"
			v-on:add-cancle="addDialogVisible=false"
		></qyc-add>
		
		<qyc-edit
			v-bind:title="title_edit"
			v-bind:cellName="cellName"
			v-bind:cellValue="cellValue"
			v-bind:editDialogVisible="editDialogVisible"
			v-bind:handleEditConfirm="handleEditConfirm"
			v-on:edit-cancle="editDialogVisible=false"
			v-bind:obj="obj_edit"
		></qyc-edit>
	</div>
</template>

<script>
	import {formatDate} from '@/utils/date';
	import {swalDel, editSel,delSel} from '@/utils/alert';
	import {eventHandle} from '@/utils/event';
	//import QycSearch from '@/components/search'
	import QycTable from '@/components/table'
	import QycPagination from '@/components/table/pagination'
	import QycAdd from '@/components/table/add'
	import QycEdit from '@/components/table/edit'
	import QycOperateButton from '@/components/operate'
	
	export default{
		name:'table-test',
		props:{
			table:Object,
			reqMethod:Object
		},
		components:{QycTable,QycPagination,QycAdd,QycEdit,QycOperateButton},
		data(){
			return {
				listLoading:false,
				list:[],
				total:null,
				addDialogVisible:false,
				editDialogVisible:false,
				listQuery:Object.assign({},this.table.defaultListQuery),
				obj:Object.assign({},this.table.defaultDuty),
				obj_edit:Object.assign({},this.table.defaultDuty_edit),
				sel:[],
				cellName:this.table.cellName,
				cellValue:this.table.cellValue,
				title:"添加"+this.table.name,
				title_edit:"修改"+this.table.name,
				searchName:this.table.searchName,
				searchValue:this.table.searchValue,
				searchMode:Object.assign({},this.table.defaultSearchMode),
				search:''
			}
		},
		mounted(){
			this.getList();
			if(this.searchName.length!==0){
				import('@/components/search').then((item)=>{
					this.search = item.default;
				})
			}
		},
		methods:{
			getList(){
				this.listLoading = true;
				let params = new URLSearchParams();
				params.append('rows',this.listQuery.pageSize);
				params.append('page',this.listQuery.pageNum);

				this.searchValue.map(item=>{
					//this.searchMode[item]&&params.append(item,this.searchMode[item]);
					params.append(item,this.searchMode[item]);
				})
				this.reqMethod.queryList(params).then(response => {
					this.listLoading = false;
					this.list = response.data.data.rows;
					this.total = response.data.data.TotalCount;
				}).catch(err=>{
					this.listLoading = false;
				})
			},
			handleSelectionChange(val){
				this.sel = val;
			},
			handleResetSearch(){
				this.searchMode = Object.assign({},this.table.defaultSearchMode);
			},
			handleAdd(){
				this.addDialogVisible=true;
				this.obj=Object.assign({},this.table.defaultDuty);
			},
			handleAddConfirm(){
				let callFun = function(){
					this.addDialogVisible=false;
					this.getList();
				}
				eventHandle(this.reqMethod.add(this.obj), callFun.bind(this), ["data","success"]);
			},
			handleEdit(){
				let callFun = function(){
					this.editDialogVisible=true;
					this.obj_edit=Object.assign({},this.sel[0]);
				}
				editSel(this.sel,this.obj_edit,callFun.bind(this))
			},
			handleEditConfirm(){
				let callFun = function(){
					this.editDialogVisible=false;
					this.getList();
				}
				eventHandle(this.reqMethod.edit(this.obj_edit), callFun.bind(this), ["data","success"]);
			},
			handleDel(){
				let callFun = function(){
					swalDel().then(result => {
						if(result.isConfirmed){
							let arr = [];
							this.sel.map(item=>{
								arr.push(item.Id)
							});
							let callFun = function(){
								this.getList();
							}
							eventHandle(this.reqMethod.del(arr), callFun.bind(this), ["data","success"]);
						}
					});
				}
				delSel(this.sel,callFun.bind(this));
			}
		},
		filters:{
			formatTime(time) {
				if(time==null||time===''){
					return 'N/A';
				}
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
			},
		}
	}

</script>

<style>
</style>
