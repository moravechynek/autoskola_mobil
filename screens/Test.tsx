import {Box, Button, Container, Pressable, ScrollView, Stack, Text} from "native-base";
import * as React from "react";
import {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import Result from "./Result";
import questions from './../data/questions.json';

export default function Test(props): any {
    const settings = props.settings;
    const [data, setData] = useState([...questions].sort(() => 0.5 - Math.random()).slice(0, 25))
    const [allSelectedAnswers, setAllSelectedAnswers] = useState(null);
    const [selectedListIndex, setSelectedListIndex] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionBox, setQuestionBox] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const screenH = Dimensions.get("screen").height;

    useEffect(() => {
        if (!allSelectedAnswers) {
            let answers = [];
            data.map((item) => {
                answers = answers.concat({
                    'FK_otazka': item.id,
                    'odpoved': 'none',
                    'timestamp': getTime()
                });
            })
            setAllSelectedAnswers(answers);
        }
    })

    const getTime = () => {
        let curTime = new Date();
        let month = curTime.getMonth() + 1;
        let day = curTime.getDate();
        let hours = curTime.getHours();
        let minutes = curTime.getMinutes();
        let seconds = curTime.getSeconds();
        /*if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }*/
        return curTime.getFullYear() + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds + 'Z';
    }

    const handleAnswerClick = (event, answer, question) => {
        setSelectedListIndex(answer);
        submitQuestion(question, answer);
    };

    const markSelectedAnswer = (question_index) => {
        setSelectedListIndex(0);
        allSelectedAnswers.map((item, index) => {
            if (index === question_index) {
                setSelectedListIndex(item.odpoved);
            }
        })
    }

    const handleQuestionChange = (type, value, index) => {
        if (type === 'btn') {
            setCurrentQuestion(value);
            markSelectedAnswer(value);
        } else if (type === 'prev' || type === 'next') {
            setCurrentQuestion(currentQuestion + value);
            markSelectedAnswer(index + value);
        }
    }

    const submitQuestion = (question, answer) => {
        allSelectedAnswers.map((item) => {
            if (item.FK_otazka === question) {
                item.odpoved = answer;
                item.timestamp = getTime();
            }
        })
    }

    const handleSendForm = () => {
        console.log(allSelectedAnswers);
        setShowResult(true);
    }

    const newTest = () => {
        const newData = [...questions].sort(() => 0.5 - Math.random()).slice(0, 25);
        let answers = [];
        newData.map((item) => {
            answers = answers.concat({
                'FK_otazka': item.id,
                'odpoved': 'none',
                'timestamp': getTime()
            });
        })
        setData(newData);
        setAllSelectedAnswers(answers);
        setCurrentQuestion(0);
        setSelectedListIndex(0);
        setShowResult(false);
    }

    if (showResult) {
        return <Result settings={settings} answers={allSelectedAnswers} data={data} newTest={newTest}/>
    }

    return data.map((item, index) => {
        if (index === currentQuestion) {
            return (
                <Box pt="10%" px={3} alignItems="center" flex="1" bg={settings.bg} key={item.id}>
                    <Stack direction="row" p={2} flexWrap="wrap" justifyContent="center">
                        {data.map((item, index) => {
                            if (index === currentQuestion) {
                                return (
                                    <Button onPress={() => handleQuestionChange('btn', index, null)}
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
                                    <Button onPress={() => handleQuestionChange('btn', index, null)}
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
                    <Box borderWidth={1} p={4} rounded="lg" w="100%"
                         _light={{borderColor: "black"}}
                         _dark={{borderColor: "white"}}
                         maxH="40%"
                         nativeID="sranda"
                         onLayout={(event) => {
                             setQuestionBox(event.nativeEvent.layout)
                         }}
                    >
                        <ScrollView>
                            <Text fontSize="lg">{item.otazka}</Text>
                        </ScrollView>
                    </Box>
                    <Text alignSelf="left" p={1}>Odpověď:</Text>
                    <Box borderWidth={1} rounded="lg" mx={2} w="100%"
                         _light={{borderColor: "black"}}
                         _dark={{borderColor: "white"}}
                         maxH={questionBox ? 74 - (questionBox.height / screenH) * 100 + "%" : "40%"}
                         overflow="hidden"
                    >
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Pressable key="a"
                                       onPress={(event) => handleAnswerClick(event, "a", item.id)}
                                       _light={{
                                           bg: selectedListIndex === "a" ? "cyan.300" : settings.bg,
                                           borderColor: "black",
                                       }}
                                       _dark={{
                                           bg: selectedListIndex === "a" ? "cyan.500" : settings.bg,
                                           borderColor: "white",
                                       }}
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
                            </Pressable>
                            <Pressable key="b"
                                       onPress={(event) => handleAnswerClick(event, "b", item.id)}
                                       _light={{
                                           bg: selectedListIndex === "b" ? "cyan.300" : settings.bg,
                                           borderColor: "black",
                                       }}
                                       _dark={{
                                           bg: selectedListIndex === "b" ? "cyan.500" : settings.bg,
                                           borderColor: "white",
                                       }}
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
                            </Pressable>
                            {item.odpoved_c ? (
                                    <Pressable key="c"
                                               onPress={(event) => handleAnswerClick(event, "c", item.id)}
                                               _light={{bg: selectedListIndex === "c" ? "cyan.300" : settings.bg}}
                                               _dark={{bg: selectedListIndex === "c" ? "cyan.500" : settings.bg}}
                                               flexDirection="row"
                                               alignItems="center"
                                               p={2}
                                    >
                                        <Box justifyContent="center" borderWidth={3} rounded="lg"
                                             borderColor="warning.500" bg={settings.bg} size="12">
                                            <Text alignSelf="center">C</Text>
                                        </Box>
                                        <Text p={2} maxW="88%">{item.odpoved_c}</Text>
                                    </Pressable>
                                ) :
                                null
                            }
                        </ScrollView>
                    </Box>
                    <Container position="absolute" bottom={0} alignItems="center" mb={2}>
                        <Stack direction="row" space={3}>
                            <Button isDisabled={currentQuestion === 0}
                                    onPress={() => handleQuestionChange('prev', -1, index)}
                                    bg="blue.400"
                                    _pressed={{bg: "blue.400"}}
                                    key="previous"
                            >
                                <Text>Předchozí</Text>
                            </Button>
                            <Button isDisabled={currentQuestion === Object.keys(data).length - 1}
                                    onPress={() => handleQuestionChange('next', 1, index)}
                                    bg="blue.400"
                                    _pressed={{bg: "blue.400"}}
                                    key="next"
                            >
                                <Text>Další</Text>
                            </Button>
                            <Button onPress={() => handleSendForm()}
                                    bg="green.500"
                                    _pressed={{bg: "green.500"}}
                                    key="confirm"
                            >
                                <Text>Potvrdit</Text>
                            </Button>
                        </Stack>
                    </Container>
                </Box>
            );
        }
    })
}