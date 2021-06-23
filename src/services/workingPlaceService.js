import axios from "axios";

export default class WorkingPlaceService{
    getWorkingPlaces(){
        return axios.get("http://localhost:8080/workingplaces/getall")
    }
}