import * as React from 'react';
import { observer } from 'mobx-react';

export type TypeViewModel = typeof ViewModel;
export type TypeView = React.StatelessComponent<{vm: ViewModel, className?:string|string[]}>;
export type TypeContent = React.StatelessComponent<any>;

export abstract class ViewModel {
    async loadSchema():Promise<void> {}
    protected view: TypeView;
    render(className?:string|string[]):JSX.Element {
        if (this.view === undefined) return <div>??? viewModel 必须定义 view ???</div>
        return React.createElement(this.view, {vm: this, className:className});
    }
}

export const JSONContent = observer(
    (values) => <>content: {JSON.stringify(values)}</>
);
export const RowContent = 
    (values) => <div className="px-3 py-2">Row: {JSON.stringify(values)}</div>
;
