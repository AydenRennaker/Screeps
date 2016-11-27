var roleClaimer = {

run: function (creep) {
    var targetRoom = creep.memory.target;
    if(targetRoom != creep.room.name){
	    var route = Game.map.findRoute(creep.room, targetRoom);
        if(route.length > 0) {
            var exit = creep.pos.findClosestByRange(route[0].exit);
            creep.moveTo(exit, {reusePath: 8});
        }
    }else{
        if(creep.room.name == "W53N52"){
            console.log(creep.claimController(creep.room.controller));
        }
        if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller, {reusePath: 8});
        }


    }

}
};

module.exports = roleClaimer;
