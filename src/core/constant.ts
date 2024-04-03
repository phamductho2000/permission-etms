export const APPLICATION_CONTEXT = "/dmdc";

export const PUBLIC_PATH = `/authenticate`;
export const LOGIN_PATH = `/authenticate`;
export const CHOOSE_ORG_PATH = `/authenticate/choose-org`;
export let intl: any = undefined;
export const setIntl = (intlP: any) => {
    intl = intlP;
}
export const formatInputNumber = {
    formatter: (vf: any) => `${vf}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
    parser: (p: any) => p?.replace(/\$\s?|(\.*)/g, ''),
    precision: 0,
    decimalSeparator: '.',
};
export const fullDateFormat = 'DD/MM/YYYY HH:mm:ss'
export const sortDateFormat = 'DD/MM/YYYY'
export const UNPAGED = {
    page: 0,
    size: 0
}
