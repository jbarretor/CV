import { BaseInterface } from "./base-interface"
import { SocialNetworkDetail } from "./social-network-detail"

export interface SocialNetwork extends BaseInterface {
    id: string
    key: string
    title: string
    detail: Array<SocialNetworkDetail>
}
