import * as React from 'react';
import {Button} from 'reactstrap';
import {Page} from 'tonva-tools';
import {Sheet} from '../tv';
import {unpackSheet} from '../packData';

interface Props {
    sheet: Sheet;
    brief: any;
}
interface State {
    res: any;
    data: any;
}
export class ArchivedPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            res: undefined,
            data: undefined
        }
    }

    componentDidMount() {
        let sheet = this.props.sheet;
        sheet.getArchive(this.props.brief.id).then(res => {
            let ret = res[0];
            let data;
            if (ret.length === 1) {
                data = unpackSheet(sheet.schema, ret[0].data);
            }
            this.setState({
                data: data,
                res: res
            });
        });
    }
    mapper(row:any, index:number) {
        return <li key={index}>id:{row.id}, no:{row.no}, discription:{row.discription}, date:{row.date}</li>
    }
    render() {
        let {brief} = this.props;
        let removed;
        if (brief.state === '-')
            removed = <div style={{color:'red'}}>已删除</div>;
        return <Page header={this.props.sheet.props.name + ':' + '-' + brief.no}>
            {removed}
            <pre>{JSON.stringify(this.state.data, undefined, ' ')}</pre>
            <pre>{JSON.stringify(this.state.res, undefined, ' ')}</pre>
        </Page>;
    }
}
