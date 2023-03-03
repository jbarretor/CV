import { ProjectsDetail } from "./projects-detail"


export interface Projects {
    id: string
    key: string
    title: string
    detail: Array<ProjectsDetail>
}
