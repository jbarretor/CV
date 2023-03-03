import { EducationDetail } from "./education-detail"

export interface Education {
    id: string
    key: string
    title: string
    detail: Array<EducationDetail>
}
