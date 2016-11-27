var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var target = creep.memory.target;
        if(creep.room.name != target){
              var route = Game.map.findRoute(creep.room, target);
              if(route.length > 0) {
                  var exit = creep.pos.findClosestByRange(route[0].exit);
                  creep.moveTo(exit);
              }

        }else{
            var sources = creep.room.find(FIND_SOURCES);

            Memory.rooms[target].scouted = true;

            if(creep.room.find(FIND_HOSTILE_CREEPS).length > 0){
              Memory.rooms[target].status = "enemy";
            }

            creep.moveTo(sources[0]);
            var terrain;
            Memory.rooms[target].veins = [];
            for(var s in sources){
              Memory.rooms[target].veins[s] = {};
              var found = false;
              var x = sources[s].pos.x;
              var y = sources[s].pos.y;

              terrain = creep.room.lookAtArea(y-1,x-1,y+1,x+1, true); // top left bot rig
              for(var i in terrain){
                //console.log(terrain[i].terrain);
                // console.log(target);
                // console.log(terrain[i].terrain);
                // console.log(terrain[i].x + " " + terrain[i].y);
                if(((terrain[i].type == "terrain") && (terrain[i].terrain == "plain" || terrain[i].terrain == "swamp")) && !found){
                  //console.log(target);
                                //console.log(terrain[i].x + " " + terrain[i].y);

                  creep.room.createConstructionSite(terrain[i].x,terrain[i].y, STRUCTURE_CONTAINER);

                  Memory.rooms[target].veins[s].contX = terrain[i].x;
                  Memory.rooms[target].veins[s].contY = terrain[i].y;
                  Memory.rooms[target].veins[s].source = sources[s].id;
                  found = true;
                }
              }
            }

        }



	  }
};

module.exports = roleScout;
