import {Box, Button, ScrollView, Text} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Test from "./Test";
import {Platform} from "react-native";


export default function Home(props) {
    const settings = props.settings;
    const navigation = useNavigation();
    console.log(Platform);

    return (
        <Box alignItems="center" flex="1" bg={settings.bg}>
            <ScrollView>
                <Box alignItems="center">
                    <Text fontSize="5xl" bold>HOME</Text>
                    <Button m="1" onPress={() => navigation.navigate("Test" as never)}>Test</Button>
                    <Button m="1" onPress={() => navigation.navigate("Historie" as never)}>Historie</Button>
                    <Button m="1" onPress={() => navigation.navigate("Statistiky" as never)}>Statistiky</Button>
                    <Button m="1" onPress={() => navigation.navigate("Nastavení" as never)}>Nastavení</Button>
                    <Text p="5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus architecto aut eum
                        eveniet
                        harum possimus sint soluta? Accusamus aliquid amet architecto cumque dicta distinctio dolorum
                        eaque,
                        eum expedita explicabo inventore iste maiores mollitia necessitatibus neque obcaecati pariatur
                        perferendis perspiciatis possimus quia quibusdam reprehenderit repudiandae sit temporibus unde
                        velit
                        veritatis voluptas. Autem exercitationem laudantium modi nostrum provident quas quasi, quis
                        temporibus ut. Cum ea, fugiat nihil odio ratione rem reprehenderit veniam. Commodi consequuntur
                        dignissimos eum itaque iusto labore nemo perspiciatis, quaerat quo, tenetur ut vero, voluptates.
                        Amet animi asperiores autem, consectetur cupiditate dignissimos dolore doloremque enim error
                        esse
                        facilis fuga harum illo in ipsam iste laborum molestias natus neque nobis pariatur quae quidem
                        ratione repellat similique suscipit vitae. Accusantium, aliquam aliquid beatae deserunt
                        distinctio
                        excepturi numquam repellat vel. A alias animi at consectetur consequuntur corporis dicta
                        distinctio
                        dolor doloribus dolorum eaque et, excepturi fugiat illum itaque labore maxime molestias nesciunt
                        non
                        obcaecati officiis omnis possimus quae quasi recusandae sunt tempora. Accusantium aliquid animi
                        asperiores assumenda, beatae commodi culpa dignissimos distinctio, dolores doloribus eum
                        excepturi
                        explicabo illo ipsa laboriosam natus nobis quia quos reprehenderit saepe, similique tempore
                        veniam.
                        Ad, alias autem beatae consequuntur deleniti earum excepturi facilis fugit, impedit ipsum iusto
                        omnis quod ratione reprehenderit vitae. Delectus distinctio eius enim facere hic illo iusto
                        modi,
                        soluta. Ab accusamus architecto at blanditiis commodi corporis dolores earum error expedita
                        facere
                        fugit illum pariatur, quam soluta tenetur. Aperiam cum debitis dolore impedit incidunt ipsum
                        laudantium praesentium quas recusandae tempora tempore unde, voluptatibus voluptatum! Delectus
                        nostrum numquam officia quasi. Accusantium amet exercitationem magnam modi optio similique
                        tempora
                        totam? Autem delectus dolores doloribus ducimus eum fuga impedit magni, nam natus quia quisquam
                        repellat rerum totam veritatis voluptates? Accusantium aspernatur culpa cumque deserunt iste
                        nobis
                        officia quisquam quo rem voluptatum? Consequatur distinctio ex fugit id, magnam perspiciatis
                        possimus provident quam quas quos reiciendis repudiandae, saepe, velit. Distinctio hic illo
                        officia
                        pariatur quaerat quo reiciendis repudiandae saepe voluptates? Aperiam aspernatur assumenda,
                        atque
                        cumque dignissimos distinctio doloribus enim est eum ex excepturi exercitationem facere fugit
                        harum
                        incidunt inventore ipsum laudantium magnam neque nisi nostrum optio quae, quam ratione
                        repudiandae
                        saepe ut voluptates. Accusantium, ea nesciunt? Accusamus adipisci alias dicta eos expedita iste,
                        omnis quisquam quo ratione sint voluptas voluptate voluptatem voluptatum. Blanditiis fuga id nam
                        nihil veritatis voluptatem voluptatum. Ab atque cum et, iusto nihil nobis officia porro possimus
                        rerum velit? Distinctio hic ipsam minus nam porro quos ratione rem rerum veritatis vitae. Autem
                        blanditiis cumque deleniti dolore ea eligendi esse ex facilis harum hic, ipsa, ipsam iure magni
                        molestiae molestias nisi odio, omnis perspiciatis quasi quidem recusandae rem repellat
                        repellendus
                        similique sint soluta veniam voluptatem voluptates voluptatibus voluptatum? A adipisci amet
                        atque
                        dicta distinctio doloribus enim eum id incidunt ipsa itaque labore, laborum laudantium minus
                        necessitatibus nesciunt nostrum numquam obcaecati omnis quae quod sequi unde vero! Adipisci
                        aliquid
                        amet aperiam at aut debitis delectus dolorum eligendi enim esse et eveniet incidunt nam nihil
                        nostrum odit omnis pariatur porro qui quis quisquam ratione repellat sequi, voluptas voluptatum.
                        Laudantium qui, veniam!
                    </Text>
                </Box>
            </ScrollView>
        </Box>

    )
}