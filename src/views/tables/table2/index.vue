<template>
	<table-test
		v-bind:table="table"
		v-bind:reqMethod="reqMethod"
	></table-test>
</template>

<script>
	import tableTest from "@/components/Template"
	import {reqMethod} from "@/api/worktip"
	import {worktipTable as table} from "@/constants"

	export default{
		name:"worktip",
		data(){
			return {
				table:table,
				reqMethod:reqMethod
			}
		},
		components: {
			tableTest
		},
	}
</script>

<style>
</style>
