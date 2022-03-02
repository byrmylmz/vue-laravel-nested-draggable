import * as API from './API';

export default{
    getCategories(){
        return API.apiClient.get('/categories-with-boards')
    },
    postCategories(payload){
        return API.apiClient.post('/categories-test',{categories:payload})
    }
}