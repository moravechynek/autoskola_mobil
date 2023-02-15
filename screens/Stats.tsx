import {Box, Text} from "native-base";

export default function Stats(props) {
    const settings = props.settings;

    return (
        <Box pt="10%" alignItems="center" flex="1" bg={settings.bg}>
            <Text>Statistiky</Text>
        </Box>
    )
}