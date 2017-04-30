(function() {
    function SongPlayer() {
        /**
        * @desc The object representation of this service
        * @type {Object}
        */
         var SongPlayer = {};

         /**
         * @desc The currently selected song
         * @type {Object}
         */
         var currentSong = null;

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
               currentBuzzObject.stop();
               currentSong.playing = null;
           }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
               formats: ['mp3'],
               preload: true
           });

           currentSong = song;
        };

        /**
        * @function playSong
        * @desc Starts the buzz object and sets song.playing to true
        */
        var playSong = function() {
          currentBuzzObject.play();
          song.playing = true;
        };

        /**
        * @function SongPlayer.play
        * @desc Plays the selected song if it is not the current song; if it
        *  is the current song, only play it if it is currently paused.
        * @param {Object} song
        */
         SongPlayer.play = function(song) {
           if (currentSong !== song) {
              setSong(song);
              playSong();
           } else if (currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                   playSong();
               }
           }
         };

         /**
         * @function SongPlayer.pause
         * @desc Pauses the selected song buzz object and sets song.playing to false
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

         return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
