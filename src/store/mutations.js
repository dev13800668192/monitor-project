export default{
    initCacheData(state,playload){
        state.cacheData=playload
    },
    getType(state,playload){
        state.type = playload
    },
    initAllData(state,param,playload){
        state[param]=playload
    }
}
