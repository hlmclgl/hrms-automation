import axios from "axios";

export default class JobAdvertService{
    getJobAdverts() {
        return axios.get("http://localhost:8080/api/jobadverts/getall")
    }

    getActiveJobAdverts(){
        return axios.get("http://localhost:8080/api/jobadverts/getbyactive")
    }

    addJobAdvert(values){
        return axios.get("http://localhost:8080/api/jobadverts/add", values)
    }

}