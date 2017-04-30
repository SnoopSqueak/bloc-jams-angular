(function() {
    function AlbumCtrl(Fixtures) {
      this.albumData = Fixtures.getAlbum(albumPicasso);
    }

    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();
