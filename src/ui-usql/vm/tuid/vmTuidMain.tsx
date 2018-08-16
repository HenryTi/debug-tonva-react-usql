import * as React from 'react';
import { SearchBox, List, Muted } from 'tonva-react-form';
import { Button } from 'reactstrap';
import { Tuid, Entity } from '../../entities';
import { Page } from 'tonva-tools';
import { VmTuidEdit } from './vmTuidEdit';
import { VmTuid } from './vmTuid';
import { VmTuidList } from './vmTuidList';
import { VmEntityLink, TypeLink } from '../link';
import { Vm, Vm_Entity } from '../VM';
import { CrTuid } from './crTuid';
import { VmEntity, EntityUI } from '../vmEntity';
import { CrUsq } from '../crUsq';

export class VmTuidMain extends Vm_Entity<Tuid> {
    protected coordinator: CrTuid;
    onNew = () => this.resolve('new'); //this.coordinator.navVm(VmTuidEdit);
    onList = () => this.resolve('list'); // this.coordinator.navVm(VmTuidList);
    onSearch = async (key:string) => this.resolve('list', key) //await this.coordinator.navVm(VmTuidList, key);

    protected async showEntryPage(param?:any):Promise<void> {
        this.open(this.view);
    }

    private entityRender(link: VmEntityLink, index: number): JSX.Element {
        return link.render();
    }

    async entityClick(link: VmEntityLink) {
        await link.onClick();
    }

    protected get view() {
        let {label, proxyLinks} = this.coordinator;
        return () => <Page header={label}>
            {proxyLinks === undefined ?
            <>
                <SearchBox className="w-100" onSearch={this.onSearch} placeholder={'搜索'+label} />
                <div className='my-3'>
                    <Button className="ml-3" color="primary" onClick={this.onNew}>新增</Button>
                    <Button className="ml-3" color="primary" onClick={this.onList}>列表</Button>
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
/*
const MainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, onNew, onList, onSearch} = vm;
    return <Page header={label}>
        <SearchBox className="w-100" onSearch={onSearch} placeholder={'搜索'+label} />
        <div className='my-3'>
            <Button className="ml-3" color="primary" onClick={onNew}>新增</Button>
            <Button className="ml-3" color="primary" onClick={onList}>列表</Button>
        </div>
    </Page>;
}
        
const ProxyMainPage = ({vm}:{vm:VmTuidMain}) => {
    let {label, crUsq, entity, entityClick, entityRender, proxies} = vm;
    let arr:string[] = [];
    for (let i in proxies) {
        arr.push(i);
    }
    return <Page header={label}>
        <List className="my-2"
            header={<Muted>{label} 代理下列Tuid</Muted>}
            items={arr.map(v => crUsq.vmLinkFromName('tuid', v))}
            item={{render: entityRender, onClick:entityClick}} />
    </Page>
}
*/