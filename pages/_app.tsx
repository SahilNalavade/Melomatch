// _app.tsx
import { ChakraProvider } from '@chakra-ui/react';
 // Adjust the path accordingly
import '@/styles/globals.css'; // Import your global styles
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
