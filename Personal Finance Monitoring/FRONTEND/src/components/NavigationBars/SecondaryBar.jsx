import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../Assets/Css/SecondarBar.css';
import Axios_request from '../Axios_request';
import IncomeDay from '../Login/CatIncome/IncomeDay';
import ExpenditureDay from '../Login/CatExpenditure/ExpenditureDay';
import InvestmentDay from '../Login/CatInvestment/InvestmentDay';
import IncomeMonth from '../Login/CatIncome/IncomeMonth';
import IncomeYear from '../Login/CatIncome/IncomeYear';
import ExpenditureMonth from '../Login/CatExpenditure/ExpenditureMonth';
import ExpenditureYear from '../Login/CatExpenditure/ExpenditureYear';
import InvestmentMonth from '../Login/CatInvestment/InvestmentMonth';
import InvestmentYear from '../Login/CatInvestment/InvestmentYear';
import GroupHome from '../Login/Groups/GroupsHome';
import TransactionMonth from '../Login/Transactions/TransactionMonth';
import TransactionYear from '../Login/Transactions/TransactionYear';
import Goal from '../Login/Goal/Goal';

const SecondaryBar = () => {
    const [activeTab, setActiveTab] = useState('goal');
    const [dateTab, setDateTab] = useState('day');
    const [startDate, setStartDate] = useState(null);
    const [dataList, setDataList] = useState([]); // Data for individual tabs
    const [incomeData, setIncomeData] = useState([]); // Data for income
    const [expenditureData, setExpenditureData] = useState([]); // Data for expenditure
    const [investmentData, setInvestmentData] = useState([]); // Data for investment

    useEffect(() => {
        const today = new Date();
        setStartDate(today);
    }, []);

    useEffect(() => {
        if (activeTab === 'allTransactions' && dateTab === 'day') {
            setDateTab('month'); // Set to 'month' when 'allTransactions' is selected
        }
    }, [activeTab, dateTab]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === 'groups') {
            setStartDate(null);
            setDataList([]);
            setDateTab('day');
        } else if (tab === 'allTransactions') {
            setDateTab('month'); // Ensure default dateTab for 'allTransactions' is 'month'
        } else if (tab === 'goal') {
            setDataList([]); // Clear dataList for goal tab
        } else {
            setStartDate(new Date()); // Reset startDate to today for non-'groups' tabs
        }
    };

    const handleDateTabChange = (tab) => {
        setDateTab(tab);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeTab === 'groups') {
            setDataList([]);
            return;
        }
        if (activeTab === 'allTransactions') {
            // Handle multiple requests for allTransactions
            await fetchAllTransactionsData();
        } else if (activeTab !== 'goal') { // Fetch data only if the active tab is not 'goal'
            await fetchData();
        }
    };

    const fetchAllTransactionsData = async () => {
        if (!startDate) return;

        const requestData = {
            day: startDate.getDate(),
            month: startDate.getMonth() + 1,
            year: startDate.getFullYear(),
        };

        try {
            // Fetch income data
            const incomeResponse = await Axios_request('POST', `/incomes/${dateTab}`, requestData);
            const incomeData = Array.isArray(incomeResponse.data) ? incomeResponse.data : [];
            setIncomeData(incomeData);

            // Fetch expenditure data
            const expenditureResponse = await Axios_request('POST', `/expenditures/${dateTab}`, requestData);
            const expenditureData = Array.isArray(expenditureResponse.data) ? expenditureResponse.data : [];
            setExpenditureData(expenditureData);

            // Fetch investment data
            const investmentResponse = await Axios_request('POST', `/investments/${dateTab}`, requestData);
            const investmentData = Array.isArray(investmentResponse.data) ? investmentResponse.data : [];
            setInvestmentData(investmentData);

           
        } catch (error) {
            console.error('Error fetching all transactions data:', error);
            setIncomeData([]);
            setExpenditureData([]);
            setInvestmentData([]);
        }
    };

    const fetchData = async () => {
        if (!startDate) return;

        const requestData = {
            day: startDate.getDate(),
            month: startDate.getMonth() + 1,
            year: startDate.getFullYear(),
        };

        try {
            const endpoint = getApiEndpoint(activeTab, dateTab);
            const response = await Axios_request('POST', endpoint, requestData);
            
            // Ensure fetchedData is an array
            const fetchedData = Array.isArray(response.data) ? response.data : [];
            setDataList(fetchedData);
            //console.log('Updated dataList:', fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setDataList([]); // Set to empty array on error
        }
    };

    const getApiEndpoint = (tab, dateTab) => {
        const dateParam = `${dateTab}`;
        switch (tab) {
            case 'goal':
                return null;
            case 'income':
                return `/incomes/${dateParam}`;
            case 'expenditure':
                return `/expenditures/${dateParam}`;
            case 'investment':
                return `/investments/${dateParam}`;
            case 'groups':
                return null;
            case 'allTransactions':
                return `/allTransactions/${dateParam}`;
            default:
                return `/expenditures/${dateParam}`;
        }
    };

    const renderDatePicker = () => {
        let dateFormat;
        let showYearPicker = false;
        let showMonthYearPicker = false;

        if (dateTab === 'year') {
            dateFormat = "yyyy";
            showYearPicker = true;
        } else if (dateTab === 'month') {
            dateFormat = "MM/yyyy";
            showMonthYearPicker = true;
        } else {
            dateFormat = "MM/dd/yyyy";
        }

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    dateFormat={dateFormat}
                    showYearPicker={showYearPicker}
                    showMonthYearPicker={showMonthYearPicker}
                    isClearable
                    popperPlacement="bottom"
                />
                <button type="submit" className="btn btn-primary ml-2">Submit</button>
            </div>
        );
    };

    return (
        <div>
            <div >
                <ul className="  nav nav-tabs NavContainer" role="tablist">
                    <li className="nav-item NavScroll ">
                        <button
                            className={`nav-link col-12 ${activeTab === 'goal' ? 'active' : ''}`}
                            onClick={() => handleTabChange('goal')}>
                            Your Goal
                        </button>
                    </li>
                    <li className="nav-item NavScroll ">
                        <button
                            className={`nav-link col-12 ${activeTab === 'income' ? 'active' : ''}`}
                            onClick={() => handleTabChange('income')}>
                            Income
                        </button>
                    </li>
                    <li className="nav-item NavScroll ">
                        <button
                            className={`nav-link NavScroll col-12 ${activeTab === 'expenditure' ? 'active' : ''}`}
                            onClick={() => handleTabChange('expenditure')}>
                            Expenditure
                        </button>
                    </li>
                    <li className="nav-item NavScroll ">
                        <button
                            className={`nav-link  col-12 ${activeTab === 'investment' ? 'active' : ''}`}
                            onClick={() => handleTabChange('investment')}>
                            Investment
                        </button>
                    </li>
                    <li className="nav-item NavScroll ">
                        <button
                            className={`nav-link col-12 ${activeTab === 'groups' ? 'active' : ''}`}
                            onClick={() => handleTabChange('groups')}>
                            Groups
                        </button>
                    </li>
                    <li className="nav-item NavScroll ">
                        <button
                            className={`nav-link col-12 ${activeTab === 'allTransactions' ? 'active' : ''}`}
                            onClick={() => handleTabChange('allTransactions')}>
                            All Transactions
                        </button>
                    </li>
                </ul>
                {(activeTab !== 'goal' && activeTab !== 'groups' && (activeTab === 'income' || activeTab === 'expenditure' || activeTab === 'investment' || activeTab === 'allTransactions')) && (
                    <ul className="nav nav-tabs mt-3">
                        {(activeTab !== 'allTransactions') && (
                            <li className="nav-item ">
                                <button
                                    className={`nav-link ${dateTab === 'day' ? 'active' : ''} col-12`}
                                    onClick={() => handleDateTabChange('day')}>
                                    Day
                                </button>
                            </li>
                        )}
                        <li className="nav-item ">
                            <button
                                className={`nav-link ${dateTab === 'month' ? 'active' : ''} col-12`}
                                onClick={() => handleDateTabChange('month')}>
                                Month
                            </button>
                        </li>
                        <li className="nav-item ">
                            <button
                                className={`nav-link ${dateTab === 'year' ? 'active' : ''} col-12`}
                                onClick={() => handleDateTabChange('year')}>
                                Year
                            </button>
                        </li>
                    </ul>
                )}
                <span> Active Tab: {activeTab}</span>
                {(activeTab !== 'goal' && activeTab !== 'groups') && (
                    <form onSubmit={handleSubmit} className="mt-3">
                        {renderDatePicker()}
                    </form>
                )}
            </div>
            <div>
                {activeTab === "income" && dateTab === "day" && Array.isArray(dataList) && dataList.length > 0 && (
                    <IncomeDay dataSource={dataList} />
                )}
                {activeTab === "income" && dateTab === "month" && Array.isArray(dataList) && dataList.length > 0 && (
                    <IncomeMonth dataSource={dataList} />
                )}
                {activeTab === "income" && dateTab === "year" && Array.isArray(dataList) && dataList.length > 0 && (
                    <IncomeYear dataSource={dataList} />
                )}
                {activeTab === "expenditure" && dateTab === "day" && Array.isArray(dataList) && dataList.length > 0 && (
                    <ExpenditureDay dataSource={dataList} />
                )}
                {activeTab === "expenditure" && dateTab === "month" && Array.isArray(dataList) && dataList.length > 0 && (
                    <ExpenditureMonth dataSource={dataList} />
                )}
                {activeTab === "expenditure" && dateTab === "year" && Array.isArray(dataList) && dataList.length > 0 && (
                    <ExpenditureYear dataSource={dataList} />
                )}
                {activeTab === "investment" && dateTab === "day" && Array.isArray(dataList) && dataList.length > 0 && (
                    <InvestmentDay dataSource={dataList} />
                )}
                {activeTab === "investment" && dateTab === "month" && Array.isArray(dataList) && dataList.length > 0 && (
                    <InvestmentMonth dataSource={dataList} />
                )}
                {activeTab === "investment" && dateTab === "year" && Array.isArray(dataList) && dataList.length > 0 && (
                    <InvestmentYear dataSource={dataList} />
                )}
                {activeTab === "groups" && <GroupHome />}
                {activeTab === "goal" && <Goal />}
                {activeTab === "allTransactions" && dateTab === "month" && ((
                    (Array.isArray(incomeData) && incomeData.length > 0) ||
                    (Array.isArray(investmentData) && investmentData.length > 0) ||
                    (Array.isArray(expenditureData) && expenditureData.length > 0)) && (
                        <TransactionMonth
                            incomeData={incomeData}
                            investmentData={investmentData}
                            expenditureData={expenditureData}
                        />
                    )
                )}
                {activeTab === "allTransactions" && dateTab === "year" && ((
                    (Array.isArray(incomeData) && incomeData.length > 0) ||
                    (Array.isArray(investmentData) && investmentData.length > 0) ||
                    (Array.isArray(expenditureData) && expenditureData.length > 0)) && (
                        <TransactionYear
                            incomeData={incomeData}
                            investmentData={investmentData}
                            expenditureData={expenditureData}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default SecondaryBar;
