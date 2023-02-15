import Navigator from './screens/Navigator';
import {extendTheme, NativeBaseProvider} from "native-base";
import JSONSettings from "./data/settings.json";

const config = {
    useSystemColorMode: false,
    initialColorMode: JSONSettings.colorMode,
};

const customTheme = extendTheme({config});

export default function App() {
    return (
        <NativeBaseProvider theme={customTheme}>
            <Navigator/>
        </NativeBaseProvider>
    )
}
