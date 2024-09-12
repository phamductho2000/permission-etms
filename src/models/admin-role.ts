import {useCallback, useState} from "react";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {createAdminRole, deleteAdminRole, getAllAdminRole, updateAdminRole} from "@/services/apis/adminRoleController";

export default function AdminRoleModel () {
    const [listAdminRole, setAdminRole] = useState<API.AdminRoleDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.AdminRoleDTO) => {
        getAllAdminRole().then(resp => {
            setAdminRole(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    const updateadminrole = useCallback((newRecord: API.AdminRoleDTO, callback?: (success: boolean) => void) => {
        updateAdminRole(newRecord).then(resp => {
            setAdminRole(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);

    const createadminrole = useCallback((newRecord: API.AdminRoleDTO, callback?: (success: boolean) => void) => {
        createAdminRole(newRecord).then(resp => {
            setAdminRole(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);

    const deleteadminrole = useCallback((id: string) => {
        deleteAdminRole({id: id}).then(() => {
            setAdminRole(prev => prev.filter(g => g.roleId !== id));
        })
    }, []);

    return {listAdminRole, total, loadData, updateadminrole, createadminrole, deleteadminrole};
}
