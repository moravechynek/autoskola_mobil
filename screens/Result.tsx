import {Box, Button, Pressable, Stack, Text} from "native-base";
import {useState} from "react";
import Question from "./Question";

export default function Result(props) {
    const settings = props.settings;
    const answers = props.answers;
    const data = props.data;
    const [showQuestion, setShowQuestion] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleShowQuestion = (index) => {
        setCurrentQuestion(index);
        setShowQuestion(true);
    }

    if (showQuestion) {
        return <Question data={data} answers={answers} index={currentQuestion} settings={settings}
                         showQuestion={setShowQuestion}/>
    }

    return (
        <Box pt="10%" alignItems="center" flex="1" bg={settings.bg}>
            <Text fontSize="3xl">Výsledek testu</Text>
            <Stack direction="row" space={2} p={3} justifyContent="center" w="100%" flexWrap="wrap">
                {answers && answers.map((item, index) => {
                    return (
                        <Pressable borderWidth={1} p={1} m={1} w="45%" key={index}
                                   bg={item.odpoved === data[index].spravna_odpoved ? "green.600" : "red.600"}
                                   onPress={() => handleShowQuestion(index)}
                                   rounded="lg"
                        >
                            <Text fontSize="lg" textAlign="center">Otázka {index + 1}</Text>
                        </Pressable>
                    )
                })}
            </Stack>
            <Button position="absolute" bottom={0} right={0} m={3}
                    onPress={() => props.newTest()}
            >
                <Text>Nový test</Text>
            </Button>
        </Box>
    )
}