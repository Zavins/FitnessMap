import axios from "axios"
import {HealthProps} from "./ApiInterface"

//TODO: add data types
export const get_dishes = async (props: HealthProps) => {
    let r = await axios.post(`http://169.234.76.175:8080/get_dishes`, props)
    return r.data
}

export const get_sports = async (props: HealthProps) => {
    let r = await axios.post(`http://169.234.76.175:8080/get_sports`, props)
    return r.data
}