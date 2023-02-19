import {Box, ChevronDownIcon, Pressable, Stack, Switch, Text} from "native-base";
import {useState} from "react";

export default function Settings(props) {
    const settings = props.settings;
    const mode = settings.mode;
    const [hideColorTheme, setHideColorTheme] = useState(true);
    const allThemes = [
        {"name": "Bílá", "value": "white"},
        {"name": "Černá", "value": "black"},
        {"name": "Teplá bílá", "value": "#efead8"},
        {"name": "Světle černá", "value": "muted.800"},
    ]

    const changeTheme = (value) => {
        if (value === "muted.800" || value === "black") {
            props.setDark(value);
            if (mode === "light") {
                props.darkMode();
            }
        } else {
            props.setLight(value);
            if (mode === "dark") {
                props.darkMode();
            }
        }
        setHideColorTheme(true);
    }

    const themeText = () => {
        if (settings.bg === "white") {
            return "Bílá"
        } else if (settings.bg === "black") {
            return "Černá"
        } else if (settings.bg === "muted.800") {
            return "Světle černá"
        } else {
            return "Teplá bílá"
        }
    }

    return (
        <Box pt="10%" px={2} flex="1" bg={settings.bg}>
            <Text fontSize="3xl" alignSelf="center">Nastavení</Text>
            <Box w="100%" mt={2}>
                <Text ml={2} p={1} fontSize="xs" bold letterSpacing="xl"
                      _light={{color: "muted.500"}}
                      _dark={{color: "warmGray.400"}}
                >
                    BARVY
                </Text>
                <Box rounded="lg"
                     _light={{bg: "warmGray.300"}}
                     _dark={{bg: "muted.900"}}
                >
                    <Stack w="100%" p={2} direction="row" alignItems="center">
                        <Text flex={1} fontSize="md">Tmavý režim: </Text>
                        <Switch onToggle={props.darkMode} isChecked={mode === "dark"} offTrackColor="muted.500"/>
                    </Stack>
                    <Stack w="100%" p={2} pb={!hideColorTheme ? 0 : 2} direction="row" alignItems="center">
                        <Text flex={1} fontSize="md">Motiv: </Text>
                        <Pressable flexDirection="row" alignItems="center" w="40%"
                                   onPress={() => setHideColorTheme(!hideColorTheme)}
                        >
                            <Text p={1} flex={1}>{themeText()}</Text>
                            <ChevronDownIcon mr={2}></ChevronDownIcon>
                        </Pressable>
                    </Stack>
                    {!hideColorTheme &&
                        <Stack direction="row">
                            <Box pb={1} ml="60%">
                                {allThemes.map((item) => {
                                    if (item.name !== themeText()) {
                                        return (
                                            <Pressable py={2} px={1} key={item.name}
                                                       onPress={() => changeTheme(item.value)}
                                            >
                                                <Text>{item.name}</Text>
                                            </Pressable>
                                        )
                                    }
                                })}
                            </Box>
                        </Stack>
                    }
                </Box>
            </Box>
        </Box>
    )
}