let  ScreenManager =
{
    width : 0,
    height : 0,
    oberserversList : new Set(),
    addObserver: function (oberserver)
    {
        this.oberserversList.add(oberserver);
    },
    removeObserver: function ( oberserver )
    {
        this.oberserversList.delete(oberserver);
    },
    notifyObservers: function()
    {
        this.oberserversList.forEach(
            o => o.ScreenSizeChanged()
        );
    },
    updateScreenData: function()
    {
        this.width = document.documentElement.clientWidth;
        this.height = document.documentElement.clientHeight;

        //this.notifyObservers();
        this.notifyObservers();
    }
}

//Object.defineProperty(ScreenManager,"singleton",
//     { writable: false, configurable: false});
//Object.preventExtensions(ScreenManager);
//Object.freeze(ScreenManager);

//listen for changes in screen size
window.onresize = ScreenManager.updateScreenData;

