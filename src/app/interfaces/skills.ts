import { SkillsDetail } from "./skills-detail"

export interface Skills {
    id: string
    key: string
    title: string
    detail: Array<SkillsDetail>
}
