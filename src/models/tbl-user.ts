import {useCallback, useState} from "react";
import {getAllBySearch, getAllTblUsers, updateRoleAdminUserDto} from "@/services/apis/tblUsersController";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {getAllUserRole1, grantByUser1} from "@/services/apis/aUserRoleController";

export default function tblUser () {
    const [listTblUsers, setlistTblUsers] = useState<API.TblUsersDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const getAll = useCallback((pagination: PaginationType, body: API.TblUsersDTO) => {
        getAllUserRole1().then(resp => {
            setlistTblUsers(resp);
            setTotal(resp.total ?? null);
        })
    }, []);
    const loadData = useCallback((pagination: PaginationType, body: API.TblUsersDTO) => {
        getAllBySearch(body).then(resp => {
            setlistTblUsers(resp);
            setTotal(resp.total ?? null);
        })
    }, []);
    const updateTblUsers = useCallback((newRecord: API.AUserPayLoad, callback?: (success: boolean) => void) => {
        grantByUser1(newRecord).then(resp => {
            setlistTblUsers(prev => addOrUpdateToDataSource(prev, resp, 'id'));
            callback?.(resp.success ? resp.success : false)
        })
    }, []);

    return {listTblUsers, loadData, total,updateTblUsers, getAll}
}
