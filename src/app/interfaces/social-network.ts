import { BaseInterface } from "./base-interface"
import { SocialNetworkDetail } from "./social-network-detail"

export interface SocialNetwork extends BaseInterface {
    detail: Array<SocialNetworkDetail>
}
