import {useCallback, useState} from "react";
import {getAllTblUsers, updateRoleAdminUserDto} from "@/services/apis/tblUsersController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {getAllUserRole, updateUserRole} from "@/services/apis/userRoleController";

export default function UserRole () {
    const [listUserRole, setUserRole] = useState<API.UserRoleDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.UserRoleDTO) => {
        getAllUserRole().then(resp => {
            setUserRole(resp);
            setTotal(resp.total ?? null);
        })
    }, []);
    const updateUserRoles = useCallback((newRecord: API.UserRoleDTO, callback?: (success: boolean) => void) => {
        updateUserRole(newRecord).then(resp => {
            setUserRole(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);

    return {listUserRole, loadData, total,updateUserRoles}
}
