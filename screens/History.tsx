import {Box, Text} from "native-base";

export default function History(props) {
    const settings = props.settings;

    return (
        <Box pt="10%" alignItems="center" flex="1" bg={settings.bg}>
            <Text fontSize="3xl">Historie</Text>
        </Box>
    )
}