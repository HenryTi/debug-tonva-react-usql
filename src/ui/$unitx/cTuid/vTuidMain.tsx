import * as React from 'react';
import { VTuidMain } from "tonva-react-uq";
import { Page } from 'tonva-tools';
import { SearchBox, List, Muted } from 'tonva-react-form';

export class MyVTuidMain extends VTuidMain {
    protected get view() {
        let {label, proxyLinks} = this.controller;
        return () => <Page header={label}>
            {proxyLinks === undefined ?
            <>
                <SearchBox className="w-100" onSearch={this.onSearch} placeholder={'搜索'+label} />
                改写的TuidMain
                <div className='my-3'>
                    <button className="ml-3 btn btn-primary" onClick={this.onNew}>新增</button>
                    <button className="ml-3 btn btn-primary" onClick={this.onList}>列表</button>
                </div>
            </> :
            <List className="my-2"
                header={<Muted>{label} 代理下列Tuid</Muted>}
                items={proxyLinks}
                item={{render: this.entityRender, onClick:this.entityClick}} />
            }
        </Page>;
    }
}