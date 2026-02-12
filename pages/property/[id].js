import { Box, Flex, Spacer, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { baseURL, fetchApi } from "../../utils/fetchApi";
import ImageScrollBar from "../../components/ImageScrollBar";

// Property Details - Bayut API response shape
const PropertyDetails = ({
  propertyDetails: {
    price,
    title,
    description,
    type,
    purpose,
    area,
    details,
    location,
    agency,
    media,
    verification,
    amenities,
  },
}) => {
  const rooms = details?.bedrooms ?? 0;
  const baths = details?.bathrooms ?? 0;
  const areaSqft = area?.built_up ?? 0;
  const propertyType = type?.sub || type?.main || "";
  const furnishingStatus = details?.is_furnished != null ? (details.is_furnished ? "Furnished" : "Unfurnished") : null;
  const isVerified = verification?.is_verified;
  const propertyImages = media?.photos
    ? (Array.isArray(media.photos[0]) ? media.photos.flat() : media.photos).map((url, i) => ({ id: i, url }))
    : media?.cover_photo
    ? [{ id: 0, url: media.cover_photo }]
    : [];

  return (
    <Box maxWidth="1000px" m="auto" p="4">
      {propertyImages.length > 0 && <ImageScrollBar data={propertyImages} />}
      <Box w="full" p="6">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
          <Flex alignItems="center">
            {isVerified && (
              <Box paddingRight="3" color="green.400">
                <GoVerified />
              </Box>
            )}
            <Text fontWeight="bold" fontSize="lg">
              AED {millify(price)}
            </Text>
          </Flex>
          {agency?.logo_url && (
            <Avatar size="sm" src={agency.logo_url} />
          )}
        </Flex>
        <Flex
          alignItems="center"
          p="1"
          justifyContent="space-between"
          w="250px"
          color="blue.400"
        >
          {rooms} <FaBed /> | {baths} <FaBath /> | {areaSqft > 0 ? `${millify(areaSqft)} sqft` : "N/A"}{" "}
          <BsGridFill />
        </Flex>
        <Box marginTop="2">
          <Text fontSize="lg" marginBottom="2" fontWeight="bold">
            {title}
          </Text>
          {description && (
            <Text lineHeight="2" color="gray.600">
              {description}
            </Text>
          )}
        </Box>
        <Flex flexWrap="wrap" textTransform="uppercase" justifyContent="space-between">
          {propertyType && (
            <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
              <Text>Type</Text>
              <Text fontWeight="bold">{propertyType}</Text>
            </Flex>
          )}
          {purpose && (
            <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
              <Text>Purpose</Text>
              <Text fontWeight="bold">{purpose}</Text>
            </Flex>
          )}
          {furnishingStatus && (
            <Flex justifyContent="space-between" w="400px" borderBottom="1px" borderColor="gray.100" p="3">
              <Text>Furnishing</Text>
              <Text fontWeight="bold">{furnishingStatus}</Text>
            </Flex>
          )}
        </Flex>
        {amenities?.length > 0 && (
          <Box marginTop="5">
            <Text fontSize="2xl" fontWeight="black" marginTop="5">
              Amenities
            </Text>
            <Flex flexWrap="wrap">
              {amenities.map((group, i) =>
                (group.items || []).map((item) => (
                  <Text
                    key={`${i}-${item}`}
                    fontWeight="bold"
                    color="blue.400"
                    fontSize="l"
                    p="2"
                    bg="gray.200"
                    m="1"
                    borderRadius="5"
                  >
                    {item}
                  </Text>
                ))
              )}
            </Flex>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PropertyDetails;

// fetch a property
export async function getServerSideProps({ params: { id } }) {
  try {
    const data = await fetchApi(`${baseURL}/property/${id}`);

    return {
      props: {
        propertyDetails: data || {},
      },
    };
  } catch (error) {
    console.error("Error fetching property details:", error);
    return {
      props: {
        propertyDetails: {},
      },
    };
  }
}
