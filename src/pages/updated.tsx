import React, { useState } from "react"
import { ethers } from "ethers"
import multicallAddressToAmount from "../blockchain/MultiCallAddress.json"
import "./index.css"

// Replace this with your contract ABI and address
const contractABI = multicallAddressToAmount.abi
const contractAddress = "0x30a9279d6deA116fb08CF2c22EF2aeC6A6C8ce91"

const UpdatedMain = () => {
    const [addresses, setAddresses] = useState<string[]>([])  // Array to store entered addresses
    const [amount, setAmount] = useState("")  // Amount to send
    const [addressList, setAddressList] = useState<string[]>([])  // Array to control the list of inputs

    // Handle address input changes
    const handleAddressChange = (index: number, value: string) => {
        const updatedAddresses = [...addresses]
        updatedAddresses[index] = value
        setAddresses(updatedAddresses)
    }

    // Handle delete address
    const deleteAddress = (index: number) => {
        const updatedAddresses = [...addresses]
        const updatedAddressList = [...addressList]
        updatedAddresses.splice(index, 1)
        updatedAddressList.splice(index, 1)
        setAddresses(updatedAddresses)
        setAddressList(updatedAddressList)
    }

    // Handle form submission and interact with the contract
    const handleSubmit = async () => {
        try {
            if (!ethers.isAddress(addresses[0])) {
                alert("Please enter valid Ethereum addresses");
                return;
            }

            // Ensure the user has connected their wallet
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum)
                console.log("Provider: ", provider)
                const signer = await provider.getSigner()

                // Check the connected address
                const userAddress = await signer.getAddress()
                console.log("Connected address: ", userAddress)

                // Get the contract instance
                const contract = new ethers.Contract(contractAddress, contractABI, signer)
                console.log("Contract instance: ", contract)

                // const contractWithSigner = contract.connect(signer)

                // Convert the amount to a proper ether format
                const ethAmount = ethers.parseEther(amount)
                console.log("ETH amount: ", ethAmount)

                // Send transaction to the contract
                const tx = await contract.multiCallAddressToAmount(addresses, {
                    value: ethAmount,
                    gasLimit: 300000 // Adjust gas limit if needed
                })
                await tx.wait()

                console.log("Transaction: ", tx)

                // contract.on("MultiCallAddressToAmount", (amount, length) => {
                //     console.log("Amount: ", amount)
                //     console.log("Length: ", length)
                // })

                alert("Transaction successful!")
            } else {
                alert("Please install MetaMask or connect to an Ethereum wallet.")
            }
        } catch (error) {
            console.error("Transaction failed: ", error)
            alert("Transaction failed, check the console for more details.")
        }
    }

    return (
        <div>
            <h1>multicall-address-to-amount</h1>
            {addressList.map((addr, index) => (
                <div key={index}>
                    <input 
                        type="text" 
                        placeholder="Enter address" 
                        value={addresses[index] || ""} // Bind the value of each input to the correct address
                        onChange={(e) => handleAddressChange(index, e.target.value)} 
                    />
                    <button onClick={() => deleteAddress(index)}>Delete Address</button>
                </div>
            ))}
            <button onClick={() => setAddressList([...addressList, "address"])}>Add Address</button>
            <div>
                <input 
                    type="text" 
                    placeholder="Enter amount" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                />
            </div>
            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default UpdatedMain
