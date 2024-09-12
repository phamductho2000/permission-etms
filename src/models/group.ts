import {useCallback, useState} from "react";
import {getAllGroups} from "@/services/apis/aGroupsController";
import {updateRoleAdminFuncDto} from "@/services/apis/adminRoleFunctionController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {grantByUser} from "@/services/apis/aGroupmembersController";

export default function group () {
    const [listgroup, setgroup] = useState<API.AUserPayLoad[]>([]);
    const [total1, setTotal] = useState<any>(10);
    const loadData1 = useCallback((pagination: PaginationType, body: API.AUserPayLoad) => {
        getAllGroups().then(resp => {
            setgroup(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    const updateGrantByUser = useCallback((newRecord: API.AUserPayLoad, callback?: (success: boolean) => void) => {
        grantByUser(newRecord).then(resp => {
            setgroup(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);


    return {listgroup, total1, updateGrantByUser, loadData1};
}
