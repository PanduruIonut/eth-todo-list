import("../vendor/@truffle/contract/dist/truffle-contract.js");
App = {
    loading: false,
    contracts: {},

    load: async () => {
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: () => {  
        
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
        }
        
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            return true;
        }
        return false;
    },

    loadAccount: async ()=> {
        App.account = await web3.eth.getAccounts();
    },

    loadContract: async () => {
        // Create a Js version of the smart contract
        const todoList = await $.getJSON('TodoList.json')
        App.contracts.TodoList = TruffleContract(todoList)
        App.contracts.TodoList.setProvider(App.web3Provider)
        
        // Hydrate the smart contract with value from blockchain
        App.todoList = await App.contracts.TodoList.deployed()
    },

    render: async () => {
        if(App.loading) {
            return
        }

        App.setLoading(true)

        $('#account').html(App.account)

        App.setLoading(false)
    },
    
    setLoading: (boolean) => {
        App.loading = boolean
        const loader = $('#loader')
        const content = $('#content')
        if (boolean) {
          loader.show()
          content.hide()
        } else {
          loader.hide()
          content.show()
        }
      }
    }
                  
    $(()=> {
        $(window).load(() => {
            App.load()
        })
    })