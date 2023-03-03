import { SocialNetworkDetail } from "./social-network-detail"

export interface SocialNetwork {
    id: string
    key: string
    title: string
    detail: Array<SocialNetworkDetail>
}
