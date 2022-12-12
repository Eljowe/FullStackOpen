import axios from "axios";
const baseUrl = '/api/persons'

const listPersons = () => {
    const res = axios.get(baseUrl);
    return res.then(response => response.data);
};

const add = obj => {
    const res = axios.post(baseUrl, obj);
    return res.then(response => response.data);
};

const update = (id, obj) => {
    const res = axios.put(`api/persons/${id}`, obj);
    return res.then(response => response.data);
};

const deletePerson = id => {
    const res = axios.delete(`/api/persons/${id}`);
    return res.then(response => response.data);
  };

export default {
    listPersons: listPersons,
    add: add,
    update: update,
    deletePerson: deletePerson,
};

