<template>
	<el-dialog
		:title="title"
		:visible.sync="addDialogVisible" width="30%">
		<el-form :model="obj"
						 label-width="150px">
			<el-form-item v-for="(item,index) in cellName" :key ="item.Id" :label="item">
				<el-input v-model="obj[cellValue[index]]" class="input-width" v-if="item.indexOf('时间')===-1"></el-input>
			
				<el-date-picker
					v-if="item.indexOf('时间')!==-1"
					v-model="obj[cellValue[index]]"
					type="datetime"
					placeholder="选择日期时间">
				</el-date-picker>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="$emit('add-cancle')">取 消</el-button>
			<el-button type="primary" @click="$emit('add-confirm')">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default{
		name:"qyc-add",
		data(){
			return {
				
			}
		},
		props:{
			title:String,
			addDialogVisible:Boolean,
			obj:Object,
			cellName:Array,
			cellValue:Array,
		}
	}
</script>

<style>
	.el-date-editor.el-input, .el-date-editor.el-input__inner{
		width: 100%;
	}
</style>
