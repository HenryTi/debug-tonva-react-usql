var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { FA } from 'tonva-react-form';
import { VmForm } from './form';
import { VmPage } from './vmPage';
export class VmEntity extends VmPage {
    constructor(crUsq, entity, ui) {
        super();
        this.navVm = (vmType, param) => __awaiter(this, void 0, void 0, function* () {
            yield this.crUsq.navVm(vmType, this.entity, this.ui, param);
        });
        this.crUsq = crUsq;
        this.entity = entity;
        this.ui = ui;
        this.label = this.getLabel();
        this.init();
    }
    init() { }
    getRes() {
        return this.ui && this.ui.res;
    }
    getLabel() {
        let res = this.getRes();
        return (res && res.label) || (this.ui && this.ui.label) || this.entity.name;
    }
    createVmFieldsForm() {
        let ret = this.newVmFieldsForm();
        ret.init(this.fieldsFormOptions);
        return ret;
    }
    newVmFieldsForm() {
        return new VmForm();
    }
    get fieldsFormOptions() {
        let { fields, arrFields } = this.entity;
        return {
            fields: fields,
            arrs: arrFields,
            crUsq: this.crUsq,
            ui: this.ui && this.ui.res,
        };
    }
    start(param) {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadSchema();
            yield _super("start").call(this, param);
        });
    }
    get icon() { return vmLinkIcon('text-info', 'circle-thin'); }
    loadSchema() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.entity.loadSchema();
        });
    }
    typeVmTuidControl(field, tuid) {
        return this.crUsq.typeVmTuidControl(tuid);
    }
    typeTuidContent(field, tuid) {
        return this.crUsq.typeTuidContent(tuid);
    }
    pickerConfig(field, tuid) {
        return this.crUsq.pickerConfig(tuid);
    }
}
export function vmLinkIcon(cls, faName) {
    return React.createElement(FA, { className: cls, size: "lg", name: faName, fixWidth: true });
}
//# sourceMappingURL=vmEntity.js.map