import {useCallback, useState} from "react";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {getAllAdminRoleUser, updateRoleAdminUserDto1,} from "@/services/apis/adminRoleUserController";

export default function AdminRoleUser () {
    const [listAdminRoleUser, setAdminRoleUser] = useState<API.AdminRoleUserDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.AdminRoleUserDTO) => {
        getAllAdminRoleUser().then(resp => {
            setAdminRoleUser(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    const updateadRoleAdmiUserDto = useCallback((newRecord: API.AdminRoleUserDTO, callback?: (success: boolean) => void) => {
        updateRoleAdminUserDto1(newRecord).then(resp => {
            setAdminRoleUser(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);


    return {listAdminRoleUser, loadData, total, updateadRoleAdmiUserDto}
}
