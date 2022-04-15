/**
 * This file is used for extenstions to theme variables of components.
*/
import "@mui/material/Button";
import "@mui/material/IconButton";

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        neutral: true;
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        neutral: true;
    }
}