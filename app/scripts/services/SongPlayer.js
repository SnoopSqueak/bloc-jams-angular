(function() {
    function SongPlayer($rootScope, Fixtures) {
        /**
        * @desc The object representation of this service
        * @type {Object}
        */
         var SongPlayer = {};

         /**
         * @desc The currently selected album
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
         var setSong = function(song) {
           if (currentBuzzObject) {
               stopSong(SongPlayer.currentSong);
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });

           currentBuzzObject.bind('timeupdate', function() {
              $rootScope.$apply(function() {
                  SongPlayer.currentTime = currentBuzzObject.getTime();
              });
          });

           SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Starts the buzz object and sets song.playing to true
        * @param {Object} song
        */
        var playSong = function(song) {
          currentBuzzObject.play();
          song.playing = true;
        };

        /**
        * @function stopSong
        * @desc Stops the buzz object and sets song.playing to null
        * @param {Object} song
        */
        var stopSong = function(song) {
          currentBuzzObject.stop();
          song.playing = null;
        };

        /**
        * @function getSongIndex
        * @desc Returns the index of the given song in the album's track list (0 is the first song)
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        /**
        * @desc The currently selected song
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Volume used for songs
        * @type {Number}
        */
        SongPlayer.volume = 80;

        /**
        * @function SongPlayer.play
        * @desc Plays the selected song if it is not the current song; if it
        *  is the current song, only play it if it is currently paused.
        * @param {Object} song
        */
         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
              setSong(song);
              playSong(song);
           } else if (SongPlayer.currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                   playSong(song);
               }
           }
         };

         /**
         * @function SongPlayer.pause
         * @desc Pauses the selected song buzz object and sets song.playing to false
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function SongPlayer.previous
        * @desc Set the current song to the previous song; if no previous song,
        *   stop playing current song and set the first song as the current song.
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                //stopSong(SongPlayer.currentSong);
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function SongPlayer.next
        * @desc Set the current song to the next song; if no next song,
        *   stop playing current song and set the last song as the current song.
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                //stopSong(SongPlayer.currentSong);
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        /**
        * @function setVolume
        * @desc Set volume for songs
        * @param {Number} volume
        */
        SongPlayer.setVolume = function(volume) {
            if (currentBuzzObject) {
                currentBuzzObject.setVolume(volume);
            }
            SongPlayer.volume = volume;
        };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
