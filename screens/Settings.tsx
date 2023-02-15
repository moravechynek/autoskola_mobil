import {Box, Button, Text} from "native-base";

export default function Settings(props) {
    const settings = props.settings;

    return (
        <Box pt="10%" alignItems="center" flex="1" bg={settings.bg}>
            <Text>Nastavení</Text>
            <Button m="1" onPress={props.darkMode}>Dark Mode</Button>
        </Box>
    )
}