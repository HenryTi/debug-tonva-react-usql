import * as React from 'react';
import {Button} from 'reactstrap';
import {List} from 'tonva-react-form';
import {Page} from 'tonva-tools';
import {Sheet} from '../../entities';
import {EntitiesUIProps, SheetUIProps} from '../../ui';
import {EntitiesUI, SheetUI} from '../../ui';
import {MainDetails, MainDetailsView} from '../tools';
import {SheetView} from './sheetView';

interface State {
    flows: any;
    data: any;
}
export class ArchivedPage extends React.Component<SheetUIProps, State> {
    private mainDetails: MainDetails; 
    constructor(props) {
        super(props);
        this.state = {
            flows: undefined,
            data: undefined,
        }
        this.mainDetails = this.props.ui.mapMainDetails({
            arr1: (row:any) => <div>{JSON.stringify(row)}</div>
        });
    }

    async componentDidMount() {
        let {ui, data} = this.props;
        let sheet = ui.entity;
        let res = await sheet.getArchive(data.id);
        let {brief, data:sheetData, flows} = res;
        this.setState({
            data: sheetData,
            flows: flows
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
        let {ui, data:brief} = this.props;
        let {entity:sheet} = ui;
        /*
        let removed;
        if (brief.state === '-')
            removed = <div className="mx-3 my-2" style={{color:'red'}}>本单据作废</div>;
        let flow;
        if (this.state.res !== undefined) {
            flow = <List className="mx-3" header="流程"
                items={this.state.res[1]}
                item={{}}/>
        }
        */
        return <Page header={sheet.name + ':' + '-' + brief.no}>
            <SheetView className="mx-3 my-2" ui={ui} 
                sheetState={brief.state} 
                sheetData={this.state.data} 
                flows={this.state.flows} />
        </Page>;
    }
}
/*
<pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
<pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
*/