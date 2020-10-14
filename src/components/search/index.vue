<template>
	<el-card class="filter-container" shadow="never">
		<div>
			<i class="el-icon-search search-title"></i>
			<span class="search-title">筛选搜索</span>
			<el-button style="float: right"  type="primary" size="small"  @click="getList">
				查询结果
			</el-button>
			<el-button style="float: right;margin-right: 15px" size="small" @click="handleResetSearch">
				重置
			</el-button>
		</div>
	
		<div style="margin-top: 15px">
			<el-form :inline="true" size="small" label-width="140px">
				<el-form-item :label="item" v-for="(item,index) in searchName" :key="item.Id">
					<el-input style="width: 203px" :placeholder="item" v-model="searchMode[searchValue[index]]"></el-input>
				</el-form-item>
			</el-form>
		</div>
	</el-card>
</template>

<script>
	export default{
		name:"qyc-search",
		data(){
			return {
				
			}
		},
		props:{
			searchName:Array,
			searchValue:Array,
			searchMode:Object,
			getList:Function,
			handleResetSearch:Function
		}
	}
</script>

<style>
	.search-title{
		font-size: 16px;
	}
</style>
