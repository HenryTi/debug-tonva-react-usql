import {observable, IObservableArray} from 'mobx';
import {Field, ArrFields} from './entities';
import {Entity} from './entity';

export type QueryPageApi = (name:string, pageStart:any, pageSize:number, params:any) => Promise<string>;
export class Query extends Entity {
    get typeName(): string { return 'query';}
    private pageStart: any;
    private pageSize:number;
    private params:any;
    private more: boolean;
    private startField: Field;
    protected queryApiName = 'page';
    //@observable loaded: boolean;
    @observable list:IObservableArray; // = observable.array([], {deep: false});
    returns: ArrFields[];
    isPaged: boolean;

    setSchema(schema:any) {
        super.setSchema(schema);
        let {returns} = schema;
        this.returns = returns;
        this.isPaged = (returns as any[]).find(v => v.name === '$page') !== undefined;
    }

    resetPage(size:number, params:any) {
        this.pageStart = undefined;
        this.pageSize = size;
        this.params = params;
        this.more = false;
        this.list = undefined;
    }
    get hasMore() {return this.more;}
    async loadPage():Promise<void> {
        if (this.pageSize === undefined) {
            throw 'call resetPage(size:number, params:any) first';
        }
        let pageStart:any;
        if (this.pageStart !== undefined) {
            switch (this.startField.type) {
                default: pageStart = this.pageStart; break;
                case 'date':
                case 'time':
                case 'datetime': pageStart = (this.pageStart as Date).getTime(); break;
            }
        }
        await this.loadSchema();
        let res = await this.tvApi.queryPage(this.queryApiName, this.name, pageStart, this.pageSize+1, this.params);
        let data = await this.unpackReturns(res);
        this.list = observable.array([], {deep: false});
        let page = data['$page'] as any[];
        if (page !== undefined) {
            if (page.length > this.pageSize) {
                this.more = true;
                page.pop();
                let ret = this.returns.find(r => r.name === '$page');
                this.startField = ret.fields[0];
                this.pageStart = page[page.length-1][this.startField.name];
            }
            else {
                this.more = false;
            }
            this.list.push(...page);
        }
        //this.loaded = true;
    }

    async page(params:any, pageStart:any, pageSize:number):Promise<any[]> {
        await this.loadSchema();
        let res = await this.tvApi.queryPage(this.queryApiName, this.name, pageStart, pageSize+1, params);
        let data = await this.unpackReturns(res);
        return data.$page;// as any[];
    }
    async query(params:any):Promise<any> {
        await this.loadSchema();
        let res = await this.tvApi.query(this.name, params);
        let data = await this.unpackReturns(res);
        return data;
    }
}
