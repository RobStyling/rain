const sql = require(`sqlite`);
sql.open(`./db/scores.db`);

exports.run = (client, msg) => 
{
    if(msg.author.bot == true) return;

    sql.get(`SELECT * FROM scores WHERE userID = '${msg.author.id}'`).then(row => {
        if(!row) 
        {
            sql.run(`INSERT INTO scores (userId, points, level) VALUES (?,?,?)`, [msg.author.id, 1, 0]);
        }
        if(row)
        {
            sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${msg.author.id}`);
        }
        let curLevel = Math.floor(0.3 * Math.sqrt(row.points + 1));
        if (curLevel > row.level) 
        {
            row.level = curLevel;
            sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${msg.author.id}`);
            msg.reply(`Well.. you just Leveled Up to **Level ${curLevel}**! Congrats!`);
        }
    }).catch(() => 
    {
        console.error;
        sql.run(`CREATE TABLE IF NOT EXISTS "scores" (userId TEXT, points INTEGER, level INTEGER)`).then(() => 
        {
            sql.run(`INSERT INTO scores (userId, points, level) VALUES (?,?,?)`, [msg.author.id, 1, 0]);
        });
    });
};