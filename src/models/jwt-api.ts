import {useCallback, useState} from "react";
import {addOrUpdateToDataSource} from "@/utils/dataUtil";
import {authenticate} from "@/services/apis/jwtApi";

export default function JwtApi () {
    const [listAuthenticate, setAuthenticate] = useState<API.Login[]>([]);
    const loginAuthenticate = useCallback((body: API.Login, callback?: (success: boolean) => void) => {
        authenticate(body).then(resp => {
            setAuthenticate(resp);
        })
    }, []);

    return {loginAuthenticate}
}
