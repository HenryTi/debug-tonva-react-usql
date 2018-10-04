var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CEntity } from "../VM";
import { VBookMain } from "./vBookMain";
import { entitiesRes } from '../../res';
export class CBook extends CEntity {
    get icon() { return entitiesRes['action'].icon; }
    internalStart() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.showVPage(this.VmBookMain);
        });
    }
    get VmBookMain() { return VBookMain; }
}
//# sourceMappingURL=cBook.js.map