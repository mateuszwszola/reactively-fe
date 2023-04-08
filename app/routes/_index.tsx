import type {V2_MetaFunction} from "@remix-run/node";
import {createStyles, Button} from "@mantine/core";

export const meta: V2_MetaFunction = () => {
    return [{title: "Reactively"}];
};

const useStyles = createStyles(theme => ({
    wrapper: {
        display: 'flex',
        height: '100px',
        backgroundColor: theme.colors.blue[5],
        color: theme.white,
    }
}))

export default function Index() {
    const { classes } = useStyles();
    return (
        <main className={classes.wrapper}>
            <h1>Reactively ✨</h1>
            <Button c="dimmed">Click me</Button>
        </main>
    );
}
