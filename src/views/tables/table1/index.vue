<template>
	<div class="app-container">
		<qyc-search
			v-bind:searchName="searchName"
			v-bind:searchValue="searchValue"
			v-bind:searchMode="searchMode"
			v-bind:getList="getList"
			v-bind:handleResetSearch="handleResetSearch"
		></qyc-search>
		
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
			v-bind:obj="duty"
			v-on:add-cancle="addDialogVisible=false"
		></qyc-add>
		
		<qyc-edit
			v-bind:title="title_edit"
			v-bind:cellName="cellName"
			v-bind:cellValue="cellValue"
			v-bind:editDialogVisible="editDialogVisible"
			v-bind:handleEditConfirm="handleEditConfirm"
			v-on:edit-cancle="editDialogVisible=false"
			v-bind:obj="duty_edit"
		></qyc-edit>
	</div>
</template>

<script>
	import {queryList, add, edit, del} from "@/api/duty"
	import {formatDate} from '@/utils/date';
	import {swalDel} from '@/utils/alert';
	import {eventHandle} from '@/utils/event';
	import QycSearch from '@/components/search'
	import QycTable from '@/components/table'
	import QycPagination from '@/components/table/pagination'
	import QycAdd from '@/components/table/add'
	import QycEdit from '@/components/table/edit'
	import QycOperateButton from '@/components/operate'
	
	import {dutyTable as table} from "@/constants"
	
	const defaultListQuery = table.defaultListQuery;
	
	const defaultDuty = table.defaultObj;
	
	const defaultDuty_edit = table.defaultObj_edit;
	
	const defaultSearchMode = table.defaultSearchMode;
	
	const searchName = table.searchName;
	const searchValue = table.searchValue;
	
	const cellName = table.cellName;
	const cellValue = table.cellValue;
	
	export default{
		name:'table-test',
		components:{QycSearch,QycTable,QycPagination,QycAdd,QycEdit,QycOperateButton},
		data(){
			return {
				listLoading:true,
				list:[],
				total:null,
				addDialogVisible:false,
				editDialogVisible:false,
				listQuery:Object.assign({},defaultListQuery),
				duty:Object.assign({},defaultDuty),
				duty_edit:Object.assign({},defaultDuty_edit),
				sel:[],
				cellName:cellName,
				cellValue:cellValue,
				title:"添加值班信息",
				title_edit:"修改值班信息",
				searchName:searchName,
				searchValue:searchValue,
				searchMode:Object.assign({},defaultSearchMode),
			}
		},
		mounted(){
			this.getList();
		},
		methods:{
			getList(){
				this.listLoading = true;
				let params = new URLSearchParams();
				params.append('rows',this.listQuery.pageSize);
				params.append('page',this.listQuery.pageNum);
				searchValue.map(item=>{
					//this.searchMode[item]&&params.append(item,this.searchMode[item]);
					params.append(item,this.searchMode[item]);
				})
				queryList(params).then(response => {
					this.listLoading = false;
					this.list = response.data.data.rows;
					this.total = response.data.data.TotalCount;
				}).catch(err=>{
					this.listLoading = false;
					console.log(err)
				})
			},
			handleSelectionChange(val){
				this.sel = val;
			},
			handleResetSearch(){
				this.searchMode = Object.assign({},defaultSearchMode);
			},
			handleAdd(){
				this.addDialogVisible=true;
				this.duty=Object.assign({},defaultDuty);
			},
			handleAddConfirm(){
				let callFun = function(){
					this.addDialogVisible=false;
					this.getList();
				}
				
				eventHandle(add(this.duty), callFun.bind(this), ["data","success"]);
			},
			handleEdit(){
				if(this.sel.length===0){
					this.$message({
						message: '请选择要编辑的某一行',
						type: 'warning',
						center: true,
						offset:100
					});
				}else if(this.sel.length>1){
					this.$message({
						message: '最多选择一行',
						type: 'warning',
						center: true,
						offset:100
					});
				}else{
					this.editDialogVisible=true;
					this.duty_edit=Object.assign({},this.sel[0]);
				}
			},
			handleEditConfirm(){
				let callFun = function(){
					this.editDialogVisible=false;
					this.getList();
				}
				
				eventHandle(edit(this.duty_edit), callFun.bind(this), ["data","success"]);
			},
			handleDel(){
				swalDel().then(result => {
					if(result.isConfirmed){
						let arr = [];
						this.sel.map(item=>{
							arr.push(item.Id)
						});
						let callFun = function(){
							this.getList();
						}
						eventHandle(del(arr), callFun.bind(this), ["data","success"]);
					}
				});
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
	.search-title{
		font-size: 16px;
	}
	.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 100%;
	}
</style>
