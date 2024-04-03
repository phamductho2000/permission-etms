import {useCallback, useState} from "react";
import {createAdminRole, deleteAdminRole, getAllAdminRole, updateAdminRole} from "@/services/apis/adminRoleController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {getAllMembers} from "@/services/apis/aGroupmembersController";
import {updateRoleAdminFuncDto} from "@/services/apis/adminRoleFunctionController";

export default function groupMember () {
    const [listgroupMember, setgroupMember] = useState<API.AUserPayLoad[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.AUserPayLoad) => {
        getAllMembers().then(resp => {
            setgroupMember(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    const updateAdminFuncDto = useCallback((newRecord: API.AUserPayLoad, callback?: (success: boolean) => void) => {
        updateRoleAdminFuncDto(newRecord).then(resp => {
            setgroupMember(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);

    const createAdminFuncDto = useCallback((newRecord: API.AUserPayLoad, callback?: (success: boolean) => void) => {
        createAdminRole(newRecord).then(resp => {
            setgroupMember(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);

    // const deleteadminrole = useCallback((id: string) => {
    //     deleteAdminRole({id: id}).then(() => {
    //         setgroupMember(prev => prev.filter(g => g.roleId !== id));
    //     })
    // }, []);

    return {listgroupMember, total, loadData, updateAdminFuncDto, createAdminFuncDto};
}
