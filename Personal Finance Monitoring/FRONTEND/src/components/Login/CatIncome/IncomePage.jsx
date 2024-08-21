import { useState } from 'react';
import Axios_request from '../../Axios_request';
import { useNavigate } from 'react-router-dom';

const IncomePage = () => {
    const [category, setCategory] = useState('');
    const [formData, setFormData] = useState({
        incomeId: '0', // Hidden incomeId
        incomeSource: '',
        incomeAmount: '',
        description: '',
        modeOfPayment: 'online', // Default to 'online'
        date: '',
        time: '',
    });

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        setFormData({
            ...formData,
            incomeSource: selectedCategory, // Set incomeSource to the selected category
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.incomeSource) {
            alert('Please select a category.');
            return;
        }

        Axios_request("post",
            "/incomes",
            formData
        )
            .then(response => {
                console.log('Data submitted successfully:', response.data);
                navigate(`/loginHome`);
            })
            .catch(error => {
                console.error('There was an error submitting the data:', error);
            });
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Income Page</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="incomeCategory">Source of Income</label>
                        <select
                            id="incomeCategory"
                            className="form-control"
                            value={category}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Salary">Salary</option>
                            <option value="Loan/Borrowing">Loan/Borrowing</option>
                            <option value="Investment">Investment</option>
                        </select>
                    </div>

                    {category && (
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="incomeAmount">Income Amount</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="incomeAmount"
                                    name="incomeAmount"
                                    value={formData.incomeAmount}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mode of Payment</label>
                                <div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="online"
                                            name="modeOfPayment"
                                            value="online"
                                            checked={formData.modeOfPayment === 'online'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="online">Online</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            id="cash"
                                            name="modeOfPayment"
                                            value="cash"
                                            checked={formData.modeOfPayment === 'cash'}
                                            onChange={handleInputChange}
                                        />
                                        <label className="form-check-label" htmlFor="cash">Cash</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="time">Time</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    id="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default IncomePage;
