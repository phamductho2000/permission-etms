// import {me} from "@/services/apis/userController";
// import {getAllDmHeThong} from "@/services/apis/dmHeThongController";
// import {getFunctionIdUngDung} from "@/services/apis/qthtChucnangController";
import {UNPAGED} from "@/core/constant";
import {useModel} from "@@/exports";
import {lowerFirst} from "lodash-es";
// const {initialState, setInitialState} = useModel('@@initialState');

export type GlobalStateType = {
    roleAccess: string[],
    // dmHeThong: API.DmHeThongDTO[]
}
// export let currentUser: API.CurrentUser | undefined = undefined;
export const getGlobalState = () => {
    const {initialState, setInitialState} = useModel('@@initialState');
    console.log('initialState', initialState)
    // // step 1: Load user info
    // const loadCurrentUserResponse = await me();
    // const currUser = loadCurrentUserResponse.data;
    // currentUser = currUser;
    // if (!currUser?.idCoSoDaoTao) {
    //     return { currentUser: currUser }
    // }
    //
    // const response = await Promise.all([
    //     getFunctionIdUngDung({idUngDung: APPLICATION_ID}),
    //     getAllDmHeThong(UNPAGED)
    // ]);
    // const globalState: GlobalStateType = {
    //     roleAccess: response[0].data.filter(a => a.maPhanQuyen).map(a => a.maPhanQuyen!),
    //     dmHeThong: response[1].data
    // };
    // return {currentUser: currUser, globalState};
    return initialState;
}
