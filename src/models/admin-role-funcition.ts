import {useCallback, useState} from "react";
import {getAllAdminRoleFunction, updateRoleAdminFuncDto} from "@/services/apis/adminRoleFunctionController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";

export default function adminRoleFuncition () {

    const [listAdminRoleFunction, setAdminRoleFunction] = useState<API.AdminRoleFunctionDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.AdminRoleFunctionDTO) => {
        getAllAdminRoleFunction().then(resp => {
            setAdminRoleFunction(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    const updateadRoleAdminFuncDto = useCallback((newRecord: API.AdminRoleFunctionDTO, callback?: (success: boolean) => void) => {
        updateRoleAdminFuncDto(newRecord).then(resp => {
            setAdminRoleFunction(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);


    return {listAdminRoleFunction, loadData, total, updateadRoleAdminFuncDto}

}
