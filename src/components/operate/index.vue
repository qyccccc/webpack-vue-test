<template>
	<el-card class="operate-container" shadow="never">
		<i class="el-icon-tickets search-title"></i>
		<span class="search-title">数据列表</span>
		<el-button
			class="btn-operate btn-del"
			type="danger"
			@click="handleDel"
			icon="el-icon-delete"
			round>
			删除
		</el-button>
		<el-button
			class="btn-operate"
			type="success"
			@click="handleEdit"
			icon="el-icon-edit"
			round
			round>
			修改
		</el-button>
		<el-button
			class="btn-operate"
			type="primary"
			@click="handleAdd"
			icon="el-icon-circle-plus-outline"
			round>
			添加
		</el-button>
	</el-card>
</template>

<script>
	export default{
		name:"qyc-operate-button",
		data(){
			return {
				
			}
		},
		props:{
			handleDel:Function,
			handleEdit:Function,
			handleAdd:Function,
		}
	}
</script>

<style>
</style>
