import axios from "axios"
import {HealthProps} from "./ApiInterface"

const SERVER = "http://169.234.117.159:8080"
//TODO: add data types
export const get_dishes = async (props: HealthProps) => {
    let r = await axios.post(`${SERVER}/get_dishes`, props)
    return r.data
}

export const get_sports = async (props: HealthProps) => {
    let r = await axios.post(`${SERVER}/get_sports`, props)
    return r.data
}