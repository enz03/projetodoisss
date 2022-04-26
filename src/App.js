import React, { useState, useEffect } from 'react';
import data from './data.json'

const rowsPerPage = 5;
const right_arrow = "<<";
const left_arrow = ">>";
let mutable_data = data;



const useTable = (data, page, rowsPerPage) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};

const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};




function App() {

  const [contacts, setContacts] = useState(mutable_data);
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(contacts, page, rowsPerPage);
  return ( 

    <>
    <table>
    <thead>
      <tr>
        <th>Nome</th>
        <th>Email</th>
        <th>Cadastrado em:</th>
        <th></th>
        
      </tr>
    </thead>
    <tbody>
      {sliceData(contacts,page,rowsPerPage).map((contact) => (
        <tr>
          <td>{contact.first_name} {contact.last_name}</td>
          <td>{contact.email}</td>
          <td>{contact.created_at}</td>
          <td className='action_buttons'>
            <button className='edit_button'>editar</button>
            <button onClick={() => {setContacts(contacts.filter(user => user.id !== contact.id));
               mutable_data.filter(user => user.id !== contact.id);}} className='delete_button'>excluir</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <div className='pagination'>
    <button onClick={() => page != 1 ? setPage(page-1) : setPage(page)}>{right_arrow}</button>
    
    {range.map((el, index) => (
        <button
          key={index}
          className={`${
            page === el ? 'active' : 'inactiveButton'
          }`}
          onClick={() => setPage(el)}
        >
          {el}
        </button>
    ))}
    <button onClick={() => page != 3 ? setPage(page+1) : setPage(page)}>{left_arrow}</button>

  </div></>

  );
}

export default App; 
