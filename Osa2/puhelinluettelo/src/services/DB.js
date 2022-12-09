import axios from "axios";

const listPersons = () => {
    const res = axios.get('http://localhost:8080/api/persons');
    return res.then(response => response.data);
};

const add = obj => {
    const res = axios.post('http://localhost:8080/api/persons', obj);
    return res.then(response => response.data);
};

const update = (id, obj) => {
    const res = axios.put(`http://localhost:8080/api/persons/${id}`, obj);
    return res.then(response => response.data);
};

const deletePerson = id => {
    const res = axios.delete(`http://localhost:8080/api/persons/${id}`);
    return res.then(response => response.data);
  };

export default {
    listPersons: listPersons,
    add: add,
    update: update,
    deletePerson: deletePerson,
};

