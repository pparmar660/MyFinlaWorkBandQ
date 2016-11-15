BandQModule.service("checkInternetConnectionService", function () {
   var self=this;
    this.netWorkConnectionLoaded = false;

    this.checkNetworkConnection = function () {
        try{

        if (!navigator.network)
            navigator.network = window.top.navigator.network;

        if (staticApp) {
            return ((navigator.network.connection.type === "none" || navigator.network.connection.type === null ||
                    navigator.network.connection.type === "unknown") ? true : true);
        } else {
            return ((navigator.network.connection.type === "none" || navigator.network.connection.type === null ||
                    navigator.network.connection.type === "unknown") ? false : true);
        }
    }catch(e){
        console.log("error in webRequest "+ JSON.stringify(e));
    }
    }

    this.setValueOfNetWorkConnection = function () {
        
         //console.log("here "+navigator.networ);
        if (!navigator.network)
        {
            setTimeout(function () {
                self.setValueOfNetWorkConnection();
            }, 100);
        } else {
            this.netWorkConnectionLoaded = true;
        }

    }
    
   


});