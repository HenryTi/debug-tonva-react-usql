var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CrEntity } from "../VM";
import { VmBookMain } from "./vmBookMain";
import { vmLinkIcon } from '../link';
export class CrBook extends CrEntity {
    get icon() { return vmLinkIcon('text-muted', 'book'); }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVm(this.VmBookMain);
        });
    }
    get VmBookMain() { return VmBookMain; }
}
//# sourceMappingURL=crBook.js.map