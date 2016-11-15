$("#victimWitnessView").on("click",function(){
    //console.log("Victim Witness View");
    localStorage.setItem("currentSection","view");
});

$("#victimWitnessAdd").on("click",function(){
    //console.log("Victim Witness Add");
    localStorage.setItem("currentSection","add");
});

//
//var input = document.getElementById("saveServer");
//localStorage.setItem("server", input.value);