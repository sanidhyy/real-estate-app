import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import DefaultImage from "../assets/images/house.jpg";

// Property - Bayut API list item shape
const Property = ({
  property: {
    id,
    title,
    price,
    purpose,
    area,
    details,
    media,
    agency,
    verification,
  },
}) => {
  const coverPhoto = media?.cover_photo || null;
  const rooms = details?.bedrooms ?? 0;
  const baths = details?.bathrooms ?? 0;
  const areaSqft = area?.built_up ?? 0;
  const isVerified = verification?.is_verified;

  return (
    <Link href={`/property/${id}`} passHref>
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <Box>
          <Image
            src={coverPhoto || DefaultImage}
            width={400}
            height={200}
            alt="home"
          />
        </Box>
        <Box w="full">
          <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              {isVerified && (
                <Box paddingRight="3" color="green.400">
                  <GoVerified />
                </Box>
              )}
              <Text fontWeight="bold" fontSize="lg">
                AED {millify(price)}
                {purpose === "for-rent" && "/year"}
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
          <Text fontSize="lg">
            {(title || "Property").length > 30 ? `${(title || "Property").substring(0, 30)}...` : title || "Property"}
          </Text>
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
