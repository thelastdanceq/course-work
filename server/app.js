const express = require('express');
const mysql = require("mysql");
const cors = require("cors");

const app = express();


//config
app.use(express.json());
app.use(cors());
app.use(
    express.urlencoded({
        extended: true,
    })
);

let con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "123_lOl_321_qq",
    port: "3306",
    database: "sport_team",
});

//select
app.get('/teams', (require, response) => {

    let sql = "SELECT * FROM teams";

    con.query(sql, function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/staff', (require, response) => {

    let sql = "SELECT * FROM staff";

    con.query(sql, function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/statystic', (require, response) => {

    let sql = "select idstatystic, id_match , concat(player.player_name ,' ', player.player_surnamename) as playa, stat_catches_self , stat_waists , stat_scores from statystic join player on statystic.id_player = player.idplayer";

    con.query(sql, function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/player', (require, response) => {

    let sql = "select idplayer, player_name , player_surnamename , player_dateofbirth , player_height , weigth , qualifications_name , amplua_name , team_name from player p join qualifications q join amplua a join teams t on p.id_qual = q.idQualifications and p.id_amplua = a.idamplua and p.id_team = t.idteams;";

    con.query(sql, function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/matches', (require, response) => {

    let sql = "select idwow,  team_name , tean_name_two , score_one , score_two , tournam_name, match_date  from (select idmatches as 'idwow' , team_name, score_one , score_two, tournam_name, match_date from matches join teams join tournaments on matches.id_team_one = teams.idteams and tournaments.idtournaments = matches.id_tournament) as table1 join (select idmatches , team_name  as 'tean_name_two' from matches join teams on matches.id_team_two = teams.idteams) as table2 on table1.idwow = table2.idmatches ;";

    con.query(sql, function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})


//finder
app.get('/teams/:id', (require, response) => {

    let sql = "SELECT * FROM teams WHERE idteams LIKE ? or  team_name LIKE ?  or team_city LIKE? or team_country LIKE ? or team_rating LIKE ?;";

    con.query(sql, [require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%"], function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})

app.get('/player/:id', (require, response) => {

    let sql = "SELECT * FROM player WHERE idplayer LIKE ? or `player_name` like ? or `player_surnamename` like ? or `player_dateofbirth` like ? or `player_height` like ? or `weigth` like ? or `id_qual` like ? or `id_amplua` like ? or `id_team` like ? ";

    con.query(sql, [require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%"], function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/matches/:id', (require, response) => {

    let sql = "SELECT * FROM matches WHERE `id_team_one` like ? or `id_team_two` like ? or `score_one` like ? or `score_two` like ? or `id_tournament` like ? or `match_date` like ?";

    con.query(sql, [require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%"], function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})


app.get('/statystic/:id', (require, response) => {

    let sql = "SELECT * FROM statystic WHERE `id_match` like ? or `id_player` like ? or `stat_catches_self` like ? or `stat_waists` like ? or `stat_scores` like ?";

    con.query(sql, [require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%"], function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/staff/:id', (require, response) => {

    let sql = "SELECT * FROM staff WHERE `st_fname` like ? or `st_surname` like ? or `st_lname` like ? or `st_age` like ? or `id_pos` like ? or `id_team` like ? ;";

    con.query(sql, [require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%", require.params.id + "%"], function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})

//delete
app.delete('/teams/:id', (require, response) => {

    let sql = "DELETE FROM teams WHERE idteams = ?";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) throw err;
        response.send(result);
    });
})
app.delete('/staff/:id', (require, response) => {

    let sql = "DELETE FROM staff WHERE idstaff = ?";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) throw err;
        response.send(result);
    });
})
app.delete('/statystic/:id', (require, response) => {

    let sql = "DELETE FROM statystic WHERE idstatystic = ?";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) throw err;
        response.send(result);
    });
})

app.delete('/player/:id', (require, response) => {

    let sql = "DELETE FROM player WHERE idplayer = ?";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) throw err;
        response.send(result);
    });
})
app.delete('/matches/:id', (require, response) => {

    let sql = "DELETE FROM matches WHERE idmatches = ?";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
//insert
app.post('/teams', (require, response) => {
    let sql = "INSERT INTO teams(team_name, team_city, team_country, team_rating) VALUES (?,?,?,?)";
    con.query(sql, [require.body.team_name, require.body.team_city, require.body.team_country, require.body.team_rating], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
app.post('/staff', (require, response) => {
    let sql = "INSERT INTO `sport_team`.`staff` (`st_fname`, `st_surname`, `st_lname`, `st_age`, `id_pos`, `id_team`) VALUES (?, ?, ?, ?, ?, ?)";
    con.query(sql, [require.body.st_fname, require.body.st_surname, require.body.st_lname, require.body.st_age, require.body.id_pos, require.body.id_team], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
app.post('/player', (require, response) => {
    let sql = "insert into player(player_name,player_surnamename , player_dateofbirth,player_height ,weigth,id_qual,id_amplua,id_team) values(?,?,?, ?, ? ,(select idQualifications from qualifications where qualifications_name = ?),(select idamplua from amplua where amplua_name = ?),(select idteams from teams where team_name = ?)) ";
    con.query(sql, [require.body.player_name, require.body.player_surnamename, require.body.player_dateofbirth, require.body.player_height, require.body.weigth, require.body.qualifications_name, require.body.amplua_name, require.body.team_name], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
app.post('/matches', (require, response) => {
    let sql = "INSERT INTO matches (id_team_one , id_team_two , score_one , score_two , id_tournament , match_date) VALUES ((select idteams from teams where team_name = ?),(select idteams from teams where team_name = ?),? , ? , (select idtournaments from tournaments where tournam_name = ?),? )";
    con.query(sql, [require.body.team_name, require.body.tean_name_two, require.body.score_one, require.body.score_two, require.body.tournam_name, require.body.match_date], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
app.post('/statystic', (require, response) => {
    let sql = "insert into statystic(id_match , id_player , stat_catches_self , stat_waists ,stat_scores) Values (? , (select idplayer from player where SUBSTRING_INDEX(?,' ', 1) = player_name and SUBSTRING_INDEX(?,' ', -1) = player_surnamename), ?,?,?);"
    con.query(sql, [require.body.id_match, require.body.playa,require.body.playa, require.body.stat_catches_self, require.body.stat_waists, require.body.stat_scores], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
//update
app.put('/teams/:id', (require, response) => {
    let sql = "UPDATE teams SET team_name = ?, team_city = ?, team_country = ?, team_rating = ? WHERE idteams = ?";
    con.query(sql, [require.body.team_name, require.body.team_city, require.body.team_country, require.body.team_rating, require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
app.put('/staff/:id', (require, response) => {
    let sql = "UPDATE `sport_team`.`staff` SET `st_fname` = ?, `st_surname` = ?, `st_lname` = ?, `st_age` = ?, `id_pos` = ?, `id_team` = ? WHERE (`idstaff` = ?)";
    con.query(sql, [require.body.st_fname, require.body.st_surname, require.body.st_lname, require.body.st_age, require.body.id_pos, require.body.id_team, require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})
app.put('/statystic/:id', (require, response) => {
    let sql = "UPDATE statystic set id_match = ? ,id_player = (select idplayer from player where SUBSTRING_INDEX(?,' ', 1) = player_name and SUBSTRING_INDEX(?,' ', -1) = player_surnamename), stat_catches_self = ?  , stat_waists = ? , stat_scores = ? WHERE (`idstatystic` = ?)";
    con.query(sql, [require.body.id_match, require.body.playa, require.body.playa, require.body.stat_catches_self, require.body.stat_waists, require.body.stat_scores, require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})

app.put('/player/:id', (require, response) => {
    let sql = "update player set player_name = ?,player_surnamename = ?,player_dateofbirth = ?,player_height = ?,weigth= ?,id_qual = (select idQualifications from qualifications where qualifications_name = ?),id_amplua = (select idamplua from amplua where amplua_name = ?),id_team = (select idteams from teams where team_name = ?) where idplayer = ?";
    con.query(sql, [require.body.player_name, require.body.player_surnamename, require.body.player_dateofbirth, require.body.player_height, require.body.weigth, require.body.qualifications_name, require.body.amplua_name, require.body.team_name, require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})

app.put('/matches/:id', (require, response) => {
    let sql = "update matches set id_team_one = (select idteams from teams where team_name = ?), id_team_two = (select idteams from teams where team_name = ?), score_one = ?, score_two = ?, id_tournament = (select idtournaments from tournaments where tournam_name = ?) , match_date =?  WHERE (`idmatches` = ?)";
    con.query(sql, [require.body.team_name, require.body.tean_name_two, require.body.score_one, require.body.score_two, require.body.tournam_name, require.body.match_date, require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result);
    });
})

//functions
//select
app.get('/teamWinrate', (require, response) => {

    let sql = "select sport_team.WinrateOfOurTeam()";

    con.query(sql, function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})



//functions
app.get('/teamWinrates/:id', (require, response) => {

    let sql = "select sport_team.WinrateOfOurTeamAgainst(?)";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) throw err;
        response.send(result)
    });
})
app.get('/teamnames', (require, response) => {

    let sql = "SELECT idteams,team_name FROM sport_team.teams;";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})
//procedures
app.get('/avgcatches', (require, response) => {

    let sql = "call sport_team.avgCatchesForEveryPlayer();";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/avgscores', (require, response) => {

    let sql = "call sport_team.avgScoreForEveryPlayer()";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/avgwaists', (require, response) => {

    let sql = "call sport_team.avgWaistForEveryPlayer()";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})


app.get('/playernames', (require, response) => {

    let sql = "select player_surnamename from player;";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})



app.get('/avgstatinperiod/:date1/:date2/:surname', (require, response) => {

    let sql = "call sport_team.avgplayerStatinPeriod(?, ?, ?)";

    con.query(sql, [require.params.date1, require.params.date2, require.params.surname], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/statinperiod/:date1/:date2/:surname', (require, response) => {

    let sql = "call sport_team.playerStatinPeriod(?, ?, ?)";

    con.query(sql, [require.params.date1, require.params.date2, require.params.surname], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/matchesbetween/:date1/:date2', (require, response) => {

    let sql = "call sport_team.selectMatcheswithDatas(?, ?)";

    con.query(sql, [require.params.date1, require.params.date2], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})
app.get('/teamstatinmatch/:id', (require, response) => {

    let sql = "call sport_team.teamsStatinMatch(?)";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/matchMvp/:id', (require, response) => {

    let sql = "call sport_team.MVPofmatch(?)";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/periodMvp/:date1/:date2', (require, response) => {

    let sql = "call sport_team.MVPofperiod(?, ?)";

    con.query(sql, [require.params.date1, require.params.date2], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/teamstatinperiod/:date1/:date2', (require, response) => {

    let sql = "call sport_team.teamsStatinPeriod(?, ?)";

    con.query(sql, [require.params.date1, require.params.date2], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/matchesname', (require, response) => {

    let sql = "select idwow, team_name , tean_name_two , score_one , score_two   from (select idmatches as 'idwow' , team_name, score_one , score_two  from matches join teams on matches.id_team_one = teams.idteams) as table1 join (select idmatches , team_name  as 'tean_name_two' from matches join teams on matches.id_team_two = teams.idteams) as table2 on table1.idwow = table2.idmatches ;";

    con.query(sql, function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})

app.get('/ampluaname', (require, response) => {

    let sql = "select * from amplua";

    con.query(sql, function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})


app.get('/statwithampluaid/:id', (require, response) => {

    let sql = "call sport_team.statOfplayersWithAmplua(?)";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})


app.get('/idteams', (require, response) => {

    let sql = "select idteams from teams";

    con.query(sql, [require.params.id], function (err, result) {
        if (err) console.log(err);
        response.send(result)
    });
})



//listener
app.listen(3000);