import Link from "next/link";
import Image from "next/image";
import { Flex, Box, Text, Button } from "@chakra-ui/react";

import { baseURL, fetchApiPost } from "../utils/fetchApi";
import Property from "../components/Property";

// Banner
const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageURL,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    {/* Image */}
    <Image src={imageURL} width={500} height={300} alt="banner" />

    {/* Text */}
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" paddingBottom="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>

      {/* Button */}
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
);

// Home
export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <Box>
      {/* Banner for renting property */}
      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes for"
        title2="Everyone"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Renting"
        linkName="/search?purpose=for-rent"
        imageURL="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
      />

      {/* Properties for rent */}
      <Flex flexWrap="wrap">
        {propertiesForRent.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      {/* Banner for buying property */}
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy & Own Your"
        title2="Dream Home"
        desc1="Explore Apartments, Villas, Homes"
        desc2="and more"
        buttonText="Explore Buying"
        linkName="/search?purpose=for-sale"
        imageURL="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80"
      />
      {/* Properties for sale */}
      <Flex flexWrap="wrap">
        {propertiesForSale.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>
    </Box>
  );
}

// Default Dubai location ID (city level)
const DEFAULT_LOCATION_IDS = [2];

// fetch all properties
export async function getStaticProps() {
  try {
    const propertyForSale = await fetchApiPost(
      `${baseURL}/properties_search?page=0`,
      {
        purpose: "for-sale",
        locations_ids: DEFAULT_LOCATION_IDS,
        index: "popular",
        rooms: [0, 1, 2, 3, 4, 5],
        baths: [0, 1, 2, 3, 4],
      }
    );
    const propertyForRent = await fetchApiPost(
      `${baseURL}/properties_search?page=0`,
      {
        purpose: "for-rent",
        locations_ids: DEFAULT_LOCATION_IDS,
        index: "popular",
        rooms: [0, 1, 2, 3, 4, 5],
        baths: [0, 1, 2, 3, 4],
      }
    );

    return {
      props: {
        propertiesForSale: propertyForSale?.results || [],
        propertiesForRent: propertyForRent?.results || [],
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      props: {
        propertiesForSale: [],
        propertiesForRent: [],
      },
    };
  }
}
