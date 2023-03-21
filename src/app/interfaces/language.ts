import { BaseInterface } from "./base-interface"
import { LanguageDetail } from "./language-detail"

export interface Language extends BaseInterface {
    detail: Array<LanguageDetail>
}
