BandQModule.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
          //  //console.log("Filter START : "+start);
            return input.slice(start);
        }
        return [];
    }
});


