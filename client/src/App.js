import React, { Component } from 'react'
import MedicalContract from './contracts/Medical.json'
import getWeb3 from './utils/getWeb3'

import './App.css'

class App extends Component {

  state = {
    medicalInstance: undefined,
    web3: null,
    account: null,
    nameExam: '',
    typeExam: ''
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3()

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts()

      // Get the contract instance.
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = MedicalContract.networks[networkId]
      const instance = new web3.eth.Contract(
        MedicalContract.abi,
        deployedNetwork && deployedNetwork.address,
      )

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ medicalInstance: instance, web3: web3, account: accounts[0] })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.log(error)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddExam = async (e) => {
    const { nameExam, typeExam, medicalInstance, account, web3 } = this.state
    if (typeof medicalInstance !== 'undefined') {
      e.preventDefault()

      let result = await medicalInstance.methods
        .addExam(nameExam, typeExam)
        .send({
          from: account, value: web3.utils
        })
      this.setLastTransactionDetails(result)
    }
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>
    }
    const { medicalInstance, account, web3, nameExam, typeExam } = this.state
    console.log(this.state)
    return (
      <div className='App'>
        <h2>Add Exam</h2>
        <form onSubmit={this.handleAddExam}>
          <input placeholder='Input name of Exam...' name='nameExam' value={nameExam} onChange={this.handleChange} /><br />
          <input placeholder='Input type of Exam...' name='typeExam' value={typeExam} onChange={this.handleChange} /><br />
          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default App
