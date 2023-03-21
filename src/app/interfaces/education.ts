import { BaseInterface } from "./base-interface"
import { EducationDetail } from "./education-detail"

export interface Education extends BaseInterface {
    detail: Array<EducationDetail>
}
