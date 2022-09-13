import { GridDataResult } from "@progress/kendo-angular-grid";

export interface kedoGrid extends GridDataResult{
     total:number;
     data:any[];

  }
  export interface DatatableOptions {
   sortDirection: string;
   sortColumn: string;
   pageIndex: number;
   pageSize: number;
   searchKey: string;  
   filters: Array<KeyValuePair>;
}
export interface KeyValuePair{
   Key:string;
   Value:string;
}