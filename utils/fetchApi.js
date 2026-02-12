import axios from "axios";

// Base URL - Bayut API (UAE Real Estate) via bayutapi.com
export const baseURL = "https://uae-real-estate2.p.rapidapi.com";

const rapidApiHeaders = {
  "X-RapidAPI-Key": process.env.NEXT_APP_RAPID_API_KEY,
  "X-RapidAPI-Host": "uae-real-estate2.p.rapidapi.com",
  "Content-Type": "application/json",
};

// GET request
export const fetchApi = async (url) => {
  const { data } = await axios.get(url, {
    headers: rapidApiHeaders,
  });
  return data;
};

// POST request (for properties_search)
export const fetchApiPost = async (url, body) => {
  const { data } = await axios.post(url, body, {
    headers: rapidApiHeaders,
  });
  return data;
};
