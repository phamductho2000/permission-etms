import {useCallback, useState} from "react";
import {getAllBySearchZtbMapCqt, getAllZtbMapCqtDto} from "@/services/apis/ztbMapCqtController";

export default function ZtpMapCqt () {
    const [listZtpMapCqt, setZtpMapCqt] = useState<API.ZtbMapCqtDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.ZtbMapCqtDTO) => {
        getAllZtbMapCqtDto().then(resp => {
            setZtpMapCqt(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    const loadDataBySearch = useCallback((pagination: PaginationType, body: API.ZtbMapCqtDTO) => {
        getAllBySearchZtbMapCqt(body).then(resp => {
            setZtpMapCqt(resp);
            setTotal(resp.total ?? null);
        })
    }, []);


    return {listZtpMapCqt, loadData, total,loadDataBySearch}
}
