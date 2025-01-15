import axios from "axios";
import { config } from "../../config";

const API_KEY = config.apiKey;

// const API_KEY = import.meta.env.VITE_API_KEY;

const baseUrl = "https://api.nytimes.com/svc";

export const fetchMostPopularArticles = async () => {
  try {
    const res = await axios.get(
      `${baseUrl}/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
    );
    if (!res.status === 200) {
      throw new Error(`Error: ${res.statusText}`);
    }
    return res.data.results;
  } catch (err) {
    throw new Error("API Error");
  }
};
