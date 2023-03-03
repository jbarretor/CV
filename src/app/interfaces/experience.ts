import { ExperienceDetail } from "./experience-detail"

export interface Experience {
    id: string
    key: string
    title: string
    detail: Array<ExperienceDetail>
}
