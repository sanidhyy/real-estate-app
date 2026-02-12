import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { Flex, Box, Text, Icon } from "@chakra-ui/react";
import { BsFilter } from "react-icons/bs";

import SearchFilters from "../components/SearchFilters";
import Property from "../components/Property";
import { baseURL, fetchApiPost } from "../utils/fetchApi";
import noResultsImage from "../assets/images/noresult.svg";

// Search
const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box>
      {/* Property Filters */}
      <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1px"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="large"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Property by Filters</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex>
      {searchFilters && <SearchFilters />}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Properties {router.query.purpose}
      </Text>
      {/* Properties */}
      <Flex flexWrap="wrap">
        {properties.map((property) => (
          <Property property={property} key={property.id} />
        ))}
      </Flex>

      {/* No Properties Found */}
      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
          <Image src={noResultsImage} alt="No Result" />
          <Text fontSize="2xl" marginTop="3">
            No Results Found.
          </Text>
        </Flex>
      )}
    </Box>
  );
};

// fetch filtered properties
export async function getServerSideProps({ query }) {
  const purpose = query.purpose || "for-rent";
  const locationIds = query.location_ids ? query.location_ids.split(",").map(Number) : [2];
  const minPrice = query.minPrice ? Number(query.minPrice) : undefined;
  const maxPrice = query.maxPrice ? Number(query.maxPrice) : undefined;
  const roomsMin = query.roomsMin;
  const bathsMin = query.bathsMin;
  const category = query.category || undefined;
  const page = Number(query.page) || 0;

  const body = {
    purpose,
    locations_ids: locationIds,
    index: "latest",
    rooms: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    baths: [0, 1, 2, 3, 4, 5, 6],
  };
  if (minPrice != null) body.price_min = minPrice;
  if (maxPrice != null) body.price_max = maxPrice;
  if (category) body.categories = [category];
  if (roomsMin != null) body.rooms = Array.from({ length: 9 - Number(roomsMin) }, (_, i) => i + Number(roomsMin));
  if (bathsMin != null) body.baths = Array.from({ length: 7 - Number(bathsMin) }, (_, i) => i + Number(bathsMin));

  try {
    const data = await fetchApiPost(
      `${baseURL}/properties_search?page=${page}`,
      body
    );
    return {
      props: {
        properties: data?.results || [],
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      props: {
        properties: [],
      },
    };
  }
}

export default Search;
