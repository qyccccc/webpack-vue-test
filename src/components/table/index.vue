<template>
	<div class="table-container">
		<el-table ref="returnApplyTable"
							:data="list"
							style="width: 100%;"
							@selection-change="handleSelectionChange"
							v-loading="listLoading" border>
			<el-table-column type="selection" width="60" align="center"></el-table-column>
			<el-table-column align="center" v-for="(item,index) in cellName" :label="item" :key ="item.Id">
				<template v-slot="scope">{{scope.row[cellValue[index]]}}</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	export default{
		name:"qyc-table",
		data(){
			return {
				
			}
		},
		props:{
			list:Array,
			listLoading:Boolean,
			handleSelectionChange:Function,
			cellName:Array,
			cellValue:Array
		}
	}
</script>

<style>
</style>
