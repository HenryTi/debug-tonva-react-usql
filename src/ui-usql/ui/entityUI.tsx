import * as _ from 'lodash';
import {UIComponent, FieldMappers, FieldMapper, FieldFaces, FieldFace, TuidInput} from './mapper';
import {EntitiesUI, EntitySet} from './entitiesUI';
import {Entity} from '../entities';

export abstract class EntityUI<E extends Entity> {
    entitiesUI: EntitiesUI;
    entitySet: EntitySet<E, EntityUI<E>>;
    entity: E;
    caption: string;
    icon?: string;
    typeFieldMappers?: FieldMappers;
    fieldFaces?: FieldFaces;

    mapMain():any[] {
        return this.mapFields(this.entity.schema.fields);
    }

    protected tfmMap(sf:any, ff:FieldFace) {
        let ret: any;
        let {type, tuid} = sf;
        let tuidInput:TuidInput = {};
        let tfm = this.typeFieldMappers;
        if (ff === undefined) {
            let fm = tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
        }
        else {
            let fm = ff.mapper || tfm[type];
            if (fm === undefined) {
                console.log('type field mapper not defined');
                return;
            }
            ret = fm(sf);
            let {label, notes, placeholder, input} = ff;
            if (label !== undefined) ret.label = label;
            let face = ret.face;
            if (face !== undefined) {
                if (notes !== undefined) face.notes = notes;
                if (placeholder !== undefined) face.placeholder = placeholder;
                if (input !== undefined) _.merge(tuidInput, input);
                face.input = tuidInput;
            }
        }
        if (tuid !== undefined) {
            let tuidUI = this.entitiesUI.tuid.coll[tuid];
            if (tuidUI !== undefined) {
                _.merge(tuidInput, tuidUI.input);
            }
            let input0 = this.entitiesUI.getTuidInput(tuid);
            _.merge(tuidInput, input0);
            ret.face.input = tuidInput;
        }
        if (sf.null === false) {
            ret.field.required = true;
        }
        return ret;
    }

    protected mapFields(schemaFields:any[]):any[] {
        if (schemaFields === undefined) return;
        //let tfm = this.typeFieldMappers;
        let nfc = this.fieldFaces;
        return schemaFields.map(sf => this.tfmMap(sf, nfc !== undefined&&nfc[sf.name]));
    }

    link?: UIComponent<E, EntityUI<E>>;
    mainPage?: UIComponent<E, EntityUI<E>>;
}
