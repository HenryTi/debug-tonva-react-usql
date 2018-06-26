import * as React from 'react';
import { Tuid, Action, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity';
import { Page, nav, } from 'tonva-tools';
import { VmApi } from '../vmApi';
import { observer } from '../../../../node_modules/mobx-react';

export class VmAction extends VmEntity {
    entity: Action;

    get icon() {return vmLinkIcon('text-success', 'hand-o-right')}

    async load() {
        await this.entity.loadSchema();
        this.buildObservableValues(this.entity.schema.fields);
    }

    async submit() {
        this.returns = await this.entity.submit(this.values);
        nav.pop();
        nav.push(<ResultPage vm={this} />);
        return;
    }

    renderForm(className?:string) {
        let fieldUIs:any[] = undefined;
        let vmForm = this.newVmForm(this.values, 
            this.entity.schema.fields, fieldUIs, className);
        return vmForm.renderView();
    }

    renderView() {
        return <ActionPage vm={this} />;
    }
}

@observer
export class ActionPage extends React.Component<{vm:VmAction}> {
    render() {
        let {vm} = this.props;
        let {caption, values} = this.props.vm;
        return <Page header={caption}>
            {vm.renderForm('mx-3 my-2')}
        </Page>;
    }
}

class ResultPage extends React.Component<{vm: VmAction}> {
    render() {
        let {vm} = this.props;
        let {caption, entity, returns} = vm;
        return <Page header={caption} back="close">
            完成！
            <pre>
                {JSON.stringify(returns, undefined, ' ')}
            </pre>
        </Page>
    }
}
