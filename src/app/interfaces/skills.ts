import { BaseInterface } from "./base-interface"
import { SkillsDetail } from "./skills-detail"

export interface Skills extends BaseInterface {
    id: string
    key: string
    title: string
    detail: Array<SkillsDetail>
}
