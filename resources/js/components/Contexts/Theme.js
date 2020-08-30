import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { indigo } from "@material-ui/core/colors";
const theme = createMuiTheme({
    palette: {
        primary: { main: "#364f6b" },
        // secondary: "#3fc1c9",
        whity: { main: "#f5f5f5" },
        pinky: { main: "#fc5185" },
        warning: {
            main: "#b71c1c"
        },
        gray: {
            main: "#c2c5cc"
        }
    }
});

export default function ThemeContext(props) {
    return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
