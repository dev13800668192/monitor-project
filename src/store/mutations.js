export default{
    initCacheData(state,playload){
        state.cacheData=playload
    },
    getType(state,playload){
        state.type = playload
    },
    initAllData(state,playload){
        state.cpu= playload
    },
    initAllDatas(state,playload){
        // console.log(state[playload.param])
        state[playload.param]= playload.val
    },
    changePath(state,playload){
        state.path = playload
        console.log(state.path)
    }
}
