import {useCallback, useState} from "react";
import {getAllZtbMapCqtDto} from "@/services/apis/ztbMapCqtController";

export default function ZtpMapCqt () {
    const [listZtpMapCqt, setZtpMapCqt] = useState<API.ZtbMapCqtDTO[]>([]);
    const [total, setTotal] = useState<any>(10);
    const loadData = useCallback((pagination: PaginationType, body: API.ZtbMapCqtDTO) => {
        getAllZtbMapCqtDto().then(resp => {
            setZtpMapCqt(resp);
            setTotal(resp.total ?? null);
        })
    }, []);

    return {listZtpMapCqt, loadData, total,}
}
