
     ethEnabled = () => {  if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
              window.ethereum.enable();
                  return true;
                  }
                   return false;}

    $(()=> {
        $(window).load(() => {
            ethEnabled()
        })
    })