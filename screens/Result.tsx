import {Box, Pressable, Stack, Text} from "native-base";

export default function Result(props) {
    const settings = props.settings;
    const answers = props.answers;

    return (
        <Box pt="10%" alignItems="center" flex="1" bg={settings.bg}>
            <Text fontSize="3xl">Výsledek testu</Text>
            <Stack direction="row" space={2} p={3} justifyContent="center" w="100%" flexWrap="wrap">
                {answers && answers.map((item, index) => {
                    return (
                        <>
                            <Pressable borderWidth={1} w="45%" p={1} m={1} key={index}>
                                <Text fontSize="lg" textAlign="center">Otázka {index + 1}</Text>
                            </Pressable>
                        </>
                    )
                })}
            </Stack>
        </Box>
    )
}