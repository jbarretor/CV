import { LanguageDetail } from "./language-detail"

export interface Language {
    id: string
    key: string
    title: string
    detail: Array<LanguageDetail>
}
