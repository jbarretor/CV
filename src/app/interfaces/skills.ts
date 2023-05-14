import { BaseInterface } from "./base-interface"
import { SkillsDetail } from "./skills-detail"

export interface Skills extends BaseInterface {
    detail: Array<SkillsDetail>
}
