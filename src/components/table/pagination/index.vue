<template>
	<div class="pagination-outer">
		<div class="pagination-container">
			<el-pagination
				background
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				layout="total, sizes,prev, pager, next,jumper"
				:current-page.sync="listQuery.pageNum"
				:page-size="listQuery.pageSize"
				:page-sizes="[5,10,15]"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	const defaultListQuery = {
		pageNum: 1,
		pageSize: 5,
	};
	export default{
		name:"qyc-pagination",
		data(){
			return {
				listQuery:Object.assign({},defaultListQuery)
			}
		},
		methods:{
			handleSizeChange(val){
				this.$emit('size-change',val);
				this.getList();
			},
			handleCurrentChange(val){
				this.$emit('page-change',val);
				this.getList();
			}
		},
		props:{
			getList:Function,
			total:Number
		}
	}
</script>

<style>
</style>
