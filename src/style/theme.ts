import { Theme } from "@emotion/react"
import { colors } from "./globalStyle"

declare module "@emotion/react" {
    export interface Theme {
        color: typeof colors
    }
}

export const theme: Theme = {
    color: { ...colors },
}