import { BaseInterface } from "./base-interface"
import { ProjectsDetail } from "./projects-detail"


export interface Projects extends BaseInterface {
    detail: Array<ProjectsDetail>
}
