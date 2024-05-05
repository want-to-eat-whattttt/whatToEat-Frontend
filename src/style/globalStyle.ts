import { css } from "@emotion/react"

export const colors = {
    white: "var(--white)",
    black: "var(--black)",
    red: "var(--red)",
    green: "var(--green)",
    main50: "var(--main50)",
    main100: "var(--main100)",
    main200: "var(--main200)",
    main300: "var(--main300)",
    main400: "var(--main400)",
    main500: "var(--main500)",
    main600: "var(--main600)",
    main700: "var(--main700)",
    main800: "var(--main800)",
    main900: "var(--main900)",
}

const globalStyle = css`
    html,
    body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
    *::-webkit-scrollbar {
        display: none;
    }
    *::-webkit-scrollbar {
        display: none;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: 0;
        outline: 0;
        user-select: none;
        box-sizing: border-box;
        font-family: Gmarket Sans TTF;
        font-style: normal;
        outline: none;
    }

    #root {
        --white: #ffffff;
        --black: #000000;
        --red: #e84045;
        --green: #07ed03;

        /* main */
        --main50: #f4faeb;
        --main100: #e6f3d4;
        --main200: #cfe9ad;
        --main300: #afd97d;
        --main400: #8bc34a;
        --main500: #73ac36;
        --main600: #588828;
        --main700: #446922;
        --main800: #395420;
        --main900: #32481f;
    }
`

export default globalStyle