import { BaseInterface } from "./base-interface"
import { ExperienceDetail } from "./experience-detail"

export interface Experience extends BaseInterface {
    detail: Array<ExperienceDetail>
}
