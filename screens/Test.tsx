import {Box, Text} from "native-base";

export default function Test(props) {
    const settings = props.settings;

    return (
        <Box pt="10%" alignItems="center" flex="1" bg={settings.bg}>
            <Text>Test</Text>
        </Box>
    )
}