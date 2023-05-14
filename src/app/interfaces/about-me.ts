import { hide } from "@popperjs/core";
import { BaseInterface } from "./base-interface"

export interface AboutMe extends BaseInterface {
    description: Array<string>
    image: string
}
