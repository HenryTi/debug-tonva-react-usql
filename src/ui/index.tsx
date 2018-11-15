import React from 'react';
import { VPage, Page, meInFrame } from 'tonva-tools';
import {AppUI, CApp} from '../ui-usql';
import $unitx from './$unitx';
import devApp from './devApp';
import jkOrder from './jkOrder';
import cart from './cart';
import res from './res';
import { FA } from 'tonva-react-form';
import CardText from 'reactstrap/lib/CardText';
import { CMyApp } from './CMyApp';

class VAppMain extends VPage<CApp> {
    async showEntry(param?:any) {
        this.openPage(this.appPage);
    }

    protected appPage = () => {
        let {caption, cUsqArr} = this.controller;
        let content;
        if (cUsqArr.length === 0) {
            content = <div className="p-3 text-info">
                <FA name="minus-circle" className="text-danger" size="lg" /> &nbsp; 此APP没有绑定任何的USQ
            </div>;
        }
        else {
            content = cUsqArr.map((v,i) => <div key={i}>{v.render()}</div>);
        }
        return <Page header={caption} logout={()=>{meInFrame.unit = undefined}}>
            <div className="p-3">自定义程序界面了。显示这一段，自定义起作用了。可以在这里放置任何内容</div>
            {content}
        </Page>;
    };
}

const ui:AppUI = {
    CApp: CMyApp,
    //App: App,
    //"DevApp/devappApi": DevApp_devappApi,
    res: res,
    main: VAppMain,
    usqs: {
        "$$$/$unitx": $unitx,
        "DevApp/devappApi": devApp,
        "JKDev/jkOrder": jkOrder,
        "百灵威系统工程部/cart": cart,
    }
};


//convertUIKeyToLowercase(ui);

export default ui;
//export { CMyApp } from './CApp';

