import {TableProps} from "antd";
import {ColumngroupType, ColumnType} from "antd/es/table/interface";
import {ReactElement} from "react";


export interface TableEditableProps extends TableProps {
    rowKey: any,
    onChangeData: (data: any[]) => void,
    columnsEditable: EditableColumnsType[]
    disabled?: boolean,
    treeTable?: boolean,
    parentKey?: string,
    showAdvancedAction?: boolean,
    showSummary?: boolean
}
export interface TableEditableContextProps extends TableEditableProps {
    cellEdited?: CellEditedType

    cellsSelected?: SelectedPos,
    flatDataSource: any[]
}

export type ColumnTypes = Exclude<TableEditableProps['columns'], undefined>;
export type DataType = 'text' | 'number' | 'datetime' | 'select' | 'checkbox' | 'autocomplete';
export type InputRenderType = {
    field: any,
    record?: any,
    dataSource?: any[]
    onBlur: React.FocusEventHandler<HTMLInputElement>
    onKeyDown: React.KeyboardEventHandler,
    defaultValue: any,
    variant: any,
}
export type EditableColumnsType = (ColumngroupType<any> | ColumnType<any>) & {
    editable?: boolean;
    record?: any;
    dataType?: DataType,
    options?: any[],
    dataIndex?: any,
    pattern?: any,
    max?: number,
    alwaysShowEdit?: boolean, // luôn luôn hiển thị dạng edit
    checkEditable?: (record: any, fieldName: string) => boolean,
    inputRender?: (ref: any, props: InputRenderType) => ReactElement,
    minWidth?: number | string,
    isTitleSummary?: boolean,
    isSummary?: boolean
}
export type EditableColumnsProps = EditableColumnsType & {
    record?: any,
    dataSource: any,
    children?: React.ReactNode,
    handleSave?: (row: any) => void,
}
export type PasteType = {
    rowId: string,
    fieldName: string,
    value: string[][]
}
export interface Position {
    x: number,
    y: number
}
export interface SelectedPos {
    from: Position
    to: Position
}
export interface CellSelectedType {
    rowId: string,
    fieldName: string
}

export interface CellEditedType extends Position {
    action: 'keydown' | 'double-click',
    keydown?: any
}
export type CellIdType = {
    _rowIndex: number,
    _rowId: string,
    _cellIndex: number,
    _cellName: string
}
