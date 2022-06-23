import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Navbar from "./Navbar";
import Footer from "./Footer";

// Layout
const Layout = ({ children }) => (
  <>
    {/* Head Tag */}
    <Head>
      <title>Realtor - Real Estate App</title>
    </Head>
    <Box maxWidth="1280px" m="auto">
      {/* Header */}
      <header>
        <Navbar />
      </header>
      {/* Main Body */}
      <main>{children}</main>
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </Box>
  </>
);

export default Layout;
