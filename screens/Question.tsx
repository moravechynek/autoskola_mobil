import {ArrowBackIcon, Box, Button, Container, ScrollView, Stack, Text} from "native-base";
import * as React from "react";
import {useState} from "react";
import {Dimensions} from "react-native";

export default function Question(props) {
    const settings = props.settings;
    const rightAnswers = props.data;
    const answers = props.answers;
    const data = props.data;
    const screenH = Dimensions.get("screen").height;
    const [currentQuestion, setCurrentQuestion] = useState(props.index);
    const [questionBox, setQuestionBox] = useState(null);

    const pickColor = (answer) => {
        let pickedColor;
        let spravnaOdpoved;
        rightAnswers.map((item, index) => {
            if (index === currentQuestion) {
                spravnaOdpoved = item.spravna_odpoved;
            }
        })
        answers.map((item, index) => {
            if (index === currentQuestion) {
                if (answer === spravnaOdpoved) {
                    pickedColor = "green.600";
                } else if (item.odpoved === 'none') {
                    pickedColor = settings.bg;
                } else if (item.odpoved === answer) {
                    pickedColor = "red.600";
                }
            }
        })
        return pickedColor
    }

    const handleQuestionChange = (type, value) => {
        if (type === 'btn') {
            setCurrentQuestion(value);
        } else if (type === 'prev' || type === 'next') {
            setCurrentQuestion(currentQuestion + value);
        }
    }

    return (
        <>
            {answers && data.map((item, index) => {
                if (index === currentQuestion) {
                    return (
                        <Box pt="10%" px={3} alignItems="center" flex="1" bg={settings.bg} key={item.id}>
                            <Stack direction="row" p={2} flexWrap="wrap" justifyContent="center">
                                {data.map((item, index) => {
                                    if (index === currentQuestion) {
                                        return (
                                            <Button onPress={() => handleQuestionChange('btn', index)}
                                                    key={index}
                                                    size="8"
                                                    bg="cyan.500"
                                                    m={0.5}
                                            >
                                                <Text>{index + 1}</Text>
                                            </Button>
                                        )
                                    } else {
                                        return (
                                            <Button onPress={() => handleQuestionChange('btn', index)}
                                                    key={index}
                                                    size="8"
                                                    m={0.5}
                                            >
                                                <Text>{index + 1}</Text>
                                            </Button>
                                        )
                                    }
                                })}
                            </Stack>
                            <Box borderWidth={1} p={4} rounded="lg" w="100%" mt="5%"
                                 _light={{borderColor: "black"}}
                                 _dark={{borderColor: "white"}}
                                 maxH="40%"
                                 nativeID="sranda"
                                 onLayout={(event) => {
                                     setQuestionBox(event.nativeEvent.layout);
                                 }}
                            >
                                <ScrollView>
                                    <Text fontSize="lg">{item.otazka}</Text>
                                </ScrollView>
                            </Box>
                            <Text alignSelf="left" p={1}>Odpov????:</Text>
                            <Box borderWidth={1} rounded="lg" mx={2} w="100%"
                                 _light={{borderColor: "black"}}
                                 _dark={{borderColor: "white"}}
                                 maxH={questionBox ? 74 - (questionBox.height / screenH) * 100 + "%" : "40%"}
                                 overflow="hidden"
                            >
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    <Box key="a"
                                         bg={pickColor("a")}
                                         _light={{borderColor: "black"}}
                                         _dark={{borderColor: "white"}}
                                         flexDirection="row"
                                         alignItems="center"
                                         borderBottomWidth={0.4}
                                         p={2}
                                    >
                                        <Box justifyContent="center" borderWidth={3} rounded="lg"
                                             borderColor="warning.500" bg={settings.bg} size="12">
                                            <Text alignSelf="center">A</Text>
                                        </Box>
                                        <Text p={2} maxW="88%">{item.odpoved_a}</Text>
                                    </Box>
                                    <Box key="b"
                                         bg={pickColor("b")}
                                         _light={{borderColor: "black"}}
                                         _dark={{borderColor: "white"}}
                                         flexDirection="row"
                                         alignItems="center"
                                         p={2}
                                         borderBottomWidth={item.odpoved_c ? 0.4 : 0}
                                    >
                                        <Box justifyContent="center" borderWidth={3} rounded="lg"
                                             borderColor="warning.500" bg={settings.bg} size="12">
                                            <Text alignSelf="center">B</Text>
                                        </Box>
                                        <Text p={2} maxW="88%">{item.odpoved_b}</Text>
                                    </Box>
                                    {item.odpoved_c ? (
                                            <Box key="c"
                                                 bg={pickColor("c")}
                                                 _light={{borderColor: "black"}}
                                                 _dark={{borderColor: "white"}}
                                                 flexDirection="row"
                                                 alignItems="center"
                                                 p={2}
                                            >
                                                <Box justifyContent="center" borderWidth={3} rounded="lg"
                                                     borderColor="warning.500" bg={settings.bg} size="12">
                                                    <Text alignSelf="center">C</Text>
                                                </Box>
                                                <Text p={2} maxW="88%">{item.odpoved_c}</Text>
                                            </Box>
                                        ) :
                                        null
                                    }
                                </ScrollView>
                            </Box>
                            <Container position="absolute" bottom={0} alignItems="center" mb={2}>
                                <Stack direction="row" space={3}>
                                    <Button isDisabled={currentQuestion === 0}
                                            onPress={() => handleQuestionChange('prev', -1)}
                                            bg="blue.400"
                                            _pressed={{bg: "blue.400"}}
                                            key="previous"
                                    >
                                        <Text>P??edchoz??</Text>
                                    </Button>
                                    <Button isDisabled={currentQuestion === Object.keys(data).length - 1}
                                            onPress={() => handleQuestionChange('next', 1)}
                                            bg="blue.400"
                                            _pressed={{bg: "blue.400"}}
                                            key="next"
                                    >
                                        <Text>Dal????</Text>
                                    </Button>
                                </Stack>
                            </Container>
                            <Button position="absolute" bottom={0} right={0} m={3}
                                    onPress={() => props.showQuestion()}
                            >
                                <ArrowBackIcon color="black"/>
                            </Button>
                        </Box>
                    )
                }
            })}
        </>
    )
}