import {paramsReq, dataReq} from "@/api/base"
import {dutyReq as obj} from "@/constants"

const queryList = paramsReq(obj.QUERY_URL,obj.QUERY_METHOD);
const add = dataReq(obj.ADD_URL,obj.ADD_METHOD);
const edit = dataReq(obj.EDIT_URL,obj.EDIT__METHOD);
const del = dataReq(obj.DEL_URL,obj.DEL_METHOD);

export {queryList, add, edit, del}
