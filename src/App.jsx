import { useState, useEffect } from "react";
import Web3 from "web3";
import dataContract from "./contracts/dataContract.json";
import Card from "./components/Card";

const contractAddress = "0xa0ADE45E49703393C576D36392017E93d7aA8A86";
const web3 = new Web3(window.ethereum);

function App() {
  const [data, setData] = useState("");
  const [newData, setNewData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const contract = new web3.eth.Contract(dataContract.abi, contractAddress);
      const result = await contract.methods.getData().call();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateData = async () => {
    try {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const contract = new web3.eth.Contract(
          dataContract.abi,
          contractAddress
        );
        await contract.methods
          .setData(newData)
          .send({ from: window.ethereum.selectedAddress });
        setNewData("");
        fetchData();
      } else {
        alert("Please connect to MetaMask first.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <Card>
        <h1>Simple Web 3</h1>
        <p>Current Data: {data}</p>
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
        />
        <button onClick={updateData}>Update Data</button>
      </Card>
      <p>
        This is my simple web 3. Try it by connecting first your MetaMask. Make
        sure you are in Binance Testnet.
      </p>
    </>
  );
}

export default App;
