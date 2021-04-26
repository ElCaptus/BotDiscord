async function play(connection, url) {
    connection.playOpusStream(await ytdl(url));
  }

module.exports.play = play;