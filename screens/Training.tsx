import {Box, Button, Container, Pressable, ScrollView, Stack, Text} from "native-base";
import {useEffect, useState} from "react";
import {Dimensions} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import questions from './../data/questions.json';

export default function Training(props): any {
    const settings = props.settings;
    const [data, setData] = useState([questions[Math.floor(Math.random() * questions.length + 1)]]);
    const [allSelectedAnswers, setAllSelectedAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionBox, setQuestionBox] = useState(null);
    const screenH = Dimensions.get("screen").height;

    const [reloaded, setReloaded] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (allSelectedAnswers.length === 0 || (!isFocused && reloaded === 0)) {
            reset();
            setReloaded(1);
        }
        if (isFocused) {
            setReloaded(0);
        }
    })

    const reset = () => {
        const i = Math.floor(Math.random() * questions.length + 1);
        setData([questions[i]]);
        setAllSelectedAnswers([{
            'FK_otazka': questions[i].id,
            'odpoved': 'none',
            'timestamp': getTime()
        }])
        setSelectedAnswer({
            "FK_otazka": questions[i].id,
            "odpoved": "none"
        })
        setCurrentQuestion(0);
    }

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

    const pickColor = (answer) => {
        let pickedColor;
        let spravnaOdpoved;
        data.map((item, index) => {
            if (index === currentQuestion) {
                spravnaOdpoved = item.spravna_odpoved;
                if (item.spravna_odpoved === answer) {
                    pickedColor = "green.600";
                }
            }
        })
        allSelectedAnswers.map((item, index) => {
            if (index === currentQuestion) {
                if (item.odpoved === 'none') {
                    pickedColor = settings.bg;
                } else if (item.odpoved === answer && answer !== spravnaOdpoved) {
                    pickedColor = "red.600";
                }
            }
        })
        return pickedColor
    }

    const handleAnswerClick = (event, answer, question) => {
        submitQuestion(question, answer);
        handleSendForm();
    };


    const handleQuestionChange = (type, value) => {
        if (type === 'btn') {
            setCurrentQuestion(value);
        } else if (type === 'prev' || type === 'next') {
            setCurrentQuestion(currentQuestion + value);
        }
    }

    const submitQuestion = (question, answer) => {
        allSelectedAnswers.map((item) => {
            if (item.FK_otazka === question) {
                item.odpoved = answer;
                item.timestamp = getTime();
            }
        })
        selectedAnswer.odpoved = answer;
    }

    const loadNextQuestion = () => {
        const i = Math.floor(Math.random() * questions.length + 1);
        setData(data.concat(questions[i]))
        setAllSelectedAnswers(allSelectedAnswers.concat({
            'FK_otazka': questions[i].id,
            'odpoved': 'none',
            'timestamp': getTime()
        }))
        setSelectedAnswer({
            "FK_otazka": questions[i].id,
            "odpoved": "none"
        })
    }

    const handleSendForm = () => {
        console.log(allSelectedAnswers);
        console.log(selectedAnswer);
        loadNextQuestion();
    }

    return (
        <>
            {data && allSelectedAnswers && data.map((item, index) => {
                if (index === currentQuestion) {
                    return (
                        <Box pt="10%" px={3} alignItems="center" flex="1" bg={settings.bg} key="main">
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
                                               bg={pickColor("a")}
                                               _light={{borderColor: "black"}}
                                               _dark={{borderColor: "white"}}
                                               flexDirection="row"
                                               alignItems="center"
                                               borderBottomWidth={0.4}
                                               p={2}
                                               isDisabled={allSelectedAnswers.length > currentQuestion + 1}
                                    >
                                        <Box justifyContent="center" borderWidth={3} rounded="lg"
                                             borderColor="warning.500" bg={settings.bg} size="12">
                                            <Text alignSelf="center">A</Text>
                                        </Box>
                                        <Text p={2} maxW="88%">{item.odpoved_a}</Text>
                                    </Pressable>
                                    <Pressable key="b"
                                               onPress={(event) => handleAnswerClick(event, "b", item.id)}
                                               bg={pickColor("b")}
                                               _light={{borderColor: "black"}}
                                               _dark={{borderColor: "white"}}
                                               flexDirection="row"
                                               alignItems="center"
                                               p={2}
                                               borderBottomWidth={item.odpoved_c ? 0.4 : 0}
                                               isDisabled={allSelectedAnswers.length > currentQuestion + 1}
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
                                                       bg={pickColor("c")}
                                                       _light={{borderColor: "black"}}
                                                       _dark={{borderColor: "white"}}
                                                       flexDirection="row"
                                                       alignItems="center"
                                                       p={2}
                                                       isDisabled={allSelectedAnswers.length > currentQuestion + 1}
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
                                            onPress={() => handleQuestionChange('prev', -1)}
                                            bg="blue.400"
                                            _pressed={{bg: "blue.400"}}
                                            key="previous"
                                    >
                                        <Text>Předchozí</Text>
                                    </Button>
                                    <Button isDisabled={currentQuestion === Object.keys(data).length - 1}
                                            onPress={() => handleQuestionChange('next', 1)}
                                            bg="blue.400"
                                            _pressed={{bg: "blue.400"}}
                                            key="next"
                                    >
                                        <Text>Další</Text>
                                    </Button>
                                </Stack>
                            </Container>
                        </Box>
                    );
                }
            })}
        </>
    )
}