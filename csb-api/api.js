const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const _ = require('lodash-id')
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

//creating collection + using
const teamsAdapter = new FileSync('teams.json');
const adapter = new FileSync('example2.json');
const exampleAdapter = new FileSync('example.json');
const gameAdapter = new FileSync('game.json')
const inningsAdapter = new FileSync('innings.json')
const overAdapter = new FileSync('over.json')
const over = low(overAdapter);
const example = low(exampleAdapter);
const other = low(adapter);
const teams = low(teamsAdapter);
const game = low(gameAdapter);
const innings =low(inningsAdapter)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(bodyParser.json());

// create new team sending a json
app.get('/check', (req,res) => {
    res.send(true);
});

app.post('/team', (req,res) => {
    // const {miniName, shortName, midName, fullName } = req.body;
    const newID = _.createId()
    teams.set(newID, req.body)
    .write()
    res.json({
        status: "Success", 
        message: 'Created New Team',
        teamId: `${newID}`
    });
})
// retreive json of all registered teams
app.get('/team', (req,res) => {
    res.sendFile(`${__dirname}/teams.json`)
});

// Deletes the team with specified id on JSON object {iD: " "}
app.delete('/team', (req,res) => {
    const teamId = req.body.iD;
    teams.unset(teamId)
        .write()
        res.json({
            status: "Success",
            message: 'Team Removed'
        });
})

//Update Team status
app.put('/team/:teamId/update', (req,res) => {
    const {teamId} = req.params;
    teams.set(`${teamId}.miniName`, req.body.miniName)
        .set(`${teamId}.shortName`, req.body.shortName)
        .set(`${teamId}.midName`, req.body.midName)
        .set(`${teamId}.fullName`, req.body.fullName)
        .write();
    res.json({
        status: "Success",
        message: 'Team updated'
    });
});

//retreive team based on id
app.get('/team/:teamId', (req,res) => {
    const {teamId} = req.params;
    const team = teams.get(teamId)
        .value()
    res.send(team);
})

// Make a new player/s for a team (NEED NAME)
app.post('/team/:teamId/players/new', (req,res) =>{
    const {teamId} = req.params;
    const newID = _.createId()
    teams.get(teamId)
     .set(`players.${newID}.name`, req.body.name)
     .write()
        res.json({
            playerId: `${newID}`,
            status: "Success",
            message: 'New players created'
    });
})

//retreive players in specific team
app.get('/team/:teamId/players', (req,res) =>{
    const {teamId} = req.params;
    const team = teams.get(`${teamId}.players`)
        
        .value()
    res.send(team)
})
// create new game with two ids and game statistics on req.body
app.post('/game/new', (req,res) => {
    const home1 = req.body.home1;
    const home2 = req.body.home2;
    const home3 = req.body.home3;
    const home4 = req.body.home4;
    const home5 = req.body.home5;
    const home6 = req.body.home6;
    const home7 = req.body.home7;
    const home8 = req.body.home8;
    const home9 = req.body.home9;
    const home10 = req.body.home10;
    const home11 = req.body.home11;
    const away1 = req.body.away1;
    const away2 = req.body.away2;
    const away3 = req.body.away3;
    const away4 = req.body.away4;
    const away5 = req.body.away5;
    const away6 = req.body.away6;
    const away7 = req.body.away7;
    const away8 = req.body.away8;
    const away9 = req.body.away9;
    const away10 = req.body.away10;
    const away11 = req.body.away11;
    
    const newID = _.createId()
    var today = new Date().toLocaleString();
    // const teamHome = teams.get(`${req.body.homeId}.players`).value();
    // const teamAway = teams.get(`${req.body.awayId}.players`).value();
    const homeName = teams.get(`${req.body.homeId}.fullName`).value();
    const awayName = teams.get(`${req.body.awayId}.fullName`).value();
    game.set(newID, {})
        .set(`${newID}.timestamp`, today)
        .set(`${newID}.team`, {home: {teamId: req.body.homeId, teamName: homeName}, away: {teamId: req.body.awayId, teamName: awayName}})
        .set(`${newID}.settings`, {maxInnings: req.body.maxInnings, maxOvers: req.body.maxOvers, changeOverPeriod: req.body.changeOverPeriod, oversCarryOver: req.body.oversCarryOver, outrightAvailable: req.body.outrightAvailable})
        .set(`${newID}.team.home.players.${home1}`, {"name": teams.get(`${req.body.homeId}.players.${home1}.name`)})
        .set(`${newID}.team.home.players.${home2}`, {"name": teams.get(`${req.body.homeId}.players.${home2}.name`)})
        .set(`${newID}.team.home.players.${home3}`, {"name": teams.get(`${req.body.homeId}.players.${home3}.name`)})
        .set(`${newID}.team.home.players.${home4}`, {"name": teams.get(`${req.body.homeId}.players.${home4}.name`)})
        .set(`${newID}.team.home.players.${home5}`, {"name": teams.get(`${req.body.homeId}.players.${home5}.name`)})
        .set(`${newID}.team.home.players.${home6}`, {"name": teams.get(`${req.body.homeId}.players.${home6}.name`)})
        .set(`${newID}.team.home.players.${home7}`, {"name": teams.get(`${req.body.homeId}.players.${home7}.name`)})
        .set(`${newID}.team.home.players.${home8}`, {"name": teams.get(`${req.body.homeId}.players.${home8}.name`)})
        .set(`${newID}.team.home.players.${home9}`, {"name": teams.get(`${req.body.homeId}.players.${home9}.name`)})
        .set(`${newID}.team.home.players.${home10}`, {"name": teams.get(`${req.body.homeId}.players.${home10}.name`)})
        .set(`${newID}.team.home.players.${home11}`, {"name": teams.get(`${req.body.homeId}.players.${home11}.name`)})
        .set(`${newID}.team.away.players.${away1}`, {"name": teams.get(`${req.body.awayId}.players.${away1}.name`)})
        .set(`${newID}.team.away.players.${away2}`, {"name": teams.get(`${req.body.awayId}.players.${away2}.name`)})
        .set(`${newID}.team.away.players.${away3}`, {"name": teams.get(`${req.body.awayId}.players.${away3}.name`)})
        .set(`${newID}.team.away.players.${away4}`, {"name": teams.get(`${req.body.awayId}.players.${away4}.name`)})
        .set(`${newID}.team.away.players.${away5}`, {"name": teams.get(`${req.body.awayId}.players.${away5}.name`)})
        .set(`${newID}.team.away.players.${away6}`, {"name": teams.get(`${req.body.awayId}.players.${away6}.name`)})
        .set(`${newID}.team.away.players.${away7}`, {"name": teams.get(`${req.body.awayId}.players.${away7}.name`)})
        .set(`${newID}.team.away.players.${away8}`, {"name": teams.get(`${req.body.awayId}.players.${away8}.name`)})
        .set(`${newID}.team.away.players.${away9}`, {"name": teams.get(`${req.body.awayId}.players.${away9}.name`)})
        .set(`${newID}.team.away.players.${away10}`, {"name": teams.get(`${req.body.awayId}.players.${away10}.name`)})
        .set(`${newID}.team.away.players.${away11}`, {"name": teams.get(`${req.body.awayId}.players.${away11}.name`)})
        .write()
    res.json({
        gameId: `${newID}`,
        status: "Success", 
        message: 'Created New game'
    });
})

app.get('/game', (req,res) => {
    res.sendFile(`${__dirname}/game.json`)
})
// ALL data for specific game
app.get('/game/:gameid', (req, res) => {
    const {gameid} = req.params;
    const gameDetail = game.get(gameid) 
        .value();
    res.send(gameDetail)
});
//get teams for specific gameid
app.get('/game/:gameid/teamNames', (req,res) => {
    const {gameid} = req.params;
    const team1 = game.get(`${gameid}.team.home.teamName`)
        .value()
    const team2 = game.get(`${gameid}.team.away.teamName`)
        .value()
    res.send(`${team1} & ${team2}`);

})

// Check settings for specific game
app.get('/game/:gameid/settings', (req,res) => {
    const {gameid} = req.params;
    const gameSettings = game.get(`${gameid}.settings`)
        .value()
    res.send(gameSettings);
});

// Add new innings for specific game (NEED BATTINGTEAM AS HOME OR AWAY)
app.post('/game/:gameid/innings', (req,res) => { //Specify batting team in res.body
    const newID = _.createId()
    const {gameid} = req.params;
    const battingTeam = req.body.battingTeam; //write home or away
    var bowlingTeam = (battingTeam == 'home') ? "away" : "home";
    const battingTeamPlayers = game.get(`${gameid}.team.${battingTeam}.players`)
        .value();
    const battingTeamName = game.get(`${gameid}.team.${battingTeam}.teamName`)
    const battingTeamId = game.get(`${gameid}.team.${battingTeam}.teamId`)
        .value();
    const bowlingTeamPlayers = game.get(`${gameid}.team.${bowlingTeam}.players`)
        .value();
    const bowlingTeamName = game.get(`${gameid}.team.${bowlingTeam}.teamName`)
    const bowlingTeamId = game.get(`${gameid}.team.${bowlingTeam}.teamId`)
        .value();

    // playerStats object
    var playerStats = [];
    Object.keys(battingTeamPlayers).forEach(key => {
        playerStats.push({
            id: key,
            name: `${teams.get(`${battingTeamId}.players.${key}.name`).value()}`,
            batting: {
                runs: 0,
                balls: 0,
                fours: 0,
                sixes: 0,
                retiredHurt: false,
                out: false, // This will either be false or an object
                onStrike: false,
                atCrease: false
            }
        })
    });

    var bowlingplayerStats = [];
    Object.keys(bowlingTeamPlayers).forEach(key => {
        bowlingplayerStats.push({
            id: key,
            name: `${teams.get(`${bowlingTeamId}.players.${key}.name`).value()}`,
            bowling: {
                runs: 0,
                overs: [0,0],
                wickets: 0
            }
        })
    });
    
        innings.set(`${newID}.inningsId`, newID)
        .set(`${newID}.gameId`, gameid)
        .set(`${newID}.battingTeamId`, battingTeamId)
        .set(`${newID}.battingTeam`, battingTeam)
        .set(`${newID}.battingTeamName`, battingTeamName)
        .set(`${newID}.bowlingTeamId`, bowlingTeamId)
        .set(`${newID}.bowlingTeam`, bowlingTeam)
        .set(`${newID}.bowlingTeamName`, bowlingTeamName)
        .set(`${newID}.totals`, {runs: 0, overs: [0,0], wickets: 0, extras: 0})
        .set(`${newID}.overs`, [])
        .set(`${newID}.players`, playerStats)
        .set(`${newID}.players[0].batting.atCrease`, true)
        .set(`${newID}.players[0].batting.onStrike`, true)
        .set(`${newID}.players[1].batting.atCrease`, true)
        .set(`${newID}.bowlingPlayers`, bowlingplayerStats)
        .write();
       res.json({
        inningsId: `${newID}`,
        status: "Success", 
        message: 'Created New Innings'
    });
});

// get ALL innings for specified game
app.get('/game/:gameid/innings', (req,res) => {
    const {gameid} = req.params;
    const result = innings.filter(function(o) { return o.gameId == gameid; })
        .value()
    res.send(result)
        // .find(function(o) { return o.gameid == gameid; })
        
        // .value()

})

//GET INNINGS STATISTICS ON SPECIFIC INNINGS (NEED INNIGS ID)
app.get(`/game/innings/:inningsId/`, (req,res) => {
    const {inningsId} = req.params;
    const result = innings.get(`${inningsId}`)
        .value()
    res.send(result)
})

//CREATE NEW OVER FOR SPECIIFIC INNINGS (NEED BOWLER ID)
app.post('/game/innings/:inningsId/overs/new', (req,res) => {
    const {inningsId} = req.params;
    const newID = _.createId();

    over.set(`${newID}.inningsId`, inningsId)
        .set(`${newID}.overId`, newID)
        .set(`${newID}.bowlerId`, req.body.bowlerId)
        .set(`${newID}.runs`, 0)
        .set(`${newID}.wickets`, 0)
        .set(`${newID}.balls`, [])
        .write();
        res.json({
            overId: `${newID}`,
            status: "Success", 
            message: 'Created New Over'
        })
});

//GET OVERS FOR SPECIFIED INNINGS (NEED INNINGS ID)
app.get(`/game/innings/:inningsId/overs`, (req,res) => {
    const {inningsId} = req.params;
    const finalResult = innings.get(`${inningsId}.overs`).value()
    res.send(finalResult)
})

//GET INFORMATION FOR SPECIFIC OVER (NEED OVER ID)
app.get(`/game/innings/overs/:overId`, (req,res) => {
    const {overId} = req.params;
    const finalResult = over.get(`${overId}`).value()
    res.send(finalResult)
})

//GET CURRENT OVER (NEED INNINGS ID)
app.get(`/game/innings/:inningsId/over/current`, (req,res) => {
    const {inningsId} = req.params;
    const finalResult = over.findLast(function(o) { return o.inningsId == inningsId; }).value();
    res.send(finalResult)
})

//CREATE NEW BALL FOR SPECIFIC OVER (NEED BALL STATS & BATSMAN ID )
app.post('/game/innings/overs/:overId/balls/new',(req, res) => {
    const {overId} = req.params;
    const inningsId = over.get(`${overId}.inningsId`).value()
    var byes = req.body.byes || 0;
    var legByes = req.body.legByes || 0;
    var wides = req.body.wides || 0;
    var noBalls = req.body.noBalls || 0;
    var batsmanOnStrike = innings.get(`${inningsId}.players`)
        .find(function(o) { return o.batting.onStrike == true; })
        .value();
    var batsmanId = batsmanOnStrike.id;
    var batsmanNonStrike = innings.get(`${inningsId}.players`)
        .find(function(o) { return o.batting.onStrike == false && o.batting.atCrease == true; })
        .value();
    var OtherBatsmanId = batsmanNonStrike.id
    var runs = req.body.runs || 0;
    var wicket = req.body.wicket || false;
    var howOut = req.body.howOut || "";
    var retiredHurt = req.body.retiredHurt || false;
    var totalRuns = (byes+legByes+wides+noBalls+runs)
    var extras = (byes+legByes+wides+noBalls)
    var lastBatsman = (innings.get(`${inningsId}.totals.wickets`) == 9) ? true : false;
    

 



    const ballObject = {
        "totalRuns": totalRuns,
        "extras": {
            "byes": byes,
            "legByes": legByes,
            "wides": wides,
            "noBalls": noBalls
        },
        "batsman": {
            "batsmanId": batsmanId,
            "runs": runs
        },
        "wicket": wicket,
        "howOut": howOut
    };

    over.get(`${overId}.balls`)
        .push(ballObject)
        .write();
    
    //Defining runs statistic within innings and overs json

    const overRuns =  over.get(`${overId}.runs`).value()
    const inningsRuns = innings.get(`${inningsId}.totals.runs`).value()
   
    over.set(`${overId}.runs`, overRuns + totalRuns)
        .write();
    
    innings.set(`${inningsId}.totals.runs`, inningsRuns + totalRuns)
        .write();

    //Create temporrary array based on balls stored within each over json
    const inningsCurrentOver = innings.get(`${inningsId}.overs`).value()
    const inningsCurrentBall = over.get(`${overId}.balls`).value()
    var tempArray = [inningsCurrentOver.length, inningsCurrentBall.length]

    //Update innings statistic with each new ball saved.
    innings.get(`${inningsId}.totals.overs`)   
        .remove(n => n % 1 !== -1)
        .write();

    innings.set(`${inningsId}.totals.overs`, tempArray)
        .write();

    //Add extras to innings total

    innings.update(`${inningsId}.totals.extras`, n => n + extras)
        .write()

    //Return bowler for this over
    const bowlerId = over.get(`${overId}.bowlerId`).value()
    const specificBowlerIndex = innings.get(`${inningsId}.bowlingPlayers`)
        .findIndex(function(o) { return o.id == bowlerId; })
        .value()  

    //Create Temporary array based on overs and balls done by specific bowler
    const bowlersOvers = innings.get(`${inningsId}.overs`)
        .filter(function(o) { return o.bowlerId == bowlerId; })
        .value();
    var tempBowlingArray = [bowlersOvers.length, inningsCurrentBall.length]
    innings.set(`${inningsId}.bowlingPlayers[${specificBowlerIndex}].bowling.overs`, tempBowlingArray)
        .write()
    
    innings.update(`${inningsId}.bowlingPlayers[${specificBowlerIndex}].bowling.runs`, n => n + extras)
        .write()

 
     //Update runs and balls
    const otherBatsmanIndex = innings.get(`${inningsId}.players`)
        .findIndex(function(o) { return o.id == OtherBatsmanId; })
        .value();
    const specificBatsmanIndex = innings.get(`${inningsId}.players`)
        .findIndex(function(o) { return o.id == batsmanId; })
        .value()
    innings.update(`${inningsId}.players[${specificBatsmanIndex}].batting.runs`, n => n + runs)
        .update(`${inningsId}.players[${specificBatsmanIndex}].batting.balls`, n => n + 1)
        .update(`${inningsId}.bowlingPlayers[${specificBowlerIndex}].bowling.runs`, n => n + runs)
        .write();
    
     //Update Batsman wicket to out
     if(wicket == true && lastBatsman == false){
    
    // var nextBatsman = innings.get(`${inningsId}.players`)
    //     .find(function(o) { return o.batting.onStrike == false && o.batting.atCrease == false && o.batting.out == false })
    //     .value();
    var nextBatsmanId = req.body.nextBatsmanId
    const nextBatsmanIndex = innings.get(`${inningsId}.players`)
    .findIndex(function(o) { return o.id == nextBatsmanId; })
    .value();

    innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.out`, true)
        .write();

    const totalWicket = innings.get(`${inningsId}.players`)
        .filter(function(o) { return o.batting.out == true; })
        .value()

    innings.set(`${inningsId}.totals.wickets`, totalWicket.length)
        .update(`${inningsId}.bowlingPlayers[${specificBowlerIndex}].bowling.wickets`, n => n + 1)
        .set(`${inningsId}.players[${specificBatsmanIndex}].batting.atCrease`, false)
        .set(`${inningsId}.players[${specificBatsmanIndex}].batting.onStrike`, false)
        .set(`${inningsId}.players[${nextBatsmanIndex}].batting.onStrike`, true)
        .set(`${inningsId}.players[${nextBatsmanIndex}].batting.atCrease`, true)
        .write()

    over.update(`${overId}.wickets`, n => n + 1)
        .write()
     }

     if(wicket == true && lastBatsman == true){
    
        innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.out`, true)
            .write();
    
        const totalWicket = innings.get(`${inningsId}.players`)
            .filter(function(o) { return o.batting.out == true; })
            .value()
    
        innings.set(`${inningsId}.totals.wickets`, totalWicket.length)
            .update(`${inningsId}.bowlingPlayers[${specificBowlerIndex}].bowling.wickets`, n => n + 1)
            .set(`${inningsId}.players[${specificBatsmanIndex}].batting.atCrease`, false)
            .set(`${inningsId}.players[${specificBatsmanIndex}].batting.onStrike`, false)
            .write()
    
        over.update(`${overId}.wickets`, n => n + 1)
            .write()
     }
     // Update batsman four statistic
     if (runs == 4){

    innings.update(`${inningsId}.players[${specificBatsmanIndex}].batting.fours`, n => n + 1)
        .write();
     }
     
     // Update batsman six statistics
     if (runs == 6){
         
    innings.update(`${inningsId}.players[${specificBatsmanIndex}].batting.sixes`, n => n + 1)
        .write();
     }

     // Update Retired Hurt statistics
     if (retiredHurt == true && lastBatsman == false){
   
     innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.out`, true)
        .write();

    const totalWicket = innings.get(`${inningsId}.players`)
        .filter(function(o) { return o.batting.out == true; })
        .value()

    innings.set(`${inningsId}.totals.wickets`, totalWicket.length)

    
    var nextBatsman = innings.get(`${inningsId}.players`)
        .find(function(o) { return o.batting.onStrike == false && o.batting.atCrease == false && o.batting.out == false })
        .value();
    var nextBatsmanId = nextBatsman.id
    const nextBatsmanIndex = innings.get(`${inningsId}.players`)
        .findIndex(function(o) { return o.id == nextBatsmanId; })
        .value();

    innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.retiredHurt`, true)
        .set(`${inningsId}.players[${specificBatsmanIndex}].batting.atCrease`, false)
        .set(`${inningsId}.players[${specificBatsmanIndex}].batting.onStrike`, false)
        .set(`${inningsId}.players[${nextBatsmanIndex}].batting.onStrike`, true)
        .set(`${inningsId}.players[${nextBatsmanIndex}].batting.atCrease`, true)
        .write();  
          
     }

     if (retiredHurt == true && lastBatsman == true){

        innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.out`, true)
            .write();

        const totalWicket = innings.get(`${inningsId}.players`)
            .filter(function(o) { return o.batting.out == true; })
            .value()

        innings.set(`${inningsId}.totals.wickets`, totalWicket.length)

        innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.retiredHurt`, true)
            .set(`${inningsId}.players[${specificBatsmanIndex}].batting.atCrease`, false)
            .set(`${inningsId}.players[${specificBatsmanIndex}].batting.onStrike`, false)
            .write();  
              
         }

     if (runs == 1 || runs == 3 || runs == 5 || byes == 1 || byes == 3 || byes == 5 || legByes == 1 || legByes == 3 || legByes == 5 || wides == 2){
    innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.onStrike`, false)
        .set(`${inningsId}.players[${otherBatsmanIndex}].batting.onStrike`, true)
        .write();
     }
     
    
    res.json({
        status: "Success", 
        message: 'Created New Ball'
    })

})

//GET INFORMATION FOR SPECIFIC BALL IN AN OVER (NEED OVER ID AND NUMBER OF BALL)
app.get(`/game/innings/overs/:overId/balls/:ballNum`, (req,res) => {
    const {ballNum} = req.params;
    const {overId} = req.params;
    const finalResult = over.get(`${overId}.balls[${ballNum - 1}]`).value()
    res.send(finalResult)
})

//SAVE OVER TO INNINGS DB (NEED OVER ID)
app.post('/game/innings/overs/save', (req,res) => {
    const overId = req.body.overId
    const inningsId = over.get(`${overId}.inningsId`)
    var batsmanOnStrike = innings.get(`${inningsId}.players`)
        .find(function(o) { return o.batting.onStrike == true; })
        .value();
    var batsmanId = batsmanOnStrike.id;
    var batsmanNonStrike = innings.get(`${inningsId}.players`)
        .find(function(o) { return o.batting.onStrike == false && o.batting.atCrease == true; })
        .value();
    var OtherBatsmanId = batsmanNonStrike.id   

    //Adds new over object to innings
    innings.get(`${inningsId}.overs`)
        .push(over.get(overId).value())
        .write()

    //Create temporary array for updated over total
    const overArray = innings.get(`${inningsId}.overs`).value()
    var tempArray = [overArray.length, 0]
    
    //Create temporary array for bowler stats
    const bowlerId = over.get(`${overId}.bowlerId`).value()
    const specificBowlerIndex = innings.get(`${inningsId}.bowlingPlayers`)
            .findIndex(function(o) { return o.id == bowlerId; })
            .value() 
    const bowlersOvers = innings.get(`${inningsId}.overs`)
        .filter(function(o) { return o.bowlerId == bowlerId; })
        .value();
    var tempBowlingArray = [bowlersOvers.length, 0]

    //Update bowler overs array
    innings.set(`${inningsId}.bowlingPlayers[${specificBowlerIndex}].bowling.overs`, tempBowlingArray)
        .write()

    //update the innings over array statistic
                            // innings.get(`${inningsId}.totals.overs`)   
                            //     .remove(n => n % 1 !== -1)
                            //     .write();

    innings.set(`${inningsId}.totals.overs`, tempArray)
        .write();

    //Update the total runs to saved over
    const runArray = innings.get(`${inningsId}.overs`)
        .map(function(o) { return o.runs})
        .value()
    var currentRunTotal = runArray.reduce((a, b) => a + b, 0);
    innings.set(`${inningsId}.totals.runs`, currentRunTotal)
        .write();

    //Change Batsmen after over is completed
    const otherBatsmanIndex = innings.get(`${inningsId}.players`)
        .findIndex(function(o) { return o.id == OtherBatsmanId; })
        .value();
    const specificBatsmanIndex = innings.get(`${inningsId}.players`)
        .findIndex(function(o) { return o.id == batsmanId; })
        .value()

    innings.set(`${inningsId}.players[${specificBatsmanIndex}].batting.onStrike`, false)
        .set(`${inningsId}.players[${otherBatsmanIndex}].batting.onStrike`, true)
        .write();
        
    res.json({
        status: "Success", 
        message: 'Saved Over'
    })
})

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});


console.log('success');





