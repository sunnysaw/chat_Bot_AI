import axios from "axios";

const backendConnection = async (query) =>
{
    // const userQuery = JSON.parse(query)
  const response = await axios.get(`http://localhost:3000/agent`, {
    params: { query },
  });
    console.log(response.data);
    
  return response.data;
};

export default backendConnection;
