import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Axios_request from '../../Axios_request';

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        Axios_request("get", "/contacts", {})
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the contacts!', error);
            });
    }, []);

    const handleDelete = (userId) => {
        Axios_request("delete", "/contact", { userId: userId })
            .then(() => {
                // Remove the contact from the state after successful deletion
                setContacts(contacts.filter(contact => contact.userId !== userId));
            })
            .catch(error => {
                console.error('There was an error deleting the contact!', error);
            });
    };

    return (
        <div className="container mt-5">
            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Remove Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.userId}>
                                <td>{contact.email}</td>
                                <td>{contact.firstName}</td>
                                <td>{contact.lastName}</td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(contact.userId)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactTable;
