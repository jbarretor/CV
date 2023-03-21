import { BaseInterface } from "./base-interface"
import { ProjectsDetail } from "./projects-detail"


export interface Projects extends BaseInterface {
    id: string
    key: string
    title: string
    detail: Array<ProjectsDetail>
}
