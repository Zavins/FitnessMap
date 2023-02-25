import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useDefaultTheme from './hooks/useDefaultTheme';
import useWindowLayout from './hooks/useWindowLayout';
import Navigation from './navigation/Navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000, // 1 minute
        },
    },
})


const App = () => {
    const setLayout = useWindowLayout((state) => state.setLayout)
    const isLoadingComplete = useCachedResources();
    const theme = useDefaultTheme()
    

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <QueryClientProvider client={queryClient}>
                <SafeAreaProvider onLayout={(e) => { setLayout(e.nativeEvent.layout) }}>
                    <PaperProvider theme={theme}>
                        <Navigation />
                        <StatusBar />
                    </PaperProvider>
                </SafeAreaProvider>
            </QueryClientProvider>
        );
    }
}

export default App 
