import * as React from 'react';
import { Tuid, Entity } from '../../entities';
import { VmEntity, vmLinkIcon } from '../entity/vmEnity';
import { Page, nav } from 'tonva-tools';
import { VmApi } from '../vmApi';

export abstract class VmTuid extends VmEntity {
    entity: Tuid;

    constructor(vmApi: VmApi, tuid: Tuid) {
        super(vmApi, tuid);
    }

    get icon() {return vmLinkIcon('text-info', 'list-alt')}
}