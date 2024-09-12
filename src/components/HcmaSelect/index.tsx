import {Select} from "antd";
import {SelectProps} from "antd/es/select";
import {filterOption} from "@/utils";
import {useMemo} from "react";

interface HcmaSelectProps extends SelectProps {
    hcmaOptions?: any[],
    hcmaKey?: string
    hcmaLabel?: string | string[]
}
const HcmaSelect: React.FC<HcmaSelectProps> = (props: HcmaSelectProps) => {
    const renderName = (record: any) => {
        if (typeof props.hcmaLabel === 'string') {
            return record[props.hcmaLabel];
        } else {
            if (props.hcmaLabel!.length <= 1) {
                return record[props.hcmaLabel![0]]
            }
            return props.hcmaLabel!.map(n => record[n]).join(' - ');
        }
    }
    const realOptions = useMemo(() => {
        // nếu truyền thẻ option thì lấy đúng thẻ options
        if(props.options?.length) {
            return props.options;
        }

        const b = props.hcmaOptions?.filter(o => !o['danhDauXoa'] || o[props.hcmaKey!] === props.value)
            .map(o => ({ value: o[props.hcmaKey!], label: renderName(o), disabled: !!o['danhDauXoa'] }));
        console.log('bbbbbbbbb', b)
        // nếu truyền vào thẻ hcmaOptions
        return props.hcmaOptions?.filter(o => !o['danhDauXoa'] || o[props.hcmaKey!] === props.value)
            .map(o => ({ value: o[props.hcmaKey!], label: renderName(o), disabled: !!o['danhDauXoa'] }))

    }, [props.options, props.hcmaOptions, props.hcmaKey, props.hcmaLabel, props.value])
    return <Select allowClear showSearch filterOption={filterOption} {...props} options={realOptions} />
}
HcmaSelect.defaultProps = {
    hcmaOptions: [],
    hcmaKey: 'id',
    hcmaLabel: 'ten'
}
export default HcmaSelect;
